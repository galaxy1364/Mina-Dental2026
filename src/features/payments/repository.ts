/**
 * Finance ledger (مالی) — offline-first. A `charge` increases what a patient owes,
 * a `payment` reduces it. Balance = sum(charges) − sum(payments). Soft-delete only.
 */
import { and, desc, eq, gte, isNull, lt, sql } from 'drizzle-orm';
import { db } from '@/core/db/client';
import { paymentsLocal } from '@/core/db/schema';
import { CLINIC } from '@/core/clinic';
import { newId } from '@/core/ids';
import { enqueue } from '@/core/sync/syncQueue';
import { nowIso } from '@/lib/jalali';

export type PaymentDirection = 'charge' | 'payment';
export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'other';

export interface Payment {
  id: string;
  clinicId: string;
  patientId: string;
  doctorId: string | null;
  direction: PaymentDirection;
  amount: number;
  method: PaymentMethod | null;
  description: string | null;
  paidAt: string;
}

export interface PaymentInput {
  patientId: string;
  doctorId?: string | null;
  direction: PaymentDirection;
  amount: number;
  method?: PaymentMethod | null;
  description?: string | null;
  paidAt?: string;
}

export const PAYMENT_DIRECTION_LABELS: Record<PaymentDirection, string> = {
  charge: 'بدهکاری (صورتحساب)',
  payment: 'دریافت وجه',
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: 'نقدی',
  card: 'کارتخوان',
  transfer: 'کارت به کارت',
  other: 'سایر',
};

export const PAYMENT_METHODS: PaymentMethod[] = ['cash', 'card', 'transfer', 'other'];

const activeClinic = () =>
  and(eq(paymentsLocal.clinicId, CLINIC.id), isNull(paymentsLocal.deletedAt));

export function listRecentPayments(limit = 50): Payment[] {
  return db
    .select()
    .from(paymentsLocal)
    .where(activeClinic())
    .orderBy(desc(paymentsLocal.paidAt))
    .limit(limit)
    .all();
}

/** Payments whose `paidAt` falls within [startIso, endIso). Range-queried so the
 * calendar never silently drops older records the way a recent-N limit would. */
export function listPaymentsBetween(startIso: string, endIso: string): Payment[] {
  return db
    .select()
    .from(paymentsLocal)
    .where(
      and(activeClinic(), gte(paymentsLocal.paidAt, startIso), lt(paymentsLocal.paidAt, endIso)),
    )
    .orderBy(desc(paymentsLocal.paidAt))
    .all();
}

export function listPaymentsForPatient(patientId: string): Payment[] {
  return db
    .select()
    .from(paymentsLocal)
    .where(and(activeClinic(), eq(paymentsLocal.patientId, patientId)))
    .orderBy(desc(paymentsLocal.paidAt))
    .all();
}

/** Outstanding balance for a patient (positive = patient owes the clinic). */
export function patientBalance(patientId: string): number {
  const row = db
    .select({
      bal: sql<number>`COALESCE(SUM(CASE WHEN ${paymentsLocal.direction} = 'charge' THEN ${paymentsLocal.amount} ELSE -${paymentsLocal.amount} END), 0)`,
    })
    .from(paymentsLocal)
    .where(and(activeClinic(), eq(paymentsLocal.patientId, patientId)))
    .get();
  return row?.bal ?? 0;
}

/** Total outstanding across all patients (positive = owed to clinic). */
export function totalOutstanding(): number {
  const row = db
    .select({
      bal: sql<number>`COALESCE(SUM(CASE WHEN ${paymentsLocal.direction} = 'charge' THEN ${paymentsLocal.amount} ELSE -${paymentsLocal.amount} END), 0)`,
    })
    .from(paymentsLocal)
    .where(activeClinic())
    .get();
  return row?.bal ?? 0;
}

export function getPayment(id: string): Payment | undefined {
  return db.select().from(paymentsLocal).where(eq(paymentsLocal.id, id)).get();
}

export function createPayment(input: PaymentInput): Payment {
  const id = newId();
  const now = nowIso();
  const row = {
    id,
    clinicId: CLINIC.id,
    patientId: input.patientId,
    doctorId: input.doctorId ?? null,
    direction: input.direction,
    amount: Math.max(0, Math.round(input.amount)),
    method: input.method ?? null,
    description: input.description ?? null,
    paidAt: input.paidAt ?? now,
    createdAt: now,
    updatedAt: now,
    syncStatus: 'pending' as const,
  };
  db.insert(paymentsLocal).values(row).run();
  enqueue({ entityType: 'payment', entityId: id, op: 'insert', payload: toCloud(row) });
  return getPayment(id)!;
}

export function updatePayment(id: string, input: PaymentInput): Payment {
  const now = nowIso();
  db.update(paymentsLocal)
    .set({
      patientId: input.patientId,
      doctorId: input.doctorId ?? null,
      direction: input.direction,
      amount: Math.max(0, Math.round(input.amount)),
      method: input.method ?? null,
      description: input.description ?? null,
      paidAt: input.paidAt ?? now,
      updatedAt: now,
      syncStatus: 'pending',
    })
    .where(eq(paymentsLocal.id, id))
    .run();
  const row = getPayment(id)!;
  enqueue({ entityType: 'payment', entityId: id, op: 'update', payload: toCloud(row) });
  return row;
}

/** Soft delete — data is never physically removed. */
export function deletePayment(id: string): void {
  const now = nowIso();
  db.update(paymentsLocal)
    .set({ deletedAt: now, updatedAt: now, syncStatus: 'pending' })
    .where(eq(paymentsLocal.id, id))
    .run();
  enqueue({ entityType: 'payment', entityId: id, op: 'delete', payload: { id, deleted_at: now } });
}

function toCloud(row: Payment): Record<string, unknown> {
  return {
    id: row.id,
    clinic_id: row.clinicId,
    patient_id: row.patientId,
    doctor_id: row.doctorId,
    direction: row.direction,
    amount: row.amount,
    method: row.method,
    description: row.description,
    paid_at: row.paidAt,
  };
}
