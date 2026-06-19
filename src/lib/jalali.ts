/**
 * Jalali (Shamsi) date helpers — UI-only. The database/business layer always
 * stores Gregorian ISO timestamps; conversion to Jalali happens at display time.
 */
import {
  format as formatJalaliFn,
  parse as parseJalaliFn,
} from 'date-fns-jalali';
import { jalaaliMonthLength, toGregorian, toJalaali } from 'jalaali-js';
import { jalaliHolidayName } from './holidays';
import { toEnglishDigits, toPersianDigits } from './persian';

/** Persian (Jalali) month names, Farvardin-first. */
export const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
] as const;

/** Build a local-midnight Gregorian Date from a jalaali-js conversion result. */
function gregorianDate(gy: number, gm: number, gd: number): Date {
  const d = new Date(gy, gm - 1, gd);
  d.setHours(0, 0, 0, 0);
  return d;
}

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
  /** True for any official holiday (Fridays + fixed national holidays). */
  holiday: boolean;
  /** Holiday name when `holiday` is true, otherwise null. */
  holidayName: string | null;
}

export interface JalaliMonth {
  year: string;
  monthName: string;
  /** Jalali year/month numbers of this view. */
  jy: number;
  jm: number;
  /** A reference Date inside this Jalali month (its first day). */
  cursor: Date;
  cells: JalaliMonthCell[];
}

const BLANK: JalaliMonthCell = { date: null, day: null, holiday: false, holidayName: null };

/**
 * Shift a reference Date by whole Jalali months, computed in Jalali space (via
 * `jalaali-js`) so month lengths and year boundaries are always exact.
 */
export function addJalaliMonths(date: Date, amount: number): Date {
  const { jy, jm, jd } = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const total = jy * 12 + (jm - 1) + amount;
  const ny = Math.floor(total / 12);
  const nm = (total % 12) + 1;
  const nd = Math.min(jd, jalaaliMonthLength(ny, nm));
  const g = toGregorian(ny, nm, nd);
  return gregorianDate(g.gy, g.gm, g.gd);
}

/**
 * Build a 6×7 month matrix (Saturday-first) for the Jalali month containing
 * `ref`, using `jalaali-js` for exact day-by-day Gregorian conversion (no
 * fragile Gregorian offset arithmetic). Leading/trailing cells are blank so the
 * grid is always rectangular.
 */
export function buildJalaliMonth(ref: Date): JalaliMonth {
  const { jy, jm } = toJalaali(ref.getFullYear(), ref.getMonth() + 1, ref.getDate());
  const days = jalaaliMonthLength(jy, jm);
  const g1 = toGregorian(jy, jm, 1);
  const first = gregorianDate(g1.gy, g1.gm, g1.gd);
  // JS getDay(): 0=Sun..6=Sat. Jalali week starts Saturday → Saturday = col 0.
  const lead = (first.getDay() + 1) % 7;
  const cells: JalaliMonthCell[] = [];
  for (let i = 0; i < lead; i += 1) cells.push(BLANK);
  for (let d = 1; d <= days; d += 1) {
    const g = toGregorian(jy, jm, d);
    const date = gregorianDate(g.gy, g.gm, g.gd);
    const holidayName = jalaliHolidayName(jm, d, date.getDay());
    cells.push({ date, day: d, holiday: holidayName !== null, holidayName });
  }
  while (cells.length % 7 !== 0) cells.push(BLANK);
  while (cells.length < 42) cells.push(BLANK);
  return {
    year: toPersianDigits(String(jy)),
    monthName: JALALI_MONTHS[jm - 1],
    jy,
    jm,
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
