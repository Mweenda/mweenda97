import { z } from 'zod';

/**
 * Lead Capture Schema
 * Sanitized and validated recruiter/visitor data with metadata
 * Implements Confidentiality & Integrity principles
 */
export const leadCaptureSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  name: z.string().min(1, 'Name required').max(100).trim(),
  company: z.string().min(1, 'Company required').max(150).trim().optional(),
  jobTitle: z.string().max(100).trim().optional(),
  linkedInUrl: z.string().url('Invalid LinkedIn URL').optional(),
  message: z.string().max(500, 'Message must be under 500 characters').trim().optional(),
  magnetType: z.enum([
    'network-security-audit-checklist',
    'gemini-api-integration-guide',
    'technical-cv-download',
  ]),
  source: z.enum(['hero-cta', 'project-card', 'ai-lab', 'terminal-sandbox']).default('hero-cta'),
});

export type LeadCapture = z.infer<typeof leadCaptureSchema>;

/**
 * Lead Document Schema
 * Stored in Firestore with metadata for tracking and analytics
 */
export const leadDocumentSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  name: z.string(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  linkedInUrl: z.string().url().optional(),
  message: z.string().optional(),
  magnetType: z.string(),
  source: z.string(),
  ipHash: z.string().optional(), // Hash of IP (privacy-first)
  userAgent: z.string().optional(), // Device/browser info
  pdfDownloadedAt: z.date().optional(), // Timestamp when PDF was actually downloaded
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type LeadDocument = z.infer<typeof leadDocumentSchema>;

/**
 * Terminal Session Schema
 * Maintains per-user isolated terminal state
 * Ensures User Isolation: one user's commands don't affect another
 */
export const terminalSessionSchema = z.object({
  sessionId: z.string(),
  userId: z.string().optional(), // Anonymous if not authenticated
  ipHash: z.string(), // Privacy-first IP identification
  // Virtual network device state
  currentInterface: z.string().default('eth0'),
  currentMode: z.enum(['user', 'enable', 'config', 'interface']).default('user'),
  configBuffer: z.record(z.any()).default({}), // Staged configuration
  runningConfig: z.record(z.any()).default({}), // Applied configuration
  commandHistory: z.array(z.string()).default([]),
  // Metadata
  createdAt: z.date().default(() => new Date()),
  lastActivityAt: z.date().default(() => new Date()),
  expiresAt: z.date(), // Session timeout
});

export type TerminalSession = z.infer<typeof terminalSessionSchema>;

/**
 * Terminal Command Schema
 * Validates and executes CCNA commands (show, configure, etc.)
 */
export const terminalCommandSchema = z.object({
  sessionId: z.string(),
  command: z.string().min(1).max(500),
  // Whitelist of allowed CCNA commands
  type: z.enum([
    'show-version',
    'show-interfaces',
    'show-ip-route',
    'show-cdp-neighbors',
    'config-hostname',
    'config-interface-ip',
    'config-static-route',
    'enable',
    'disable',
    'exit',
    'help',
  ]),
});

export type TerminalCommand = z.infer<typeof terminalCommandSchema>;

/**
 * Project Metadata Schema
 * Firestore collection for portfolio projects
 */
export const projectMetadataSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  shortDescription: z.string().max(150),
  category: z.enum(['ai', 'fullstack', 'network', 'infrastructure']),
  technologies: z.array(z.string()),
  imageUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;

/**
 * Blog Post Schema
 * Firestore collection for technical blog posts
 */
export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().max(300),
  content: z.string(),
  author: z.string().default('Christopher Kawanga'),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  publishedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

/**
 * Analytics Event Schema
 * Track user interactions for lead generation optimization
 */
export const analyticsEventSchema = z.object({
  id: z.string().optional(),
  eventType: z.enum([
    'page_view',
    'cta_click',
    'lead_magnet_download',
    'form_submission',
    'ai_playground_interaction',
  ]),
  userId: z.string().optional(),
  sessionId: z.string(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.date().default(() => new Date()),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;
