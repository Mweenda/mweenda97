import { z } from 'zod';

/**
 * Lead Schema
 * Sanitized and validated lead capture with confidentiality
 */
export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .trim(),
  email: z.string().email('Invalid email').toLowerCase().trim(),
  company: z.string().max(100, 'Company name too long').trim().optional(),
  message: z.string().max(500, 'Message must be less than 500 characters').trim().optional(),
  source: z
    .enum(['hero-cta', 'project-card', 'terminal-sandbox', 'ai-lab'])
    .default('hero-cta'),
  magnetType: z
    .enum([
      'network-security-audit-checklist',
      'gemini-api-integration-guide',
      'technical-cv-download',
    ])
    .default('technical-cv-download'),
  createdAt: z.date().default(() => new Date()),
});

export type Lead = z.infer<typeof leadSchema>;

/**
 * Lead Document for Firestore storage
 * Adds audit trail and metadata
 */
export const leadDocumentSchema = z.object({
  id: z.string().optional(),
  ...leadSchema.shape,
  ipHash: z.string().optional(), // Hash of client IP (privacy-first)
  userAgent: z.string().optional(), // Device/browser info
  pdfDownloadedAt: z.date().optional(),
  updatedAt: z.date().default(() => new Date()),
});

export type LeadDocument = z.infer<typeof leadDocumentSchema>;
