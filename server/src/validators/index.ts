import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  plan: z.enum(['MONTHLY', 'YEARLY']),
  charity_id: z.string().uuid().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const updateCharityPrefSchema = z.object({
  charity_id: z.string().uuid(),
  charity_pct: z.number().int().min(10).max(100),
});

export const createScoreSchema = z.object({
  value: z.number().int().min(1).max(45),
  date: z.string(),
});

export const updateScoreSchema = createScoreSchema.partial();

export const createDrawSchema = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2025),
  draw_type: z.enum(['RANDOM', 'ALGORITHM']),
});

export const charitySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
});

export const updateSubscriptionSchema = z.object({
  plan: z.enum(['MONTHLY', 'YEARLY']),
});
