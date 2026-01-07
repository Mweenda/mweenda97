import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { appRouter } from '@mweenda97/api';

// Initialize Firebase Admin SDK
admin.initializeApp();

/**
 * tRPC API Endpoint
 * Exposes the appRouter as a Cloud Function
 */
export const api = functions.https.onRequest(
  createHTTPHandler({
    router: appRouter,
    createContext: () => ({
      firestore: admin.firestore(),
    }),
  })
);

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
