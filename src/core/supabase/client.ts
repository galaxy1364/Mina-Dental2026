/**
 * Single Supabase client for the whole app (cloud source of truth after sync).
 * Session is persisted in expo-secure-store. If cloud env is not configured,
 * `getSupabase()` throws a typed CONFIG_MISSING error instead of faking a client.
 */
import 'react-native-url-polyfill/auto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { env } from '../config/env';
import { AppError } from '../errors/AppError';
import { createLogger } from '../logger/logger';

const log = createLogger('supabase');

const SecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

let client: SupabaseClient | null = null;

export function isCloudConfigured(): boolean {
  return env.isCloudConfigured;
}

export function getSupabase(): SupabaseClient {
  if (!env.isCloudConfigured || !env.supabaseUrl || !env.supabaseAnonKey) {
    throw new AppError('CONFIG_MISSING');
  }
  if (client) return client;
  client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      storage: SecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  log.info('Supabase client initialized', { env: env.appEnv });
  return client;
}
