/**
 * Jalali (Shamsi) date helpers — UI-only. The database/business layer always
 * stores Gregorian ISO timestamps; conversion to Jalali happens at display time.
 */
import {
  addMonths,
  format as formatJalaliFn,
  getDaysInMonth,
  parse as parseJalaliFn,
  startOfMonth,
} from 'date-fns-jalali';
import { toEnglishDigits, toPersianDigits } from './persian';

/** Format a Date/ISO string as a Jalali string with Persian digits. */
export function formatJalali(date: Date | string | number, pattern = 'yyyy/MM/dd'): string {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  return toPersianDigits(formatJalaliFn(d, pattern));
}

/** Jalali date + 24h time, e.g. "۱۴۰۳/۰۳/۲۷ ۱۴:۳۰". */
export function formatJalaliDateTime(date: Date | string | number): string {
  return formatJalali(date, 'yyyy/MM/dd HH:mm');
}

const WEEKDAYS_FA = [
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
  'شنبه',
] as const;

export function jalaliWeekday(date: Date | string | number): string {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  return WEEKDAYS_FA[d.getDay()];
}

/** Long, human Jalali date, e.g. "شنبه ۲۷ خرداد ۱۴۰۴". */
export function formatJalaliLong(date: Date | string | number): string {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  return `${jalaliWeekday(d)} ${formatJalali(d, 'd MMMM yyyy')}`;
}

/** Current moment as a Gregorian ISO string (the canonical storage form). */
export function nowIso(): string {
  return new Date().toISOString();
}

/** Persian weekday headers, Saturday-first (matches the Jalali week). */
export const JALALI_WEEKDAY_SHORT = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'] as const;

export interface JalaliMonthCell {
  /** Gregorian Date at local midnight, or null for leading/trailing blanks. */
  date: Date | null;
  /** Jalali day-of-month (1..31), or null for blanks. */
  day: number | null;
  /** True for Fridays (official weekly holiday). */
  holiday: boolean;
}

export interface JalaliMonth {
  year: string;
  monthName: string;
  /** A reference Date inside this Jalali month. */
  cursor: Date;
  cells: JalaliMonthCell[];
}

/** Shift a reference Date by whole Jalali months. */
export function addJalaliMonths(date: Date, amount: number): Date {
  return addMonths(date, amount);
}

/**
 * Build a 6×7 month matrix (Saturday-first) for the Jalali month containing
 * `ref`. Leading/trailing cells are blank so the grid is always rectangular.
 */
export function buildJalaliMonth(ref: Date): JalaliMonth {
  const first = startOfMonth(ref);
  const days = getDaysInMonth(ref);
  // JS getDay(): 0=Sun..6=Sat. Jalali week starts Saturday → Saturday = col 0.
  const lead = (first.getDay() + 1) % 7;
  const cells: JalaliMonthCell[] = [];
  for (let i = 0; i < lead; i += 1) cells.push({ date: null, day: null, holiday: false });
  for (let d = 1; d <= days; d += 1) {
    const date = new Date(first);
    date.setDate(d);
    date.setHours(0, 0, 0, 0);
    cells.push({ date, day: d, holiday: date.getDay() === 5 });
  }
  while (cells.length % 7 !== 0) cells.push({ date: null, day: null, holiday: false });
  while (cells.length < 42) cells.push({ date: null, day: null, holiday: false });
  return {
    year: toPersianDigits(formatJalaliFn(first, 'yyyy')),
    monthName: formatJalaliFn(first, 'MMMM'),
    cursor: first,
    cells,
  };
}

/** Today's Jalali date as "yyyy/MM/dd" (English digits, for input prefilling). */
export function todayJalali(): string {
  return formatJalaliFn(new Date(), 'yyyy/MM/dd');
}

/**
 * Parse a Jalali "yyyy/MM/dd" date + optional "HH:mm" time into a Gregorian ISO
 * string. Accepts Persian or English digits. Returns null when invalid.
 */
export function parseJalaliToIso(dateStr: string, timeStr = '00:00'): string | null {
  const date = toEnglishDigits(dateStr).trim();
  const time = toEnglishDigits(timeStr).trim() || '00:00';
  if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(date)) return null;
  if (!/^\d{1,2}:\d{2}$/.test(time)) return null;
  const parsed = parseJalaliFn(`${date} ${time}`, 'yyyy/M/d H:mm', new Date());
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

/** Extract "HH:mm" (English digits) from an ISO timestamp. */
export function isoToTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** Extract Jalali "yyyy/MM/dd" (English digits) from an ISO timestamp. */
export function isoToJalaliDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return formatJalaliFn(d, 'yyyy/MM/dd');
}
