/**
 * Patients repository — offline-first CRUD over the local SQLite mirror.
 * Local-first writes + durable sync outbox; soft-delete only. File numbers are
 * assigned per clinic by incrementing the current maximum, so they stay stable
 * and unique even offline.
 */
import { and, asc, desc, eq, isNull, like, or, sql } from 'drizzle-orm';
import { db } from '@/core/db/client';
import { patientsLocal } from '@/core/db/schema';
import { CLINIC } from '@/core/clinic';
import { newId } from '@/core/ids';
import { enqueue } from '@/core/sync/syncQueue';
import { nowIso } from '@/lib/jalali';
import { normalizePersian } from '@/lib/persian';

export type Gender = 'male' | 'female' | 'other';

export interface Patient {
  id: string;
  clinicId: string;
  fileNumber: number;
  firstName: string;
  lastName: string;
  nationalCode: string | null;
  mobile: string | null;
  dob: string | null;
  gender: Gender | null;
}

export interface PatientInput {
  firstName: string;
  lastName: string;
  nationalCode?: string | null;
  mobile?: string | null;
  dob?: string | null;
  gender?: Gender | null;
}

export const GENDER_LABELS: Record<Gender, string> = {
  male: 'مرد',
  female: 'زن',
  other: 'سایر',
};

export function fullName(p: Patient): string {
  return `${p.firstName} ${p.lastName}`.trim();
}

function nextFileNumber(): number {
  const row = db
    .select({ max: sql<number>`COALESCE(MAX(${patientsLocal.fileNumber}), 0)` })
    .from(patientsLocal)
    .where(eq(patientsLocal.clinicId, CLINIC.id))
    .get();
  return (row?.max ?? 0) + 1;
}

export function listPatients(query?: string, limit = 100): Patient[] {
  const base = and(eq(patientsLocal.clinicId, CLINIC.id), isNull(patientsLocal.deletedAt));
  const q = query?.trim();
  if (q) {
    const norm = `%${normalizePersian(q)}%`;
    return db
      .select()
      .from(patientsLocal)
      .where(
        and(
          base,
          or(
            like(patientsLocal.searchNorm, norm),
            like(patientsLocal.mobile, `%${q}%`),
            like(patientsLocal.nationalCode, `%${q}%`),
          ),
        ),
      )
      .orderBy(asc(patientsLocal.lastName), asc(patientsLocal.firstName))
      .limit(limit)
      .all();
  }
  return db
    .select()
    .from(patientsLocal)
    .where(base)
    .orderBy(desc(patientsLocal.createdAt))
    .limit(limit)
    .all();
}

export function countPatients(): number {
  const row = db
    .select({ c: sql<number>`COUNT(*)` })
    .from(patientsLocal)
    .where(and(eq(patientsLocal.clinicId, CLINIC.id), isNull(patientsLocal.deletedAt)))
    .get();
  return row?.c ?? 0;
}

export function getPatient(id: string): Patient | undefined {
  return db.select().from(patientsLocal).where(eq(patientsLocal.id, id)).get();
}

function searchNormOf(input: PatientInput): string {
  return normalizePersian(
    [input.firstName, input.lastName, input.mobile ?? '', input.nationalCode ?? ''].join(' '),
  );
}

export function createPatient(input: PatientInput): Patient {
  const id = newId();
  const now = nowIso();
  const row = {
    id,
    clinicId: CLINIC.id,
    fileNumber: nextFileNumber(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    nationalCode: input.nationalCode ?? null,
    mobile: input.mobile ?? null,
    dob: input.dob ?? null,
    gender: input.gender ?? null,
    searchNorm: searchNormOf(input),
    createdAt: now,
    updatedAt: now,
    syncStatus: 'pending' as const,
  };
  db.insert(patientsLocal).values(row).run();
  enqueue({ entityType: 'patient', entityId: id, op: 'insert', payload: toCloud(row) });
  return getPatient(id)!;
}

export function updatePatient(id: string, input: PatientInput): Patient {
  const now = nowIso();
  db.update(patientsLocal)
    .set({
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      nationalCode: input.nationalCode ?? null,
      mobile: input.mobile ?? null,
      dob: input.dob ?? null,
      gender: input.gender ?? null,
      searchNorm: searchNormOf(input),
      updatedAt: now,
      syncStatus: 'pending',
    })
    .where(eq(patientsLocal.id, id))
    .run();
  const row = getPatient(id)!;
  enqueue({ entityType: 'patient', entityId: id, op: 'update', payload: toCloud(row) });
  return row;
}

/** Soft delete — data is never physically removed. */
export function deletePatient(id: string): void {
  const now = nowIso();
  db.update(patientsLocal)
    .set({ deletedAt: now, updatedAt: now, syncStatus: 'pending' })
    .where(eq(patientsLocal.id, id))
    .run();
  enqueue({ entityType: 'patient', entityId: id, op: 'delete', payload: { id, deleted_at: now } });
}

function toCloud(row: Patient): Record<string, unknown> {
  return {
    id: row.id,
    clinic_id: row.clinicId,
    file_number: row.fileNumber,
    first_name: row.firstName,
    last_name: row.lastName,
    national_code: row.nationalCode,
    mobile: row.mobile,
    dob: row.dob,
    gender: row.gender,
  };
}
