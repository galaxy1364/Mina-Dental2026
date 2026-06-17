/**
 * Audit trail entry point. In Phase 1 audit events are structured-logged; later
 * phases persist them to the immutable cloud `audit_log` table. Audit is never
 * mutated or deleted — only appended.
 */
import { createLogger } from '../logger/logger';

const log = createLogger('audit');

export interface AuditEntry {
  action: string;
  entityType: string;
  entityId?: string;
  actorId?: string;
  actorRole?: string;
  reason?: string;
}

export function audit(entry: AuditEntry): void {
  log.info('AUDIT', { ...entry, at: new Date().toISOString() });
}
