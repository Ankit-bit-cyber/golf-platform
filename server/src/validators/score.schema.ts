import { z } from 'zod';

export const createScoreSchema = z.object({
  value: z.any(),
  date: z.string(),
});

export const updateScoreSchema = z.object({
  value: z.any().optional(),
  date: z.string().optional(),
});
