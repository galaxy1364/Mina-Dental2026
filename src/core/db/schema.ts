/**
 * Drizzle schema for the LOCAL SQLite database (offline source of truth).
 * Mirrors the canonical local data model. The DDL in `migrations.ts` is kept in
 * sync with these definitions. All timestamps are Gregorian ISO strings.
 */
import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export type SyncStatus = 'pending' | 'synced' | 'conflict';

/** Key/value metadata: schema_version, last_sync_at, device_id, etc. */
export const localMeta = sqliteTable('local_meta', {
  key: text('key').primaryKey(),
  value: text('value'),
  updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
});

/** Durable outbox of offline writes. MUST survive app kill until synced. */
export const syncQueue = sqliteTable(
  'sync_queue',
  {
    id: text('id').primaryKey(),
    entityType: text('entity_type').notNull(),
    entityId: text('entity_id').notNull(),
    op: text('op', { enum: ['insert', 'update', 'delete'] }).notNull(),
    payload: text('payload').notNull(),
    status: text('status', { enum: ['pending', 'in_flight', 'failed', 'dead_letter'] })
      .notNull()
      .default('pending'),
    attempts: integer('attempts').notNull().default(0),
    lastError: text('last_error'),
    createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
  },
  (t) => ({
    statusIdx: index('idx_sync_queue_status').on(t.status, t.createdAt),
    entityIdx: index('idx_sync_queue_entity').on(t.entityType, t.entityId),
  }),
);

/** Cached session so the app can boot and authorize offline. */
export const userSessionCache = sqliteTable('user_session_cache', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  email: text('email'),
  role: text('role'),
  clinicId: text('clinic_id'),
  displayName: text('display_name'),
  cachedAt: text('cached_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
});

/** Append-only local boot audit. */
export const appBootAudit = sqliteTable('app_boot_audit', {
  id: text('id').primaryKey(),
  bootAt: text('boot_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
  appVersion: text('app_version'),
  platform: text('platform'),
  osVersion: text('os_version'),
  note: text('note'),
});

export const appSettingsLocal = sqliteTable('app_settings_local', {
  key: text('key').primaryKey(),
  value: text('value'),
  updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
});

export const featureFlags = sqliteTable('feature_flags', {
  key: text('key').primaryKey(),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(false),
  updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
});

/** Patient records — local mirror. `search_norm` powers fast normalized search. */
export const patientsLocal = sqliteTable(
  'patients_local',
  {
    id: text('id').primaryKey(),
    clinicId: text('clinic_id').notNull(),
    fileNumber: integer('file_number').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    nationalCode: text('national_code'),
    mobile: text('mobile'),
    searchNorm: text('search_norm'),
    dob: text('dob'),
    gender: text('gender', { enum: ['male', 'female', 'other'] }),
    createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    deletedAt: text('deleted_at'),
    syncStatus: text('sync_status', { enum: ['pending', 'synced', 'conflict'] })
      .notNull()
      .default('pending'),
  },
  (t) => ({
    fileNoIdx: uniqueIndex('idx_patients_file_no').on(t.clinicId, t.fileNumber),
    nameIdx: index('idx_patients_name').on(t.lastName, t.firstName),
    mobileIdx: index('idx_patients_mobile').on(t.mobile),
    searchIdx: index('idx_patients_search').on(t.searchNorm),
  }),
);

/** Appointments — local mirror. Hours constrained to 08:00–24:00 at the domain layer. */
export const appointmentsLocal = sqliteTable(
  'appointments_local',
  {
    id: text('id').primaryKey(),
    clinicId: text('clinic_id').notNull(),
    patientId: text('patient_id').notNull(),
    doctorId: text('doctor_id'),
    unit: text('unit'),
    startTime: text('start_time').notNull(),
    endTime: text('end_time').notNull(),
    status: text('status', {
      enum: ['scheduled', 'confirmed', 'arrived', 'in_progress', 'completed', 'no_show', 'cancelled'],
    })
      .notNull()
      .default('scheduled'),
    notes: text('notes'),
    createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    deletedAt: text('deleted_at'),
    syncStatus: text('sync_status', { enum: ['pending', 'synced', 'conflict'] })
      .notNull()
      .default('pending'),
  },
  (t) => ({
    startIdx: index('idx_appts_start').on(t.clinicId, t.startTime),
    doctorIdx: index('idx_appts_doctor').on(t.doctorId, t.startTime),
    patientIdx: index('idx_appts_patient').on(t.patientId, t.startTime),
  }),
);

/** Staff: doctors, secretaries, assistants and the manager. `auth_user_id` links to Supabase Auth. */
export const staffLocal = sqliteTable(
  'staff_local',
  {
    id: text('id').primaryKey(),
    clinicId: text('clinic_id').notNull(),
    authUserId: text('auth_user_id'),
    fullName: text('full_name').notNull(),
    role: text('role', { enum: ['manager', 'doctor', 'secretary', 'assistant'] }).notNull(),
    mobile: text('mobile'),
    nationalCode: text('national_code'),
    commissionModel: text('commission_model', {
      enum: ['none', 'fixed_50', 'percentage', 'advanced'],
    })
      .notNull()
      .default('none'),
    commissionPercent: integer('commission_percent'),
    active: integer('active', { mode: 'boolean' }).notNull().default(true),
    notes: text('notes'),
    searchNorm: text('search_norm'),
    createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    deletedAt: text('deleted_at'),
    syncStatus: text('sync_status', { enum: ['pending', 'synced', 'conflict'] })
      .notNull()
      .default('pending'),
  },
  (t) => ({
    roleIdx: index('idx_staff_role').on(t.clinicId, t.role),
    searchIdx: index('idx_staff_search').on(t.searchNorm),
  }),
);

/** Dental labs — fixed (ثابت) or removable (متحرک). */
export const labsLocal = sqliteTable(
  'labs_local',
  {
    id: text('id').primaryKey(),
    clinicId: text('clinic_id').notNull(),
    name: text('name').notNull(),
    type: text('type', { enum: ['fixed', 'removable'] }).notNull(),
    phone: text('phone'),
    address: text('address'),
    contactPerson: text('contact_person'),
    active: integer('active', { mode: 'boolean' }).notNull().default(true),
    notes: text('notes'),
    searchNorm: text('search_norm'),
    createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    deletedAt: text('deleted_at'),
    syncStatus: text('sync_status', { enum: ['pending', 'synced', 'conflict'] })
      .notNull()
      .default('pending'),
  },
  (t) => ({
    typeIdx: index('idx_labs_type').on(t.clinicId, t.type),
    searchIdx: index('idx_labs_search').on(t.searchNorm),
  }),
);

/** Lab work orders (سفارش لابراتوار) — links a patient to a lab with a status timeline. */
export const labCasesLocal = sqliteTable(
  'lab_cases_local',
  {
    id: text('id').primaryKey(),
    clinicId: text('clinic_id').notNull(),
    patientId: text('patient_id').notNull(),
    labId: text('lab_id').notNull(),
    doctorId: text('doctor_id'),
    title: text('title').notNull(),
    toothNumbers: text('tooth_numbers'),
    status: text('status', {
      enum: ['ordered', 'in_lab', 'ready', 'delivered', 'returned', 'cancelled'],
    })
      .notNull()
      .default('ordered'),
    sentAt: text('sent_at'),
    dueAt: text('due_at'),
    deliveredAt: text('delivered_at'),
    price: integer('price'),
    notes: text('notes'),
    searchNorm: text('search_norm'),
    createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    deletedAt: text('deleted_at'),
    syncStatus: text('sync_status', { enum: ['pending', 'synced', 'conflict'] })
      .notNull()
      .default('pending'),
  },
  (t) => ({
    patientIdx: index('idx_lab_cases_patient').on(t.patientId, t.createdAt),
    labIdx: index('idx_lab_cases_lab').on(t.labId, t.status),
    statusIdx: index('idx_lab_cases_status').on(t.clinicId, t.status),
  }),
);

/** Financial ledger (مالی): `charge` increases a patient's balance, `payment` reduces it. */
export const paymentsLocal = sqliteTable(
  'payments_local',
  {
    id: text('id').primaryKey(),
    clinicId: text('clinic_id').notNull(),
    patientId: text('patient_id').notNull(),
    doctorId: text('doctor_id'),
    direction: text('direction', { enum: ['charge', 'payment'] }).notNull(),
    amount: integer('amount').notNull(),
    method: text('method', { enum: ['cash', 'card', 'transfer', 'other'] }),
    description: text('description'),
    paidAt: text('paid_at').notNull(),
    createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    deletedAt: text('deleted_at'),
    syncStatus: text('sync_status', { enum: ['pending', 'synced', 'conflict'] })
      .notNull()
      .default('pending'),
  },
  (t) => ({
    patientIdx: index('idx_payments_patient').on(t.patientId, t.paidAt),
    dateIdx: index('idx_payments_date').on(t.clinicId, t.paidAt),
  }),
);

/** Implant registry (ایمپلنت) — per patient placement records. */
export const implantsLocal = sqliteTable(
  'implants_local',
  {
    id: text('id').primaryKey(),
    clinicId: text('clinic_id').notNull(),
    patientId: text('patient_id').notNull(),
    doctorId: text('doctor_id'),
    brand: text('brand').notNull(),
    system: text('system'),
    toothNumber: text('tooth_number'),
    fixtureDiameter: text('fixture_diameter'),
    fixtureLength: text('fixture_length'),
    placedAt: text('placed_at'),
    notes: text('notes'),
    searchNorm: text('search_norm'),
    createdAt: text('created_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ','now'))`),
    deletedAt: text('deleted_at'),
    syncStatus: text('sync_status', { enum: ['pending', 'synced', 'conflict'] })
      .notNull()
      .default('pending'),
  },
  (t) => ({
    patientIdx: index('idx_implants_patient').on(t.patientId, t.placedAt),
    brandIdx: index('idx_implants_brand').on(t.clinicId, t.brand),
  }),
);

export const schema = {
  localMeta,
  syncQueue,
  userSessionCache,
  appBootAudit,
  appSettingsLocal,
  featureFlags,
  patientsLocal,
  appointmentsLocal,
  staffLocal,
  labsLocal,
  labCasesLocal,
  paymentsLocal,
  implantsLocal,
};
