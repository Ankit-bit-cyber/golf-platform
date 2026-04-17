import { z } from 'zod';

export const charitySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  image_url: z.string().url().optional().nullable(),
  website: z.string().url().optional().nullable(),
  is_featured: z.boolean().default(false),
  events: z.array(z.object({
    title: z.string(),
    date: z.string().datetime(),
  })).optional(),
});

export const updateCharitySchema = charitySchema.partial();
