/** Lightweight typed in-app event bus. Emitted after a command succeeds. */
export type AppEvent = {
  type: string;
  payload?: Record<string, unknown>;
  at: string;
};

type Handler = (event: AppEvent) => void;

const handlers = new Map<string, Set<Handler>>();

export function on(type: string, handler: Handler): () => void {
  const set = handlers.get(type) ?? new Set<Handler>();
  set.add(handler);
  handlers.set(type, set);
  return () => set.delete(handler);
}

export function emit(type: string, payload?: Record<string, unknown>): void {
  const event: AppEvent = { type, payload, at: new Date().toISOString() };
  handlers.get(type)?.forEach((h) => h(event));
  handlers.get('*')?.forEach((h) => h(event));
}

export const EVENTS = {
  PATIENT_CREATED: 'PATIENT_CREATED',
  PATIENT_UPDATED: 'PATIENT_UPDATED',
  APPOINTMENT_CREATED: 'APPOINTMENT_CREATED',
  PAYMENT_REGISTERED: 'PAYMENT_REGISTERED',
  SYNC_COMPLETED: 'SYNC_COMPLETED',
} as const;
