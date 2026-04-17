import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load .env explicitly if needed
dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default(5000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(10),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_KEY: z.string().min(10).optional(),
  RESEND_API_KEY: z.string().optional(),
});

// This will throw and crash the app if validation fails!
export const env = envSchema.parse(process.env);
