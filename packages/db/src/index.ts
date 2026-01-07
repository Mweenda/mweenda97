import { z } from 'zod';

/**
 * Lead Magnet Schema
 * Captures recruiter/visitor data for lead generation
 */
export const leadMagnetSchema = z.object({
  id: z.string().optional(),
  email: z.string().email('Invalid email address'),
  linkedInUrl: z.string().url().optional(),
  company: z.string().min(1, 'Company name required').optional(),
  jobTitle: z.string().optional(),
  message: z.string().max(500, 'Message must be under 500 characters').optional(),
  magnetType: z.enum([
    'network-security-audit',
    'gemini-api-guide',
    'technical-cv',
  ]),
  downloadedAt: z.date().default(() => new Date()),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type LeadMagnet = z.infer<typeof leadMagnetSchema>;

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
