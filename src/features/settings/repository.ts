/**
 * App settings repository — typed key/value store over the local `app_settings_local`
 * table. Used for per-device UI preferences (e.g. the customizable dashboard
 * layout). Local-only; not part of the sync outbox.
 */
import { eq } from 'drizzle-orm';
import { db } from '@/core/db/client';
import { appSettingsLocal } from '@/core/db/schema';
import { nowIso } from '@/lib/jalali';

/** Read a raw string setting, or `null` when unset. */
export function getSetting(key: string): string | null {
  const row = db
    .select({ value: appSettingsLocal.value })
    .from(appSettingsLocal)
    .where(eq(appSettingsLocal.key, key))
    .get();
  return row?.value ?? null;
}

/** Upsert a raw string setting. */
export function setSetting(key: string, value: string): void {
  db.insert(appSettingsLocal)
    .values({ key, value, updatedAt: nowIso() })
    .onConflictDoUpdate({
      target: appSettingsLocal.key,
      set: { value, updatedAt: nowIso() },
    })
    .run();
}

/** Read a JSON setting, returning `fallback` when unset or unparseable. */
export function getJsonSetting<T>(key: string, fallback: T): T {
  const raw = getSetting(key);
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Upsert a JSON setting. */
export function setJsonSetting<T>(key: string, value: T): void {
  setSetting(key, JSON.stringify(value));
}
