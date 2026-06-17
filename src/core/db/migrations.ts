import { getDb } from './sqlite';
import { createLogger } from '../logger/logger';

const log = createLogger('migrations');

export const SCHEMA_VERSION = 1;

/**
 * Idempotent bootstrap of the local schema. Uses CREATE TABLE IF NOT EXISTS so it
 * is always safe to run on boot and NEVER drops or clears existing data.
 */
const DDL = `
CREATE TABLE IF NOT EXISTS local_meta (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS sync_queue (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  op TEXT NOT NULL CHECK(op IN ('insert','update','delete')),
  payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','in_flight','failed','dead_letter')),
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue(status, created_at);
CREATE INDEX IF NOT EXISTS idx_sync_queue_entity ON sync_queue(entity_type, entity_id);

CREATE TABLE IF NOT EXISTS user_session_cache (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT,
  role TEXT,
  clinic_id TEXT,
  display_name TEXT,
  cached_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS app_boot_audit (
  id TEXT PRIMARY KEY,
  boot_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  app_version TEXT,
  platform TEXT,
  os_version TEXT,
  note TEXT
);

CREATE TABLE IF NOT EXISTS app_settings_local (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS feature_flags (
  key TEXT PRIMARY KEY,
  enabled INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS patients_local (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  file_number INTEGER NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  national_code TEXT,
  mobile TEXT,
  search_norm TEXT,
  dob TEXT,
  gender TEXT CHECK(gender IN ('male','female','other')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  deleted_at TEXT,
  sync_status TEXT NOT NULL DEFAULT 'pending' CHECK(sync_status IN ('pending','synced','conflict'))
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_patients_file_no ON patients_local(clinic_id, file_number);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients_local(last_name, first_name);
CREATE INDEX IF NOT EXISTS idx_patients_mobile ON patients_local(mobile);
CREATE INDEX IF NOT EXISTS idx_patients_search ON patients_local(search_norm);

CREATE TABLE IF NOT EXISTS appointments_local (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  patient_id TEXT NOT NULL,
  doctor_id TEXT,
  unit TEXT,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled'
    CHECK(status IN ('scheduled','confirmed','arrived','in_progress','completed','no_show','cancelled')),
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  deleted_at TEXT,
  sync_status TEXT NOT NULL DEFAULT 'pending' CHECK(sync_status IN ('pending','synced','conflict'))
);
CREATE INDEX IF NOT EXISTS idx_appts_start ON appointments_local(clinic_id, start_time);
CREATE INDEX IF NOT EXISTS idx_appts_doctor ON appointments_local(doctor_id, start_time);
CREATE INDEX IF NOT EXISTS idx_appts_patient ON appointments_local(patient_id, start_time);
`;

export function runMigrations(): void {
  const db = getDb();
  db.execSync(DDL);
  db.runSync(
    `INSERT INTO local_meta (key, value, updated_at) VALUES ('schema_version', ?, strftime('%Y-%m-%dT%H:%M:%fZ','now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    [String(SCHEMA_VERSION)],
  );
  log.info('Migrations applied', { schemaVersion: SCHEMA_VERSION });
}
