/**
 * Patient Journey engine — the reactive brain that aggregates every record type
 * (appointments, lab cases, payments, implants) into a single chronological
 * timeline and derives "next actions" / alerts so nothing slips through. It is a
 * pure read-model computed on demand from the offline-first repositories.
 */
import {
  APPOINTMENT_STATUS_LABELS,
  countAppointmentsForDay,
  listAppointmentsForPatient,
  type Appointment,
} from '@/features/appointments/repository';
import {
  LAB_CASE_STATUS_LABELS,
  countOpenLabCases,
  isOpen,
  listLabCasesForPatient,
  listOverdueLabCases,
  type LabCase,
} from '@/features/labCases/repository';
import {
  PAYMENT_DIRECTION_LABELS,
  listPaymentsForPatient,
  patientBalance,
  totalOutstanding,
  type Payment,
} from '@/features/payments/repository';
import { countPatients } from '@/features/patients/repository';
import { listImplantsForPatient, type Implant } from '@/features/implants/repository';
import { staffName } from '@/features/staff/repository';
import { getLab } from '@/features/labs/repository';
import { formatToman, toPersianDigits } from '@/lib/persian';

export type TimelineKind = 'appointment' | 'lab_case' | 'payment' | 'implant';
export type Tone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface TimelineEvent {
  id: string;
  kind: TimelineKind;
  at: string; // ISO timestamp
  title: string;
  subtitle?: string;
  tone: Tone;
}

export interface JourneyAlert {
  id: string;
  tone: Tone;
  icon: string;
  message: string;
}

function apptEvent(a: Appointment): TimelineEvent {
  const doctor = staffName(a.doctorId);
  const tone: Tone =
    a.status === 'completed'
      ? 'success'
      : a.status === 'cancelled' || a.status === 'no_show'
        ? 'danger'
        : 'info';
  return {
    id: `appt:${a.id}`,
    kind: 'appointment',
    at: a.startTime,
    title: `نوبت — ${APPOINTMENT_STATUS_LABELS[a.status]}`,
    subtitle: [doctor, a.unit ? `یونیت ${a.unit}` : null].filter(Boolean).join(' · ') || undefined,
    tone,
  };
}

function labCaseEvents(c: LabCase): TimelineEvent[] {
  const labName = getLab(c.labId)?.name ?? 'لابراتوار';
  const base = `${c.title} — ${labName}`;
  const events: TimelineEvent[] = [
    {
      id: `lab:${c.id}:created`,
      kind: 'lab_case',
      at: c.sentAt ?? c.dueAt ?? new Date().toISOString(),
      title: `سفارش لابراتوار — ${LAB_CASE_STATUS_LABELS[c.status]}`,
      subtitle: base,
      tone: isOpen(c.status) ? 'warning' : c.status === 'cancelled' ? 'danger' : 'success',
    },
  ];
  if (c.deliveredAt) {
    events.push({
      id: `lab:${c.id}:delivered`,
      kind: 'lab_case',
      at: c.deliveredAt,
      title: 'تحویل سفارش لابراتوار',
      subtitle: base,
      tone: 'success',
    });
  }
  return events;
}

function paymentEvent(p: Payment): TimelineEvent {
  return {
    id: `pay:${p.id}`,
    kind: 'payment',
    at: p.paidAt,
    title: `${PAYMENT_DIRECTION_LABELS[p.direction]} — ${formatToman(p.amount)}`,
    subtitle: p.description ?? undefined,
    tone: p.direction === 'payment' ? 'success' : 'neutral',
  };
}

function implantEvent(i: Implant): TimelineEvent {
  return {
    id: `imp:${i.id}`,
    kind: 'implant',
    at: i.placedAt ?? new Date().toISOString(),
    title: `ایمپلنت — ${i.brand}`,
    subtitle: [i.toothNumber ? `دندان ${i.toothNumber}` : null, i.system].filter(Boolean).join(' · ') || undefined,
    tone: 'info',
  };
}

/** Full chronological timeline for a patient, newest first. */
export function buildPatientTimeline(patientId: string): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  for (const a of listAppointmentsForPatient(patientId)) events.push(apptEvent(a));
  for (const c of listLabCasesForPatient(patientId)) events.push(...labCaseEvents(c));
  for (const p of listPaymentsForPatient(patientId)) events.push(paymentEvent(p));
  for (const i of listImplantsForPatient(patientId)) events.push(implantEvent(i));
  return events.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}

/** Reactive "next actions" for a single patient — what still needs attention. */
export function computePatientAlerts(patientId: string, now: Date = new Date()): JourneyAlert[] {
  const alerts: JourneyAlert[] = [];

  // Outstanding balance
  const balance = patientBalance(patientId);
  if (balance > 0) {
    alerts.push({
      id: 'balance',
      tone: 'warning',
      icon: '₸',
      message: `مانده‌حساب تسویه‌نشده: ${formatToman(balance)}`,
    });
  }

  // Lab cases needing attention
  for (const c of listLabCasesForPatient(patientId)) {
    if (!isOpen(c.status)) continue;
    if (c.dueAt && new Date(c.dueAt) < now) {
      alerts.push({
        id: `lab-overdue:${c.id}`,
        tone: 'danger',
        icon: '⏰',
        message: `سفارش لابراتوار معوق: ${c.title}`,
      });
    } else if (c.status === 'ready') {
      alerts.push({
        id: `lab-ready:${c.id}`,
        tone: 'warning',
        icon: '📦',
        message: `سفارش آمادهٔ تحویل: ${c.title}`,
      });
    }
  }

  // Upcoming appointments
  for (const a of listAppointmentsForPatient(patientId)) {
    if ((a.status === 'scheduled' || a.status === 'confirmed') && new Date(a.startTime) >= now) {
      alerts.push({
        id: `appt-upcoming:${a.id}`,
        tone: 'info',
        icon: '📅',
        message: 'نوبت پیشِ‌رو ثبت شده است',
      });
      break;
    }
  }

  return alerts;
}

/** Human-friendly counter, e.g. "۳ مورد". */
export function countLabel(n: number): string {
  return `${toPersianDigits(n)} مورد`;
}

export interface ClinicDashboard {
  patients: number;
  todayAppointments: number;
  openLabCases: number;
  overdueLabCases: number;
  outstanding: number;
}

/** Live, computed-on-demand snapshot for the home dashboard. */
export function computeClinicDashboard(): ClinicDashboard {
  return {
    patients: countPatients(),
    todayAppointments: countAppointmentsForDay(),
    openLabCases: countOpenLabCases(),
    overdueLabCases: listOverdueLabCases().length,
    outstanding: totalOutstanding(),
  };
}
