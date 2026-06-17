/**
 * Jalali (Shamsi) date helpers — UI-only. The database/business layer always
 * stores Gregorian ISO timestamps; conversion to Jalali happens at display time.
 */
import { format as formatJalaliFn } from 'date-fns-jalali';
import { toPersianDigits } from './persian';

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

/** Current moment as a Gregorian ISO string (the canonical storage form). */
export function nowIso(): string {
  return new Date().toISOString();
}
