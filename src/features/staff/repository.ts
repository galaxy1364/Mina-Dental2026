/**
 * Staff repository — offline-first CRUD over the local SQLite mirror.
 * Every write is local-first (SQLite is the source of truth) and enqueued to the
 * durable sync outbox for later push to the cloud. Deletes are soft (deleted_at).
 */
import { and, asc, eq, isNull } from 'drizzle-orm';
import { db } from '@/core/db/client';
import { staffLocal } from '@/core/db/schema';
import { CLINIC } from '@/core/clinic';
import { newId } from '@/core/ids';
import { enqueue } from '@/core/sync/syncQueue';
import { nowIso } from '@/lib/jalali';
import { normalizePersian } from '@/lib/persian';

export type StaffRole = 'manager' | 'doctor' | 'secretary' | 'assistant';
export type CommissionModel = 'none' | 'fixed_50' | 'percentage' | 'advanced';

export interface Staff {
  id: string;
  clinicId: string;
  authUserId: string | null;
  fullName: string;
  role: StaffRole;
  mobile: string | null;
  nationalCode: string | null;
  commissionModel: CommissionModel;
  commissionPercent: number | null;
  active: boolean;
  notes: string | null;
}

export interface StaffInput {
  fullName: string;
  role: StaffRole;
  mobile?: string | null;
  nationalCode?: string | null;
  commissionModel?: CommissionModel;
  commissionPercent?: number | null;
  active?: boolean;
  notes?: string | null;
}

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  manager: 'مدیر',
  doctor: 'پزشک',
  secretary: 'منشی',
  assistant: 'دستیار',
};

export const COMMISSION_MODEL_LABELS: Record<CommissionModel, string> = {
  none: 'بدون سهم',
  fixed_50: '۵۰٪ ثابت',
  percentage: 'درصدی',
  advanced: 'پیشرفته',
};

export function listStaff(): Staff[] {
  return db
    .select()
    .from(staffLocal)
    .where(and(eq(staffLocal.clinicId, CLINIC.id), isNull(staffLocal.deletedAt)))
    .orderBy(asc(staffLocal.fullName))
    .all();
}

export function getStaff(id: string): Staff | undefined {
  return db.select().from(staffLocal).where(eq(staffLocal.id, id)).get();
}

/** Treating providers (doctors + the manager, who also treats) for assignment pickers. */
export function listDoctors(): Staff[] {
  return listStaff().filter((s) => s.role === 'doctor' || s.role === 'manager');
}

export function staffName(id: string | null | undefined): string | null {
  if (!id) return null;
  return getStaff(id)?.fullName ?? null;
}

export function createStaff(input: StaffInput): Staff {
  const id = newId();
  const now = nowIso();
  const row = {
    id,
    clinicId: CLINIC.id,
    authUserId: null,
    fullName: input.fullName.trim(),
    role: input.role,
    mobile: input.mobile ?? null,
    nationalCode: input.nationalCode ?? null,
    commissionModel: input.commissionModel ?? 'none',
    commissionPercent: input.commissionPercent ?? null,
    active: input.active ?? true,
    notes: input.notes ?? null,
    searchNorm: normalizePersian(input.fullName),
    createdAt: now,
    updatedAt: now,
    syncStatus: 'pending' as const,
  };
  db.insert(staffLocal).values(row).run();
  enqueue({ entityType: 'staff', entityId: id, op: 'insert', payload: toCloud(row) });
  return getStaff(id)!;
}

export function updateStaff(id: string, input: StaffInput): Staff {
  const now = nowIso();
  db.update(staffLocal)
    .set({
      fullName: input.fullName.trim(),
      role: input.role,
      mobile: input.mobile ?? null,
      nationalCode: input.nationalCode ?? null,
      commissionModel: input.commissionModel ?? 'none',
      commissionPercent: input.commissionPercent ?? null,
      active: input.active ?? true,
      notes: input.notes ?? null,
      searchNorm: normalizePersian(input.fullName),
      updatedAt: now,
      syncStatus: 'pending',
    })
    .where(eq(staffLocal.id, id))
    .run();
  const row = getStaff(id)!;
  enqueue({ entityType: 'staff', entityId: id, op: 'update', payload: toCloud(row) });
  return row;
}

/** Soft delete — data is never physically removed. */
export function deleteStaff(id: string): void {
  const now = nowIso();
  db.update(staffLocal)
    .set({ deletedAt: now, updatedAt: now, syncStatus: 'pending' })
    .where(eq(staffLocal.id, id))
    .run();
  enqueue({ entityType: 'staff', entityId: id, op: 'delete', payload: { id, deleted_at: now } });
}

function toCloud(row: Staff & { createdAt?: string; updatedAt?: string }): Record<string, unknown> {
  return {
    id: row.id,
    clinic_id: row.clinicId,
    auth_user_id: row.authUserId,
    full_name: row.fullName,
    role: row.role,
    mobile: row.mobile,
    national_code: row.nationalCode,
    commission_model: row.commissionModel,
    commission_percent: row.commissionPercent,
    active: row.active,
    notes: row.notes,
  };
}
