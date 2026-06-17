/**
 * Offline-first sync engine. Listens for connectivity and drains the durable
 * outbox to the cloud. When offline or unconfigured it is a safe no-op — queued
 * writes simply wait, so nothing is ever lost.
 */
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { getSupabase, isCloudConfigured } from '../supabase/client';
import { createLogger } from '../logger/logger';
import {
  markFailed,
  markInFlight,
  markSynced,
  nextBatch,
  pendingCount,
} from './syncQueue';

const log = createLogger('syncEngine');

/** Maps a local entity type to its cloud table name. */
const TABLE_MAP: Record<string, string> = {
  patient: 'patients',
  appointment: 'appointments',
  staff: 'staff',
  lab: 'labs',
  lab_case: 'lab_cases',
  payment: 'payments',
  implant: 'implants',
};

type SyncRow = ReturnType<typeof nextBatch>[number];

let unsubscribe: (() => void) | null = null;
let running = false;
let online = false;

export function getSyncSnapshot() {
  return { online, pending: safePending(), configured: isCloudConfigured() };
}

function safePending(): number {
  try {
    return pendingCount();
  } catch {
    return 0;
  }
}

async function pushRow(row: SyncRow): Promise<void> {
  const table = TABLE_MAP[row.entityType];
  if (!table) throw new Error(`Unknown entity type: ${row.entityType}`);
  const supabase = getSupabase();
  const payload = JSON.parse(row.payload) as Record<string, unknown>;

  if (row.op === 'delete') {
    const { error } = await supabase.from(table).update({ deleted_at: new Date().toISOString() }).eq('id', row.entityId);
    if (error) throw new Error(error.message);
    return;
  }
  const { error } = await supabase.from(table).upsert(payload, { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function processQueue(): Promise<{ pushed: number; failed: number }> {
  if (running) return { pushed: 0, failed: 0 };
  if (!online || !isCloudConfigured()) return { pushed: 0, failed: 0 };

  let session;
  try {
    const supabase = getSupabase();
    const { data } = await supabase.auth.getSession();
    session = data.session;
  } catch {
    return { pushed: 0, failed: 0 };
  }
  if (!session) return { pushed: 0, failed: 0 }; // not authenticated yet — keep queued

  running = true;
  let pushed = 0;
  let failed = 0;
  try {
    const batch = nextBatch();
    for (const row of batch) {
      markInFlight(row.id);
      try {
        await pushRow(row);
        markSynced(row.id);
        pushed += 1;
      } catch (err) {
        markFailed(row.id, row.attempts, err instanceof Error ? err.message : 'unknown');
        failed += 1;
      }
    }
    if (pushed || failed) log.info('Queue processed', { pushed, failed });
  } finally {
    running = false;
  }
  return { pushed, failed };
}

function onNetChange(state: NetInfoState) {
  const next = Boolean(state.isConnected && state.isInternetReachable !== false);
  const becameOnline = !online && next;
  online = next;
  if (becameOnline) {
    log.info('Connectivity restored — draining queue');
    void processQueue();
  }
}

export function startSyncEngine(): void {
  if (unsubscribe) return;
  unsubscribe = NetInfo.addEventListener(onNetChange);
  void NetInfo.fetch().then(onNetChange);
  log.info('Sync engine started');
}

export function stopSyncEngine(): void {
  unsubscribe?.();
  unsubscribe = null;
}
