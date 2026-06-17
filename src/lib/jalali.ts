/**
 * Jalali (Shamsi) date helpers — UI-only. The database/business layer always
 * stores Gregorian ISO timestamps; conversion to Jalali happens at display time.
 */
import { format as formatJalaliFn, parse as parseJalaliFn } from 'date-fns-jalali';
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

/** Current moment as a Gregorian ISO string (the canonical storage form). */
export function nowIso(): string {
  return new Date().toISOString();
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
