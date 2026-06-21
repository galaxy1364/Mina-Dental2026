/**
 * Calendar aggregation — collects appointments, lab-case due dates and payments
 * for a date range and groups them by local calendar day, so the monthly Jalali
 * calendar can render colored dots and per-day detail lists.
 */
import { listAppointmentsBetween, APPOINTMENT_STATUS_LABELS } from '@/features/appointments/repository';
import { listLabCasesBetween } from '@/features/labCases/repository';
import { listPaymentsBetween } from '@/features/payments/repository';
import { fullName, getPatient } from '@/features/patients/repository';
import { formatToman } from '@/lib/persian';
import { isoToTime } from '@/lib/jalali';

export type CalendarCategory = 'appointment' | 'labcase' | 'payment';

export interface CalendarEvent {
  id: string;
  category: CalendarCategory;
  dateIso: string;
  patientId: string;
  title: string;
  subtitle: string;
}

/** Local-time day key "yyyy-mm-dd" used to bucket events per calendar cell. */
export function dayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function patientName(id: string): string {
  const p = getPatient(id);
  return p ? fullName(p) : 'بیمار';
}

export function listCalendarEvents(startIso: string, endIso: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  for (const a of listAppointmentsBetween(startIso, endIso)) {
    if (a.status === 'cancelled') continue;
    events.push({
      id: `appt-${a.id}`,
      category: 'appointment',
      dateIso: a.startTime,
      patientId: a.patientId,
      title: `نوبت — ${patientName(a.patientId)}`,
      subtitle: `${isoToTime(a.startTime)} · ${APPOINTMENT_STATUS_LABELS[a.status]}`,
    });
  }

  for (const c of listLabCasesBetween(startIso, endIso)) {
    if (c.status === 'cancelled' || c.dueAt == null) continue;
    events.push({
      id: `lab-${c.id}`,
      category: 'labcase',
      dateIso: c.dueAt,
      patientId: c.patientId,
      title: `لابراتوار — ${c.title}`,
      subtitle: patientName(c.patientId),
    });
  }

  for (const p of listPaymentsBetween(startIso, endIso)) {
    const verb = p.direction === 'payment' ? 'دریافت' : 'صورتحساب';
    events.push({
      id: `pay-${p.id}`,
      category: 'payment',
      dateIso: p.paidAt,
      patientId: p.patientId,
      title: `${verb} — ${patientName(p.patientId)}`,
      subtitle: formatToman(p.amount),
    });
  }

  return events.sort((a, b) => a.dateIso.localeCompare(b.dateIso));
}
