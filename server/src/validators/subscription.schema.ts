import { z } from 'zod';

export const updateSubscriptionSchema = z.object({
  plan: z.enum(['MONTHLY', 'YEARLY']),
});
