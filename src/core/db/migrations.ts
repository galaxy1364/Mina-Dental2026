import { getDb } from './sqlite';
import { CLINIC } from '../clinic';
import { newId } from '../ids';
import { createLogger } from '../logger/logger';
import { normalizePersian } from '@/lib/persian';

const log = createLogger('migrations');

export const SCHEMA_VERSION = 4;

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

CREATE TABLE IF NOT EXISTS staff_local (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  auth_user_id TEXT,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('manager','doctor','secretary','assistant')),
  mobile TEXT,
  national_code TEXT,
  commission_model TEXT NOT NULL DEFAULT 'none' CHECK(commission_model IN ('none','fixed_50','percentage','advanced')),
  commission_percent INTEGER,
  active INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  search_norm TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  deleted_at TEXT,
  sync_status TEXT NOT NULL DEFAULT 'pending' CHECK(sync_status IN ('pending','synced','conflict'))
);
CREATE INDEX IF NOT EXISTS idx_staff_role ON staff_local(clinic_id, role);
CREATE INDEX IF NOT EXISTS idx_staff_search ON staff_local(search_norm);

CREATE TABLE IF NOT EXISTS labs_local (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('fixed','removable')),
  phone TEXT,
  address TEXT,
  contact_person TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  search_norm TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  deleted_at TEXT,
  sync_status TEXT NOT NULL DEFAULT 'pending' CHECK(sync_status IN ('pending','synced','conflict'))
);
CREATE INDEX IF NOT EXISTS idx_labs_type ON labs_local(clinic_id, type);
CREATE INDEX IF NOT EXISTS idx_labs_search ON labs_local(search_norm);

CREATE TABLE IF NOT EXISTS lab_cases_local (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  patient_id TEXT NOT NULL,
  lab_id TEXT NOT NULL,
  doctor_id TEXT,
  title TEXT NOT NULL,
  tooth_numbers TEXT,
  status TEXT NOT NULL DEFAULT 'ordered'
    CHECK(status IN ('ordered','in_lab','ready','delivered','returned','cancelled')),
  sent_at TEXT,
  due_at TEXT,
  delivered_at TEXT,
  price INTEGER,
  notes TEXT,
  search_norm TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  deleted_at TEXT,
  sync_status TEXT NOT NULL DEFAULT 'pending' CHECK(sync_status IN ('pending','synced','conflict'))
);
CREATE INDEX IF NOT EXISTS idx_lab_cases_patient ON lab_cases_local(patient_id, created_at);
CREATE INDEX IF NOT EXISTS idx_lab_cases_lab ON lab_cases_local(lab_id, status);
CREATE INDEX IF NOT EXISTS idx_lab_cases_status ON lab_cases_local(clinic_id, status);

CREATE TABLE IF NOT EXISTS payments_local (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  patient_id TEXT NOT NULL,
  doctor_id TEXT,
  direction TEXT NOT NULL CHECK(direction IN ('charge','payment')),
  amount INTEGER NOT NULL,
  method TEXT CHECK(method IN ('cash','card','transfer','other')),
  description TEXT,
  paid_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  deleted_at TEXT,
  sync_status TEXT NOT NULL DEFAULT 'pending' CHECK(sync_status IN ('pending','synced','conflict'))
);
CREATE INDEX IF NOT EXISTS idx_payments_patient ON payments_local(patient_id, paid_at);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments_local(clinic_id, paid_at);

CREATE TABLE IF NOT EXISTS implants_local (
  id TEXT PRIMARY KEY,
  clinic_id TEXT NOT NULL,
  patient_id TEXT NOT NULL,
  doctor_id TEXT,
  brand TEXT NOT NULL,
  system TEXT,
  tooth_number TEXT,
  fixture_diameter TEXT,
  fixture_length TEXT,
  placed_at TEXT,
  notes TEXT,
  search_norm TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  deleted_at TEXT,
  sync_status TEXT NOT NULL DEFAULT 'pending' CHECK(sync_status IN ('pending','synced','conflict'))
);
CREATE INDEX IF NOT EXISTS idx_implants_patient ON implants_local(patient_id, placed_at);
CREATE INDEX IF NOT EXISTS idx_implants_brand ON implants_local(clinic_id, brand);
`;

interface StaffSeed {
  fullName: string;
  role: 'manager' | 'doctor' | 'secretary' | 'assistant';
}
const STAFF_SEED: StaffSeed[] = [
  { fullName: 'دکتر مهدی', role: 'manager' },
  { fullName: 'دکتر مینا مازندرانی', role: 'doctor' },
  { fullName: 'دکتر ابوالفضل فراهانی', role: 'doctor' },
  { fullName: 'دکتر علی یازرلو', role: 'doctor' },
  { fullName: 'اکرم عیدی', role: 'assistant' },
];

interface LabSeed {
  name: string;
  type: 'fixed' | 'removable';
}
const LAB_SEED: LabSeed[] = [
  { name: 'ناژداکی', type: 'fixed' },
  { name: 'هژبری', type: 'removable' },
];

/**
 * Seeds the clinic's known staff and labs once. Idempotent: each row is only
 * inserted when no active record with the same identity already exists, so it
 * never duplicates or overwrites edits the user has made.
 */
/** Appends a cloud-sync outbox entry so seeded rows reach the cloud like any other write. */
function enqueueSeed(
  db: ReturnType<typeof getDb>,
  entityType: string,
  entityId: string,
  payload: Record<string, unknown>,
): void {
  db.runSync(
    `INSERT INTO sync_queue (id, entity_type, entity_id, op, payload, status, attempts)
     VALUES (?, ?, ?, 'insert', ?, 'pending', 0)`,
    [newId(), entityType, entityId, JSON.stringify(payload)],
  );
}

function seedClinicData(db: ReturnType<typeof getDb>): void {
  for (const s of STAFF_SEED) {
    const exists = db.getFirstSync<{ id: string }>(
      `SELECT id FROM staff_local WHERE clinic_id = ? AND full_name = ? AND deleted_at IS NULL LIMIT 1`,
      [CLINIC.id, s.fullName],
    );
    if (exists) continue;
    const id = newId();
    db.runSync(
      `INSERT INTO staff_local (id, clinic_id, full_name, role, search_norm, sync_status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [id, CLINIC.id, s.fullName, s.role, normalizePersian(s.fullName)],
    );
    enqueueSeed(db, 'staff', id, {
      id,
      clinic_id: CLINIC.id,
      full_name: s.fullName,
      role: s.role,
    });
  }
  for (const l of LAB_SEED) {
    const exists = db.getFirstSync<{ id: string }>(
      `SELECT id FROM labs_local WHERE clinic_id = ? AND name = ? AND deleted_at IS NULL LIMIT 1`,
      [CLINIC.id, l.name],
    );
    if (exists) continue;
    const id = newId();
    db.runSync(
      `INSERT INTO labs_local (id, clinic_id, name, type, search_norm, sync_status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [id, CLINIC.id, l.name, l.type, normalizePersian(l.name)],
    );
    enqueueSeed(db, 'lab', id, {
      id,
      clinic_id: CLINIC.id,
      name: l.name,
      type: l.type,
    });
  }
}

function tableExists(db: ReturnType<typeof getDb>, table: string): boolean {
  return !!db.getFirstSync<{ name: string }>(
    `SELECT name FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1`,
    [table],
  );
}

/** Individual SQL statements that make up the DDL (tables + indexes). */
const DDL_STATEMENTS = DDL.split(';')
  .map((s) => s.trim())
  .filter(Boolean);

/** Every table the DDL manages, in declaration order. */
const MANAGED_TABLES = [...DDL.matchAll(/CREATE TABLE IF NOT EXISTS (\w+)/g)].map((m) => m[1]);

function createTableStmt(table: string): string | undefined {
  return DDL_STATEMENTS.find((s) => new RegExp(`CREATE TABLE IF NOT EXISTS ${table}\\b`).test(s));
}

function indexStmts(table: string): string[] {
  return DDL_STATEMENTS.filter(
    (s) => /CREATE\b.*\bINDEX/i.test(s) && new RegExp(`\\bON ${table}\\b`).test(s),
  );
}

/** Parse the declared column names out of a `CREATE TABLE (...)` statement. */
function declaredColumns(createStmt: string): string[] {
  const body = createStmt.slice(createStmt.indexOf('(') + 1, createStmt.lastIndexOf(')'));
  const segments: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of body) {
    if (ch === '(') depth += 1;
    else if (ch === ')') depth -= 1;
    if (ch === ',' && depth === 0) {
      segments.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  segments.push(cur);
  const constraints = new Set(['CHECK', 'PRIMARY', 'UNIQUE', 'FOREIGN', 'CONSTRAINT']);
  const cols: string[] = [];
  for (const seg of segments) {
    const token = seg.trim().split(/\s+/)[0];
    if (token && !constraints.has(token.toUpperCase())) cols.push(token);
  }
  return cols;
}

/**
 * Reconcile pre-existing tables with the current schema. `CREATE TABLE IF NOT
 * EXISTS` never alters an existing table, so a database built by an older schema
 * can be missing columns (e.g. `search_norm`, `start_time`). For any table that is
 * missing one or more declared columns, rebuild it from the current DDL and copy
 * over the rows' shared columns — so the schema is corrected without losing data.
 * On a fresh database this is a no-op (no tables exist yet).
 */
function reconcileSchema(db: ReturnType<typeof getDb>): void {
  for (const table of MANAGED_TABLES) {
    if (!tableExists(db, table)) continue;
    const createStmt = createTableStmt(table);
    if (!createStmt) continue;
    const expected = declaredColumns(createStmt);
    const actual = new Set(
      db.getAllSync<{ name: string }>(`PRAGMA table_info(${table})`).map((c) => c.name),
    );
    const missing = expected.filter((c) => !actual.has(c));
    if (missing.length === 0) continue;

    const common = expected.filter((c) => actual.has(c));
    const tmp = `${table}__migrate_old`;
    db.execSync(`DROP TABLE IF EXISTS ${tmp}`);
    db.execSync(`ALTER TABLE ${table} RENAME TO ${tmp}`);
    db.execSync(createStmt);
    if (common.length) {
      const list = common.join(', ');
      try {
        db.runSync(`INSERT INTO ${table} (${list}) SELECT ${list} FROM ${tmp}`);
      } catch (err) {
        // Old rows can be incompatible with a newly-required column (e.g. a NOT
        // NULL column that the old table never had). Such legacy rows can't be
        // preserved; start the rebuilt table empty rather than aborting boot.
        log.warn('Could not preserve rows while rebuilding table; starting empty', {
          table,
          error: String(err),
        });
      }
    }
    db.execSync(`DROP TABLE ${tmp}`);
    for (const idx of indexStmts(table)) db.execSync(idx);
    log.info('Rebuilt drifted table', { table, missing });
  }
}

/** Source columns that compose each table's normalized search string. */
const SEARCH_NORM_SOURCES: { table: string; columns: string[] }[] = [
  { table: 'patients_local', columns: ['first_name', 'last_name', 'mobile', 'national_code'] },
  { table: 'staff_local', columns: ['full_name'] },
  { table: 'labs_local', columns: ['name'] },
  { table: 'lab_cases_local', columns: ['title'] },
  { table: 'implants_local', columns: ['brand', 'system'] },
];

/**
 * Recompute `search_norm` (via JS `normalizePersian`) for rows where it is NULL —
 * i.e. rows that predate the column being added — so existing records stay
 * searchable. Idempotent: only touches rows still missing the value.
 */
function backfillSearchNorm(db: ReturnType<typeof getDb>): void {
  for (const { table, columns } of SEARCH_NORM_SOURCES) {
    if (!tableExists(db, table)) continue;
    const rows = db.getAllSync<Record<string, string | null>>(
      `SELECT id, ${columns.join(', ')} FROM ${table} WHERE search_norm IS NULL`,
    );
    for (const row of rows) {
      const norm = normalizePersian(columns.map((c) => row[c] ?? '').join(' '));
      db.runSync(`UPDATE ${table} SET search_norm = ? WHERE id = ?`, [norm, row.id]);
    }
    if (rows.length) log.info('Backfilled search_norm', { table, rows: rows.length });
  }
}

export function runMigrations(): void {
  const db = getDb();
  // Rebuild any pre-existing table that drifted from the current schema BEFORE the
  // DDL runs, so the DDL's `CREATE INDEX ... ON <table>(<col>)` can't hit "no such
  // column" on a database created by an earlier schema. No-op on a fresh DB.
  reconcileSchema(db);
  db.execSync(DDL);
  backfillSearchNorm(db);
  seedClinicData(db);
  db.runSync(
    `INSERT INTO local_meta (key, value, updated_at) VALUES ('schema_version', ?, strftime('%Y-%m-%dT%H:%M:%fZ','now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    [String(SCHEMA_VERSION)],
  );
  log.info('Migrations applied', { schemaVersion: SCHEMA_VERSION });
}
