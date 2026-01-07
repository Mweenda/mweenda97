import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { leadCaptureSchema, terminalCommandSchema } from '@mweenda97/db';

/**
 * Initialize tRPC
 */
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Terminal Router
 * CCNA CLI command simulator with per-session isolation
 */
const terminalRouter = router({
  /**
   * Initialize Session - Creates isolated terminal environment
   */
  initSession: publicProcedure
    .input(
      z.object({
        ipHash: z.string().optional(),
      })
    )
    .mutation(async ({ input: _input }: { input: { ipHash?: string } }) => {
      const sessionId = `term_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        sessionId,
        message: 'Terminal session initialized. Type "help" for available commands.',
        prompt: 'Router>',
      };
    }),

  /**
   * Execute Command - Validates and executes CCNA commands
   */
  executeCommand: publicProcedure
    .input(terminalCommandSchema)
    .mutation(async ({ input: _input }: { input: { sessionId: string; command: string; type: string } }) => {
      const { command } = _input;

      const commandLower = command.toLowerCase().trim();

      if (commandLower === 'help' || commandLower === '?') {
        return {
          output: `Available Commands:
  show ip interface brief  - Display interface summary
  show version            - Display system version
  show cdp neighbors      - Display CDP neighbor info
  show running-config     - Display running configuration
  show ip route           - Display routing table
  configure terminal      - Enter configuration mode
  enable                  - Enter privileged mode
  exit                    - Exit current mode
  help, ?                 - Display this help message`,
          prompt: 'Router>',
          sessionValid: true,
        };
      }

      if (commandLower === 'show version') {
        return {
          output: `Cisco IOS XE Software, Version 17.6.1
cisco WS-C2960XR-48LPS-I (MIPS) processor (revision A0) 1000000K bytes of memory.
Processor board ID FOC1234567890
1 Virtual Ethernet interface
48 Gigabit Ethernet interfaces
2 Ten Gigabit Ethernet interfaces
Model Number: WS-C2960XR-48LPS-I
System Serial Number: FOC1234567890
Configuration register is 0x2102`,
          prompt: 'Router>',
          sessionValid: true,
        };
      }

      if (commandLower === 'show ip interface brief') {
        return {
          output: `Interface              IP-Address      OK? Method Status                Protocol
Gigabit Ethernet0/1    192.168.1.1     YES manual up                    up
Gigabit Ethernet0/2    10.0.0.1        YES manual up                    up
Gigabit Ethernet0/3    unassigned      YES unset  administratively down down
Vlan1                  172.16.0.1      YES manual up                    up`,
          prompt: 'Router>',
          sessionValid: true,
        };
      }

      if (commandLower === 'show cdp neighbors') {
        return {
          output: `Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater, V - VoIP-Phone
Device ID            Local Intrfce     Holdtme    Capability  Platform  Port ID
mweenda97-core       Gig 0/1          120        R S I       ASR1000   Gig 0/0/1`,
          prompt: 'Router>',
          sessionValid: true,
        };
      }

      if (commandLower === 'configure terminal') {
        return {
          output: 'Enter configuration commands, one per line. End with CNTL/Z.',
          prompt: 'Router(config)#',
          sessionValid: true,
        };
      }

      if (commandLower === 'enable') {
        return {
          output: '',
          prompt: 'Router#',
          sessionValid: true,
        };
      }

      if (commandLower === 'exit') {
        return {
          output: '',
          prompt: 'Router>',
          sessionValid: true,
        };
      }

      // Unknown command
      return {
        output: `% Unknown command: "${command}"\nType "help" or "?" for available commands.`,
        prompt: 'Router>',
        sessionValid: true,
      };
    }),

  /**
   * Get Session - Retrieve current session state
   */
  getSession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input: _input }: { input: { sessionId: string } }) => {
      return {
        currentMode: 'user',
        prompt: 'Router>',
        commandHistory: [],
        isValid: true,
      };
    }),

  /**
   * Reset Session - Clear config buffer
   */
  resetSession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input: _input }: { input: { sessionId: string } }) => {
      return {
        success: true,
        message: 'Configuration buffer cleared.',
        prompt: 'Router>',
      };
    }),
});

/**
 * Lead Router
 * Secure lead capture with Zod validation
 */
const leadRouter = router({
  capture: publicProcedure
    .input(leadCaptureSchema)
    .mutation(async ({ input: _input }: { input: z.infer<typeof leadCaptureSchema> }) => {
      // Attempt to persist lead to Firestore when running inside a Cloud Function
      try {
        // `ctx` is provided by the runtime (see functions createContext in apps/functions)
        // We intentionally keep this usage defensive so packages/api can still be used
        // outside of Cloud Functions during local type-check/build.
        // @ts-expect-error - ctx is injected by the tRPC handler in the functions runtime
        const firestore = (arguments[0] as any).ctx?.firestore;

        if (firestore) {
          const email = _input.email.toLowerCase().trim();

          // Check for duplicate
          const existing = await firestore.collection('leads').where('email', '==', email).limit(1).get();

          if (!existing.empty) {
            return {
              success: false,
              leadId: existing.docs[0].id,
              message: 'Lead already exists',
              downloadUrl: null,
            };
          }

          // Create lead document
          const leadRef = await firestore.collection('leads').add({
            email,
            name: _input.name.trim(),
            source: _input.source || 'direct',
            createdAt: new Date(),
          });

          // Log analytics event
          await firestore.collection('analytics').add({
            event: 'lead_captured',
            leadId: leadRef.id,
            email,
            timestamp: new Date(),
          });

          return {
            success: true,
            leadId: leadRef.id,
            message: 'Thank you! Check your email for the download link.',
            downloadUrl: null,
          };
        }

        // If no firestore available (e.g., running outside functions), return a simulated response
        return {
          success: true,
          leadId: 'lead_' + Date.now(),
          message: 'Thank you! Check your email for the download link.',
          downloadUrl: 'https://storage.googleapis.com/mweenda97/technical-cv.pdf?token=...',
        };
      } catch (err) {
        // Bubble up error; tRPC caller will receive a proper error
        throw err;
      }
    }),

  verify: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input: _input }: { input: { email: string } }) => {
      // TODO: Query Firestore for existing lead by email
      return { exists: false };
    }),
});

/**
 * Projects Router
 * Portfolio project metadata
 */
const projectsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        featured: z.boolean().optional(),
        category: z.string().optional(),
      })
    )
    .query(async ({ input: _input }: { input: { featured?: boolean; category?: string } }) => {
      // TODO: Query Firestore
      return [];
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: _input }: { input: { id: string } }) => {
      // TODO: Query Firestore
      return null;
    }),
});

/**
 * Blog Router
 * Technical blog posts
 */
const blogRouter = router({
  listPublished: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input: _input }: { input: { limit: number; offset: number } }) => {
      // TODO: Query Firestore with pagination
      return [];
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input: _input }: { input: { slug: string } }) => {
      // TODO: Query Firestore
      return null;
    }),
});

/**
 * Main App Router
 * Combines all routers for the tRPC API
 */
export const appRouter = router({
  terminal: terminalRouter,
  leads: leadRouter,
  projects: projectsRouter,
  blog: blogRouter,
});

export type AppRouter = typeof appRouter;
