import { z } from 'zod';

export const updateCharityPrefSchema = z.object({
  charity_id: z.string().uuid(),
  charity_pct: z.number().int().min(10).max(100),
});
