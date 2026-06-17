/**
 * Lab cases (سفارش لابراتوار) — offline-first work orders linking a patient to a
 * lab, with a status lifecycle that powers the patient timeline. Soft-delete only.
 */
import { and, desc, eq, isNull, ne, or } from 'drizzle-orm';
import { db } from '@/core/db/client';
import { labCasesLocal } from '@/core/db/schema';
import { CLINIC } from '@/core/clinic';
import { newId } from '@/core/ids';
import { enqueue } from '@/core/sync/syncQueue';
import { nowIso } from '@/lib/jalali';
import { normalizePersian } from '@/lib/persian';

export type LabCaseStatus = 'ordered' | 'in_lab' | 'ready' | 'delivered' | 'returned' | 'cancelled';

export interface LabCase {
  id: string;
  clinicId: string;
  patientId: string;
  labId: string;
  doctorId: string | null;
  title: string;
  toothNumbers: string | null;
  status: LabCaseStatus;
  sentAt: string | null;
  dueAt: string | null;
  deliveredAt: string | null;
  price: number | null;
  notes: string | null;
}

export interface LabCaseInput {
  patientId: string;
  labId: string;
  doctorId?: string | null;
  title: string;
  toothNumbers?: string | null;
  status?: LabCaseStatus;
  sentAt?: string | null;
  dueAt?: string | null;
  deliveredAt?: string | null;
  price?: number | null;
  notes?: string | null;
}

export const LAB_CASE_STATUS_LABELS: Record<LabCaseStatus, string> = {
  ordered: 'ثبت سفارش',
  in_lab: 'در لابراتوار',
  ready: 'آمادهٔ تحویل',
  delivered: 'تحویل‌شده',
  returned: 'برگشت/اصلاح',
  cancelled: 'لغوشده',
};

export const LAB_CASE_STATUSES: LabCaseStatus[] = [
  'ordered',
  'in_lab',
  'ready',
  'delivered',
  'returned',
  'cancelled',
];

/** Statuses that still need attention (not finished). */
const OPEN_STATUSES: LabCaseStatus[] = ['ordered', 'in_lab', 'ready', 'returned'];

const activeClinic = () =>
  and(eq(labCasesLocal.clinicId, CLINIC.id), isNull(labCasesLocal.deletedAt));

export function listLabCases(): LabCase[] {
  return db
    .select()
    .from(labCasesLocal)
    .where(activeClinic())
    .orderBy(desc(labCasesLocal.createdAt))
    .all();
}

export function listOpenLabCases(): LabCase[] {
  return db
    .select()
    .from(labCasesLocal)
    .where(
      and(
        activeClinic(),
        or(...OPEN_STATUSES.map((s) => eq(labCasesLocal.status, s))),
      ),
    )
    .orderBy(desc(labCasesLocal.createdAt))
    .all();
}

export function listLabCasesForPatient(patientId: string): LabCase[] {
  return db
    .select()
    .from(labCasesLocal)
    .where(and(activeClinic(), eq(labCasesLocal.patientId, patientId)))
    .orderBy(desc(labCasesLocal.createdAt))
    .all();
}

export function countOpenLabCases(): number {
  return listOpenLabCases().length;
}

/** Open cases whose due date is in the past — needs follow-up. */
export function listOverdueLabCases(now: Date = new Date()): LabCase[] {
  return listOpenLabCases().filter((c) => c.dueAt != null && new Date(c.dueAt) < now);
}

export function getLabCase(id: string): LabCase | undefined {
  return db.select().from(labCasesLocal).where(eq(labCasesLocal.id, id)).get();
}

export function isOpen(status: LabCaseStatus): boolean {
  return OPEN_STATUSES.includes(status);
}

export function createLabCase(input: LabCaseInput): LabCase {
  const id = newId();
  const now = nowIso();
  const row = {
    id,
    clinicId: CLINIC.id,
    patientId: input.patientId,
    labId: input.labId,
    doctorId: input.doctorId ?? null,
    title: input.title.trim(),
    toothNumbers: input.toothNumbers ?? null,
    status: input.status ?? ('ordered' as const),
    sentAt: input.sentAt ?? null,
    dueAt: input.dueAt ?? null,
    deliveredAt: input.deliveredAt ?? null,
    price: input.price ?? null,
    notes: input.notes ?? null,
    searchNorm: normalizePersian(input.title),
    createdAt: now,
    updatedAt: now,
    syncStatus: 'pending' as const,
  };
  db.insert(labCasesLocal).values(row).run();
  enqueue({ entityType: 'lab_case', entityId: id, op: 'insert', payload: toCloud(row) });
  return getLabCase(id)!;
}

export function updateLabCase(id: string, input: LabCaseInput): LabCase {
  const now = nowIso();
  db.update(labCasesLocal)
    .set({
      patientId: input.patientId,
      labId: input.labId,
      doctorId: input.doctorId ?? null,
      title: input.title.trim(),
      toothNumbers: input.toothNumbers ?? null,
      status: input.status ?? 'ordered',
      sentAt: input.sentAt ?? null,
      dueAt: input.dueAt ?? null,
      deliveredAt: input.deliveredAt ?? null,
      price: input.price ?? null,
      notes: input.notes ?? null,
      searchNorm: normalizePersian(input.title),
      updatedAt: now,
      syncStatus: 'pending',
    })
    .where(eq(labCasesLocal.id, id))
    .run();
  const row = getLabCase(id)!;
  enqueue({ entityType: 'lab_case', entityId: id, op: 'update', payload: toCloud(row) });
  return row;
}

export function setLabCaseStatus(id: string, status: LabCaseStatus): void {
  const now = nowIso();
  const patch =
    status === 'delivered'
      ? { status, deliveredAt: now, updatedAt: now, syncStatus: 'pending' as const }
      : { status, updatedAt: now, syncStatus: 'pending' as const };
  db.update(labCasesLocal).set(patch).where(eq(labCasesLocal.id, id)).run();
  const row = getLabCase(id)!;
  enqueue({ entityType: 'lab_case', entityId: id, op: 'update', payload: toCloud(row) });
}

/** Soft delete — data is never physically removed. */
export function deleteLabCase(id: string): void {
  const now = nowIso();
  db.update(labCasesLocal)
    .set({ deletedAt: now, updatedAt: now, syncStatus: 'pending' })
    .where(and(eq(labCasesLocal.id, id), ne(labCasesLocal.id, '')))
    .run();
  enqueue({ entityType: 'lab_case', entityId: id, op: 'delete', payload: { id, deleted_at: now } });
}

function toCloud(row: LabCase): Record<string, unknown> {
  return {
    id: row.id,
    clinic_id: row.clinicId,
    patient_id: row.patientId,
    lab_id: row.labId,
    doctor_id: row.doctorId,
    title: row.title,
    tooth_numbers: row.toothNumbers,
    status: row.status,
    sent_at: row.sentAt,
    due_at: row.dueAt,
    delivered_at: row.deliveredAt,
    price: row.price,
    notes: row.notes,
  };
}
