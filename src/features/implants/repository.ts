/**
 * Implant registry (ایمپلنت) — offline-first per-patient placement records.
 * Local-first writes + durable sync outbox; soft-delete only.
 */
import { and, desc, eq, isNull } from 'drizzle-orm';
import { db } from '@/core/db/client';
import { implantsLocal } from '@/core/db/schema';
import { CLINIC } from '@/core/clinic';
import { newId } from '@/core/ids';
import { enqueue } from '@/core/sync/syncQueue';
import { nowIso } from '@/lib/jalali';
import { normalizePersian } from '@/lib/persian';

export interface Implant {
  id: string;
  clinicId: string;
  patientId: string;
  doctorId: string | null;
  brand: string;
  system: string | null;
  toothNumber: string | null;
  fixtureDiameter: string | null;
  fixtureLength: string | null;
  placedAt: string | null;
  notes: string | null;
}

export interface ImplantInput {
  patientId: string;
  doctorId?: string | null;
  brand: string;
  system?: string | null;
  toothNumber?: string | null;
  fixtureDiameter?: string | null;
  fixtureLength?: string | null;
  placedAt?: string | null;
  notes?: string | null;
}

const activeClinic = () =>
  and(eq(implantsLocal.clinicId, CLINIC.id), isNull(implantsLocal.deletedAt));

export function listImplantsForPatient(patientId: string): Implant[] {
  return db
    .select()
    .from(implantsLocal)
    .where(and(activeClinic(), eq(implantsLocal.patientId, patientId)))
    .orderBy(desc(implantsLocal.placedAt))
    .all();
}

export function getImplant(id: string): Implant | undefined {
  return db.select().from(implantsLocal).where(eq(implantsLocal.id, id)).get();
}

export function createImplant(input: ImplantInput): Implant {
  const id = newId();
  const now = nowIso();
  const row = {
    id,
    clinicId: CLINIC.id,
    patientId: input.patientId,
    doctorId: input.doctorId ?? null,
    brand: input.brand.trim(),
    system: input.system ?? null,
    toothNumber: input.toothNumber ?? null,
    fixtureDiameter: input.fixtureDiameter ?? null,
    fixtureLength: input.fixtureLength ?? null,
    placedAt: input.placedAt ?? null,
    notes: input.notes ?? null,
    searchNorm: normalizePersian(`${input.brand} ${input.system ?? ''}`),
    createdAt: now,
    updatedAt: now,
    syncStatus: 'pending' as const,
  };
  db.insert(implantsLocal).values(row).run();
  enqueue({ entityType: 'implant', entityId: id, op: 'insert', payload: toCloud(row) });
  return getImplant(id)!;
}

export function updateImplant(id: string, input: ImplantInput): Implant {
  const now = nowIso();
  db.update(implantsLocal)
    .set({
      patientId: input.patientId,
      doctorId: input.doctorId ?? null,
      brand: input.brand.trim(),
      system: input.system ?? null,
      toothNumber: input.toothNumber ?? null,
      fixtureDiameter: input.fixtureDiameter ?? null,
      fixtureLength: input.fixtureLength ?? null,
      placedAt: input.placedAt ?? null,
      notes: input.notes ?? null,
      searchNorm: normalizePersian(`${input.brand} ${input.system ?? ''}`),
      updatedAt: now,
      syncStatus: 'pending',
    })
    .where(eq(implantsLocal.id, id))
    .run();
  const row = getImplant(id)!;
  enqueue({ entityType: 'implant', entityId: id, op: 'update', payload: toCloud(row) });
  return row;
}

/** Soft delete — data is never physically removed. */
export function deleteImplant(id: string): void {
  const now = nowIso();
  db.update(implantsLocal)
    .set({ deletedAt: now, updatedAt: now, syncStatus: 'pending' })
    .where(eq(implantsLocal.id, id))
    .run();
  enqueue({ entityType: 'implant', entityId: id, op: 'delete', payload: { id, deleted_at: now } });
}

function toCloud(row: Implant): Record<string, unknown> {
  return {
    id: row.id,
    clinic_id: row.clinicId,
    patient_id: row.patientId,
    doctor_id: row.doctorId,
    brand: row.brand,
    system: row.system,
    tooth_number: row.toothNumber,
    fixture_diameter: row.fixtureDiameter,
    fixture_length: row.fixtureLength,
    placed_at: row.placedAt,
    notes: row.notes,
  };
}
