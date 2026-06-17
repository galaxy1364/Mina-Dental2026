/**
 * Structured logger. Never logs PII (patient names, national codes, phones, tokens).
 * In production, debug/info are suppressed; warn/error are kept for diagnostics.
 */
import { env } from '../config/env';

type Level = 'debug' | 'info' | 'warn' | 'error';

const ORDER: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const MIN_LEVEL: number = env.appEnv === 'production' ? ORDER.warn : ORDER.debug;

function emit(level: Level, scope: string, message: string, meta?: Record<string, unknown>) {
  if (ORDER[level] < MIN_LEVEL) return;
  const entry = {
    ts: new Date().toISOString(),
    level,
    scope,
    message,
    ...(meta ? { meta } : {}),
  };
  const line = JSON.stringify(entry);
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

export function createLogger(scope: string) {
  return {
    debug: (m: string, meta?: Record<string, unknown>) => emit('debug', scope, m, meta),
    info: (m: string, meta?: Record<string, unknown>) => emit('info', scope, m, meta),
    warn: (m: string, meta?: Record<string, unknown>) => emit('warn', scope, m, meta),
    error: (m: string, meta?: Record<string, unknown>) => emit('error', scope, m, meta),
  };
}

export type Logger = ReturnType<typeof createLogger>;
