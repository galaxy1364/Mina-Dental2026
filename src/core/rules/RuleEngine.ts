/**
 * Deterministic rule engine skeleton. Rules validate a command's payload before
 * execution. They are pure and testable — no AI, no side effects.
 */
export interface RuleContext {
  actorRole?: string;
  clinicId?: string;
}

export type RuleResult = { ok: true } | { ok: false; code: string; message: string };

export type Rule<T> = (payload: T, ctx: RuleContext) => RuleResult;

export function runRules<T>(rules: Rule<T>[], payload: T, ctx: RuleContext): RuleResult {
  for (const rule of rules) {
    const result = rule(payload, ctx);
    if (!result.ok) return result;
  }
  return { ok: true };
}

/** Working-hours rule: appointments must start within 08:00–24:00. */
export const withinWorkingHours: Rule<{ startTime: string }> = (payload) => {
  const hour = new Date(payload.startTime).getHours();
  if (hour < 8) {
    return { ok: false, code: 'OUTSIDE_WORKING_HOURS', message: 'زمان خارج از ساعات کاری است.' };
  }
  return { ok: true };
};
