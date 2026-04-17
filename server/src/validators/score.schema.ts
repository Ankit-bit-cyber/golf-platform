import { z } from 'zod';

export const createScoreSchema = z.object({
  value: z.number().int().min(1).max(45),
  date: z.string().datetime(), // ISO Date string
});

export const updateScoreSchema = z.object({
  value: z.number().int().min(1).max(45).optional(),
  date: z.string().datetime().optional(),
});
