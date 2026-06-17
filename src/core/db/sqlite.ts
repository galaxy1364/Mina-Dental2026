import * as SQLite from 'expo-sqlite';
import { createLogger } from '../logger/logger';

const log = createLogger('sqlite');

export const DB_NAME = 'minadent.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

/**
 * Open (once) the local SQLite database — the offline source of truth.
 * WAL mode enables concurrent reads for large datasets (200k+ patients).
 */
export function getDb(): SQLite.SQLiteDatabase {
  if (dbInstance) return dbInstance;
  const db = SQLite.openDatabaseSync(DB_NAME);
  db.execSync('PRAGMA journal_mode = WAL;');
  db.execSync('PRAGMA foreign_keys = ON;');
  db.execSync('PRAGMA busy_timeout = 5000;');
  db.execSync('PRAGMA synchronous = NORMAL;');
  dbInstance = db;
  log.info('SQLite opened', { name: DB_NAME });
  return db;
}
