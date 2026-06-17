/**
 * App boot sequence: open DB, run idempotent migrations, record a boot audit row,
 * and start the offline-first sync engine. Safe to call once on app startup.
 */
import { Platform } from 'react-native';
import * as Application from 'expo-application';
import { getDb } from './db/sqlite';
import { runMigrations } from './db/migrations';
import { newId } from './ids';
import { createLogger } from './logger/logger';
import { startSyncEngine } from './sync/syncEngine';

const log = createLogger('boot');

let booted = false;

export function boot(): void {
  if (booted) return;
  const db = getDb();
  runMigrations();
  db.runSync(
    `INSERT INTO app_boot_audit (id, app_version, platform, os_version, note) VALUES (?, ?, ?, ?, ?)`,
    [
      newId(),
      Application.nativeApplicationVersion ?? 'dev',
      Platform.OS,
      String(Platform.Version),
      'app_boot',
    ],
  );
  startSyncEngine();
  booted = true;
  log.info('Boot complete');
}
