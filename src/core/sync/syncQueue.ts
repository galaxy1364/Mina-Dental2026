/**
 * Durable sync outbox. Every offline write appends an entry here; entries persist
 * across app restarts until successfully pushed to the cloud. No data is ever dropped.
 */
import { and, asc, eq, lt, ne, sql } from 'drizzle-orm';
import { db } from '../db/client';
import { syncQueue } from '../db/schema';
import { newId } from '../ids';
import { nowIso } from '@/lib/jalali';

export type SyncOp = 'insert' | 'update' | 'delete';
export const MAX_ATTEMPTS = 5;

export interface EnqueueInput {
  entityType: string;
  entityId: string;
  op: SyncOp;
  payload: Record<string, unknown>;
}

export function enqueue(input: EnqueueInput): string {
  const id = newId();
  db.insert(syncQueue)
    .values({
      id,
      entityType: input.entityType,
      entityId: input.entityId,
      op: input.op,
      payload: JSON.stringify(input.payload),
      status: 'pending',
      attempts: 0,
    })
    .run();
  return id;
}

export function pendingCount(): number {
  const row = db
    .select({ c: sql<number>`count(*)` })
    .from(syncQueue)
    .where(ne(syncQueue.status, 'dead_letter'))
    .get();
  return row?.c ?? 0;
}

export function nextBatch(limit = 50) {
  return db
    .select()
    .from(syncQueue)
    .where(and(eq(syncQueue.status, 'pending'), lt(syncQueue.attempts, MAX_ATTEMPTS)))
    .orderBy(asc(syncQueue.createdAt))
    .limit(limit)
    .all();
}

export function markInFlight(id: string): void {
  db.update(syncQueue)
    .set({ status: 'in_flight', updatedAt: nowIso() })
    .where(eq(syncQueue.id, id))
    .run();
}

export function markSynced(id: string): void {
  db.delete(syncQueue).where(eq(syncQueue.id, id)).run();
}

export function markFailed(id: string, attempts: number, error: string): void {
  const deadLettered = attempts + 1 >= MAX_ATTEMPTS;
  db.update(syncQueue)
    .set({
      status: deadLettered ? 'dead_letter' : 'pending',
      attempts: attempts + 1,
      lastError: error.slice(0, 500),
      updatedAt: nowIso(),
    })
    .where(eq(syncQueue.id, id))
    .run();
}

export function deadLetters() {
  return db.select().from(syncQueue).where(eq(syncQueue.status, 'dead_letter')).all();
}
