import { z } from 'zod';

export const STYLES = ['cinematic', 'modern', 'minimal', 'corporate', 'tech'] as const;
export type VideoStyle = (typeof STYLES)[number];

export const SECTION_TYPES = [
  'hero',
  'features',
  'pricing',
  'testimonials',
  'dashboard',
  'cta',
  'generic',
] as const;
export type SectionType = (typeof SECTION_TYPES)[number];

export const ANIMATION_TYPES = [
  'zoom-in',
  'zoom-out',
  'pan-left',
  'pan-right',
  'scroll-up',
  'fade-in',
] as const;
export type AnimationType = (typeof ANIMATION_TYPES)[number];

export const TRANSITION_TYPES = ['fade', 'slide', 'dissolve', 'none'] as const;
export type TransitionType = (typeof TRANSITION_TYPES)[number];

export const JOB_STATUSES = [
  'queued',
  'capturing',
  'planning',
  'rendering',
  'completed',
  'failed',
] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

// --- Zod Schemas ---

export const createJobSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  style: z.enum(STYLES).default('cinematic'),
  duration: z.number().int().min(30).max(90).default(60),
});

export type CreateJobRequest = z.infer<typeof createJobSchema>;

export const sceneAnimationSchema = z.object({
  type: z.enum(ANIMATION_TYPES),
  intensity: z.number().min(0).max(1).default(0.6),
});

export const sceneMetadataSchema = z.object({
  scrollY: z.number(),
  viewportHeight: z.number(),
  elementSelector: z.string(),
  textContent: z.string(),
});

export const sceneSchema = z.object({
  id: z.string(),
  sectionType: z.enum(SECTION_TYPES),
  screenshotPath: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  animation: sceneAnimationSchema,
  transition: z.enum(TRANSITION_TYPES).default('fade'),
  metadata: sceneMetadataSchema,
});

export type Scene = z.infer<typeof sceneSchema>;

export const jobDataSchema = z.object({
  id: z.string(),
  url: z.string(),
  style: z.enum(STYLES),
  duration: z.number(),
  status: z.enum(JOB_STATUSES),
  progress: z.number().min(0).max(100),
  createdAt: z.string(),
  outputPath: z.string().optional(),
  sceneData: z.array(sceneSchema).optional(),
  error: z.string().optional(),
});

export type JobData = z.infer<typeof jobDataSchema>;
