import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env explicitly if needed
dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5001),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(10),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_KEY: z.string().min(10).optional(),
  RESEND_API_KEY: z.string().optional(),
});

export let env: any;

try {
  env = envSchema.parse(process.env);
  console.log("Environment validation successful.");
} catch (error: any) {
  const logDir = path.join(__dirname, '../../..');
  const logFile = path.join(logDir, 'server-debug.log');
  
  // Create a human-readable error summary
  let errorSummary = "Unknown Error";
  if (error.issues) {
    errorSummary = error.issues.map((i: any) => `${i.path.join('.')}: ${i.message}`).join(', ');
  } else {
    errorSummary = error.message || String(error);
  }

  const errorMsg = `[ENV ERROR] ${new Date().toISOString()}\nSummary: ${errorSummary}\nFull Error: ${JSON.stringify(error, null, 2)}\n\n`;
  
  // Last ditch console effort
  console.error("CRITICAL: Environment Validation Failed!");
  console.error(errorSummary);

  try {
    fs.appendFileSync(logFile, errorMsg);
  } catch (fsErr) {
    console.error("Could not write to server-debug.log:", fsErr);
  }
  
  // Prevent index.ts from hitting "Cannot read property PORT of undefined"
  process.exit(1);
}
