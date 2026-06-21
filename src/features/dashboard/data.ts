/**
 * Dashboard read-model — aggregates the live figures and short lists the home
 * command center renders. Pure, computed-on-demand from the offline-first
 * repositories (no caching), so every focus/poll reflects current data.
 */
import {
  APPOINTMENT_STATUS_LABELS,
  listAppointmentsForDay,
  type AppointmentStatus,
} from '@/features/appointments/repository';
import { LAB_CASE_STATUS_LABELS, listOverdueLabCases } from '@/features/labCases/repository';
import { getLab } from '@/features/labs/repository';
import { fullName, getPatient } from '@/features/patients/repository';
import { staffName } from '@/features/staff/repository';
import { computeClinicDashboard, type ClinicDashboard } from '@/features/journey/engine';
import type { Tone } from '@/design/tone';
import { isoToTime } from '@/lib/jalali';

export interface TodayAppointment {
  id: string;
  time: string;
  patient: string;
  doctor?: string;
  unit?: string;
  statusLabel: string;
  tone: Tone;
}

export interface OverdueLab {
  id: string;
  title: string;
  lab: string;
  statusLabel: string;
}

export interface DashboardData {
  stats: ClinicDashboard;
  today: TodayAppointment[];
  overdue: OverdueLab[];
}

function apptTone(status: AppointmentStatus): Tone {
  switch (status) {
    case 'completed':
      return 'success';
    case 'cancelled':
    case 'no_show':
      return 'danger';
    case 'confirmed':
      return 'info';
    default:
      return 'neutral';
  }
}

export function computeDashboardData(): DashboardData {
  const today: TodayAppointment[] = listAppointmentsForDay()
    .slice()
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .map((a) => {
      const p = getPatient(a.patientId);
      const doctor = a.doctorId ? staffName(a.doctorId) : null;
      return {
        id: a.id,
        time: isoToTime(a.startTime),
        patient: p ? fullName(p) : 'بیمار',
        doctor: doctor ?? undefined,
        unit: a.unit ?? undefined,
        statusLabel: APPOINTMENT_STATUS_LABELS[a.status],
        tone: apptTone(a.status),
      };
    });

  const overdue: OverdueLab[] = listOverdueLabCases().map((c) => ({
    id: c.id,
    title: c.title,
    lab: getLab(c.labId)?.name ?? 'لابراتوار',
    statusLabel: LAB_CASE_STATUS_LABELS[c.status],
  }));

  return {
    stats: computeClinicDashboard(),
    today,
    overdue,
  };
}
