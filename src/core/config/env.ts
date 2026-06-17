/**
 * Environment configuration — validated with Zod at startup.
 * No silent fallbacks: if cloud config is missing we expose `isCloudConfigured = false`
 * so the UI can show an explicit "configuration required" state instead of faking success.
 */
import { z } from 'zod';

const rawEnv = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
};

const cloudSchema = z.object({
  supabaseUrl: z.string().url(),
  supabaseAnonKey: z.string().min(20),
});

const appEnvSchema = z.enum(['development', 'preview', 'production']);

const cloudParsed = cloudSchema.safeParse({
  supabaseUrl: rawEnv.supabaseUrl,
  supabaseAnonKey: rawEnv.supabaseAnonKey,
});

const appEnvParsed = appEnvSchema.safeParse(rawEnv.appEnv);

export const env = {
  appEnv: appEnvParsed.success ? appEnvParsed.data : 'development',
  isCloudConfigured: cloudParsed.success,
  supabaseUrl: cloudParsed.success ? cloudParsed.data.supabaseUrl : null,
  supabaseAnonKey: cloudParsed.success ? cloudParsed.data.supabaseAnonKey : null,
} as const;

export type AppEnv = typeof env.appEnv;
