import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { appRouter } from '@mweenda97/api';
import { z } from 'zod';
import { leadCaptureSchema, terminalCommandSchema } from '@mweenda97/db';

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

/**
 * tRPC API Endpoint
 * Exposes the appRouter as a Cloud Function
 */
export const api = functions.https.onRequest(
  createHTTPHandler({
    router: appRouter,
    createContext: () => ({
      firestore: db,
    }),
  })
);

/**
 * Lead Capture Handler
 * Validates and stores lead data with email deduplication
 */
export const captureLeadHandler = functions.https.onCall(
  async (
    data: unknown,
    context: functions.https.CallableContext
  ): Promise<{ success: boolean; leadId: string; message: string }> => {
    try {
      const validated = leadCaptureSchema.parse(data);

      // Check for duplicate email
      const existing = await db
        .collection('leads')
        .where('email', '==', validated.email.toLowerCase().trim())
        .limit(1)
        .get();

      if (!existing.empty) {
        throw new Error('Lead with this email already exists');
      }

      // Create lead document
      const leadRef = await db.collection('leads').add({
        email: validated.email.toLowerCase().trim(),
        name: validated.name.trim(),
        source: validated.source || 'direct',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        ip: context.rawRequest.ip,
        userAgent: context.rawRequest.headers['user-agent'],
      });

      // Log analytics event
      await db.collection('analytics').add({
        event: 'lead_captured',
        leadId: leadRef.id,
        email: validated.email.toLowerCase().trim(),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {
        success: true,
        leadId: leadRef.id,
        message: 'Thank you! Check your email for the download link.',
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new functions.https.HttpsError('invalid-argument', 'Validation failed');
      }
      throw new functions.https.HttpsError(
        'internal',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

/**
 * Terminal Session Handler
 * Creates isolated terminal session with TTL
 */
export const initTerminalSessionHandler = functions.https.onCall(
  async (
    _data: unknown,
    context: functions.https.CallableContext
  ): Promise<{ success: boolean; sessionId: string; message: string; prompt: string }> => {
    try {
      const sessionId = `term_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create session document with 30-minute TTL
      await db.collection('terminals').doc(sessionId).set({
        sessionId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000),
        ip: context.rawRequest.ip,
        userAgent: context.rawRequest.headers['user-agent'],
        currentMode: 'user',
        prompt: 'Router>',
        configBuffer: '',
        commandHistory: [],
        isValid: true,
      });

      return {
        success: true,
        sessionId,
        message: 'Terminal session initialized. Type "help" for available commands.',
        prompt: 'Router>',
      };
    } catch (error) {
      throw new functions.https.HttpsError(
        'internal',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

/**
 * Execute Terminal Command Handler
 * Validates session and executes command in isolated environment
 */
export const executeTerminalCommandHandler = functions.https.onCall(
  async (
    data: unknown,
    _context: functions.https.CallableContext
  ): Promise<{ output: string; prompt: string; sessionValid: boolean }> => {
    try {
      const validated = terminalCommandSchema.parse(data);
      const { sessionId, command } = validated;

      // Verify session exists and is valid
      const sessionDoc = await db.collection('terminals').doc(sessionId).get();

      if (!sessionDoc.exists) {
        return {
          output: 'Error: Session not found or expired',
          prompt: 'Router>',
          sessionValid: false,
        };
      }

      const session = sessionDoc.data();

      if (!session || session.expiresAt.toDate() < new Date()) {
        return {
          output: 'Error: Session expired',
          prompt: 'Router>',
          sessionValid: false,
        };
      }

      // Process command
      const commandLower = command.toLowerCase().trim();
      let output = '';
      let prompt = session.prompt || 'Router>';

      if (commandLower === 'help' || commandLower === '?') {
        output = `Available Commands:
  show ip interface brief  - Display interface summary
  show version            - Display system version
  show cdp neighbors      - Display CDP neighbor info
  show running-config     - Display running configuration
  show ip route           - Display routing table
  configure terminal      - Enter configuration mode
  enable                  - Enter privileged mode
  exit                    - Exit current mode
  help, ?                 - Display this help message`;
      } else if (commandLower === 'show version') {
        output = `Cisco IOS XE Software, Version 17.6.1
cisco WS-C2960XR-48LPS-I (MIPS) processor (revision A0) 1000000K bytes of memory.
Processor board ID FOC1234567890
1 Virtual Ethernet interface
48 Gigabit Ethernet interfaces
2 Ten Gigabit Ethernet interfaces
Model Number: WS-C2960XR-48LPS-I
System Serial Number: FOC1234567890
Configuration register is 0x2102`;
      } else if (commandLower === 'show ip interface brief') {
        output = `Interface              IP-Address      OK? Method Status                Protocol
Gigabit Ethernet0/1    192.168.1.1     YES manual up                    up
Gigabit Ethernet0/2    10.0.0.1        YES manual up                    up
Gigabit Ethernet0/3    unassigned      YES unset  administratively down down
Vlan1                  172.16.0.1      YES manual up                    up`;
      } else if (commandLower === 'show cdp neighbors') {
        output = `Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, V - VoIP-Phone
Device ID            Local Intrfce     Holdtme    Capability  Platform  Port ID
mweenda97-core       Gig 0/1          120        R S I       ASR1000   Gig 0/0/1`;
      } else if (commandLower === 'configure terminal') {
        output = 'Enter configuration commands, one per line. End with CNTL/Z.';
        prompt = 'Router(config)#';
      } else if (commandLower === 'enable') {
        output = '';
        prompt = 'Router#';
      } else if (commandLower === 'exit') {
        output = '';
        prompt = 'Router>';
      } else {
        output = `% Unknown command: "${command}"\nType "help" or "?" for available commands.`;
      }

      // Update session with new command history
      await sessionDoc.ref.update({
        prompt,
        commandHistory: admin.firestore.FieldValue.arrayUnion({
          command,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        }),
      });

      return { output, prompt, sessionValid: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new functions.https.HttpsError('invalid-argument', 'Validation failed');
      }
      throw new functions.https.HttpsError(
        'internal',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

/**
 * Cleanup Task
 * Removes expired terminal sessions (scheduled daily)
 */
export const cleanupExpiredSessions = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async () => {
    const now = new Date();
    const batch = db.batch();

    const expired = await db.collection('terminals').where('expiresAt', '<', now).get();

    expired.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  });

/**
 * Lead Capture Function
 * Triggered when a lead magnet is submitted
 */
export const onLeadSubmitted = functions.firestore
  .document('leads/{leadId}')
  .onCreate(async (snap) => {
    const lead = snap.data();
    // TODO: Send confirmation email, update analytics, etc.
    functions.logger.info(`New lead: ${lead.email}`, { structuredData: true });
  });

/**
 * Analytics Function
 * Triggered when analytics events are logged
 */
export const onAnalyticsEvent = functions.firestore
  .document('analytics/{eventId}')
  .onCreate(async (snap) => {
    const event = snap.data();
    functions.logger.info(`Analytics event: ${event.eventType}`, { structuredData: true });
  });
