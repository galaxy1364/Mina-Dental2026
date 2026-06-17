/**
 * Labs repository — offline-first CRUD over the local SQLite mirror.
 * Local-first writes + durable sync outbox; soft-delete only.
 */
import { and, asc, eq, isNull } from 'drizzle-orm';
import { db } from '@/core/db/client';
import { labsLocal } from '@/core/db/schema';
import { CLINIC } from '@/core/clinic';
import { newId } from '@/core/ids';
import { enqueue } from '@/core/sync/syncQueue';
import { nowIso } from '@/lib/jalali';
import { normalizePersian } from '@/lib/persian';

export type LabType = 'fixed' | 'removable';

export interface Lab {
  id: string;
  clinicId: string;
  name: string;
  type: LabType;
  phone: string | null;
  address: string | null;
  contactPerson: string | null;
  active: boolean;
  notes: string | null;
}

export interface LabInput {
  name: string;
  type: LabType;
  phone?: string | null;
  address?: string | null;
  contactPerson?: string | null;
  active?: boolean;
  notes?: string | null;
}

export const LAB_TYPE_LABELS: Record<LabType, string> = {
  fixed: 'ثابت',
  removable: 'متحرک',
};

export function listLabs(): Lab[] {
  return db
    .select()
    .from(labsLocal)
    .where(and(eq(labsLocal.clinicId, CLINIC.id), isNull(labsLocal.deletedAt)))
    .orderBy(asc(labsLocal.name))
    .all();
}

export function getLab(id: string): Lab | undefined {
  return db.select().from(labsLocal).where(eq(labsLocal.id, id)).get();
}

export function createLab(input: LabInput): Lab {
  const id = newId();
  const now = nowIso();
  const row = {
    id,
    clinicId: CLINIC.id,
    name: input.name.trim(),
    type: input.type,
    phone: input.phone ?? null,
    address: input.address ?? null,
    contactPerson: input.contactPerson ?? null,
    active: input.active ?? true,
    notes: input.notes ?? null,
    searchNorm: normalizePersian(input.name),
    createdAt: now,
    updatedAt: now,
    syncStatus: 'pending' as const,
  };
  db.insert(labsLocal).values(row).run();
  enqueue({ entityType: 'lab', entityId: id, op: 'insert', payload: toCloud(row) });
  return getLab(id)!;
}

export function updateLab(id: string, input: LabInput): Lab {
  const now = nowIso();
  db.update(labsLocal)
    .set({
      name: input.name.trim(),
      type: input.type,
      phone: input.phone ?? null,
      address: input.address ?? null,
      contactPerson: input.contactPerson ?? null,
      active: input.active ?? true,
      notes: input.notes ?? null,
      searchNorm: normalizePersian(input.name),
      updatedAt: now,
      syncStatus: 'pending',
    })
    .where(eq(labsLocal.id, id))
    .run();
  const row = getLab(id)!;
  enqueue({ entityType: 'lab', entityId: id, op: 'update', payload: toCloud(row) });
  return row;
}

/** Soft delete — data is never physically removed. */
export function deleteLab(id: string): void {
  const now = nowIso();
  db.update(labsLocal)
    .set({ deletedAt: now, updatedAt: now, syncStatus: 'pending' })
    .where(eq(labsLocal.id, id))
    .run();
  enqueue({ entityType: 'lab', entityId: id, op: 'delete', payload: { id, deleted_at: now } });
}

function toCloud(row: Lab): Record<string, unknown> {
  return {
    id: row.id,
    clinic_id: row.clinicId,
    name: row.name,
    type: row.type,
    phone: row.phone,
    address: row.address,
    contact_person: row.contactPerson,
    active: row.active,
    notes: row.notes,
  };
}
