/**
 * Appointments repository — offline-first CRUD over the local SQLite mirror.
 * Times are stored as Gregorian ISO strings; the UI renders them in Jalali.
 * Working hours are constrained to 08:00–24:00 at the domain layer.
 */
import { and, asc, eq, gte, isNull, lt } from 'drizzle-orm';
import { db } from '@/core/db/client';
import { appointmentsLocal } from '@/core/db/schema';
import { CLINIC } from '@/core/clinic';
import { newId } from '@/core/ids';
import { enqueue } from '@/core/sync/syncQueue';
import { nowIso } from '@/lib/jalali';

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'no_show'
  | 'cancelled';

export interface Appointment {
  id: string;
  clinicId: string;
  patientId: string;
  doctorId: string | null;
  unit: string | null;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes: string | null;
}

export interface AppointmentInput {
  patientId: string;
  doctorId?: string | null;
  unit?: string | null;
  startTime: string;
  endTime: string;
  status?: AppointmentStatus;
  notes?: string | null;
}

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: 'ثبت‌شده',
  confirmed: 'تأییدشده',
  arrived: 'حاضر',
  in_progress: 'در حال درمان',
  completed: 'انجام‌شده',
  no_show: 'عدم‌مراجعه',
  cancelled: 'لغوشده',
};

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  'scheduled',
  'confirmed',
  'arrived',
  'in_progress',
  'completed',
  'no_show',
  'cancelled',
];

const activeClinic = () =>
  and(eq(appointmentsLocal.clinicId, CLINIC.id), isNull(appointmentsLocal.deletedAt));

export function listAppointmentsBetween(startIso: string, endIso: string): Appointment[] {
  return db
    .select()
    .from(appointmentsLocal)
    .where(
      and(activeClinic(), gte(appointmentsLocal.startTime, startIso), lt(appointmentsLocal.startTime, endIso)),
    )
    .orderBy(asc(appointmentsLocal.startTime))
    .all();
}

/** Appointments whose local calendar day equals the given Date (defaults to today). */
export function listAppointmentsForDay(day: Date = new Date()): Appointment[] {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return listAppointmentsBetween(start.toISOString(), end.toISOString());
}

export function listAppointmentsForPatient(patientId: string): Appointment[] {
  return db
    .select()
    .from(appointmentsLocal)
    .where(and(activeClinic(), eq(appointmentsLocal.patientId, patientId)))
    .orderBy(asc(appointmentsLocal.startTime))
    .all();
}

export function countAppointmentsForDay(day: Date = new Date()): number {
  return listAppointmentsForDay(day).filter((a) => a.status !== 'cancelled').length;
}

export function getAppointment(id: string): Appointment | undefined {
  return db.select().from(appointmentsLocal).where(eq(appointmentsLocal.id, id)).get();
}

export function createAppointment(input: AppointmentInput): Appointment {
  const id = newId();
  const now = nowIso();
  const row = {
    id,
    clinicId: CLINIC.id,
    patientId: input.patientId,
    doctorId: input.doctorId ?? null,
    unit: input.unit ?? null,
    startTime: input.startTime,
    endTime: input.endTime,
    status: input.status ?? ('scheduled' as const),
    notes: input.notes ?? null,
    createdAt: now,
    updatedAt: now,
    syncStatus: 'pending' as const,
  };
  db.insert(appointmentsLocal).values(row).run();
  enqueue({ entityType: 'appointment', entityId: id, op: 'insert', payload: toCloud(row) });
  return getAppointment(id)!;
}

export function updateAppointment(id: string, input: AppointmentInput): Appointment {
  const now = nowIso();
  db.update(appointmentsLocal)
    .set({
      patientId: input.patientId,
      doctorId: input.doctorId ?? null,
      unit: input.unit ?? null,
      startTime: input.startTime,
      endTime: input.endTime,
      status: input.status ?? 'scheduled',
      notes: input.notes ?? null,
      updatedAt: now,
      syncStatus: 'pending',
    })
    .where(eq(appointmentsLocal.id, id))
    .run();
  const row = getAppointment(id)!;
  enqueue({ entityType: 'appointment', entityId: id, op: 'update', payload: toCloud(row) });
  return row;
}

export function setAppointmentStatus(id: string, status: AppointmentStatus): void {
  const now = nowIso();
  db.update(appointmentsLocal)
    .set({ status, updatedAt: now, syncStatus: 'pending' })
    .where(eq(appointmentsLocal.id, id))
    .run();
  const row = getAppointment(id)!;
  enqueue({ entityType: 'appointment', entityId: id, op: 'update', payload: toCloud(row) });
}

/** Soft delete — data is never physically removed. */
export function deleteAppointment(id: string): void {
  const now = nowIso();
  db.update(appointmentsLocal)
    .set({ deletedAt: now, updatedAt: now, syncStatus: 'pending' })
    .where(eq(appointmentsLocal.id, id))
    .run();
  enqueue({ entityType: 'appointment', entityId: id, op: 'delete', payload: { id, deleted_at: now } });
}

function toCloud(row: Appointment): Record<string, unknown> {
  return {
    id: row.id,
    clinic_id: row.clinicId,
    patient_id: row.patientId,
    doctor_id: row.doctorId,
    unit: row.unit,
    start_time: row.startTime,
    end_time: row.endTime,
    status: row.status,
    notes: row.notes,
  };
}
