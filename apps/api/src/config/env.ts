import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.coerce.number().int().positive().default(5000),

  MONGODB_URI: z.string().min(1),

  REDIS_URL: z.string().min(1),

  ACCESS_TOKEN_SECRET: z.string().min(16),

  REFRESH_TOKEN_SECRET: z.string().min(16),

  CLIENT_URL: z.url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment configuration:');
  console.error(parsedEnv.error.flatten().fieldErrors);

  process.exit(1);
}

export const env = parsedEnv.data;
