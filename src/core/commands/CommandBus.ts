/**
 * Command Bus — the single path for all important write actions. Handlers run
 * validation/rules, persist locally, enqueue sync, emit events and write audit.
 */
import { audit, type AuditEntry } from '../audit/audit';
import { emit } from '../events/EventBus';
import { AppError, toAppError } from '../errors/AppError';
import { createLogger } from '../logger/logger';

const log = createLogger('commandBus');

export interface CommandContext {
  actorId?: string;
  actorRole?: string;
  clinicId?: string;
  source?: 'ui' | 'system' | 'ai' | 'background';
}

export interface CommandResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  fields?: Record<string, string>;
  syncQueued?: string;
}

export type CommandHandler<P, R> = (
  payload: P,
  ctx: CommandContext,
) => { result: R; event?: { type: string; payload?: Record<string, unknown> }; audit?: AuditEntry; syncId?: string };

const handlers = new Map<string, CommandHandler<unknown, unknown>>();

export function register<P, R>(type: string, handler: CommandHandler<P, R>): void {
  handlers.set(type, handler as CommandHandler<unknown, unknown>);
}

export function execute<P, R>(type: string, payload: P, ctx: CommandContext = {}): CommandResult<R> {
  const handler = handlers.get(type) as CommandHandler<P, R> | undefined;
  if (!handler) {
    return { success: false, error: `No handler for command ${type}`, code: 'UNKNOWN' };
  }
  try {
    const out = handler(payload, ctx);
    if (out.audit) audit(out.audit);
    if (out.event) emit(out.event.type, out.event.payload);
    return { success: true, data: out.result, syncQueued: out.syncId };
  } catch (err) {
    const appErr: AppError = toAppError(err);
    log.warn('Command failed', { type, code: appErr.code });
    return { success: false, error: appErr.userMessage, code: appErr.code, fields: appErr.fields };
  }
}
