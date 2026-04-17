import { z } from 'zod';

export const createDrawSchema = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2025),
  draw_type: z.enum(['RANDOM', 'ALGORITHM']),
});
