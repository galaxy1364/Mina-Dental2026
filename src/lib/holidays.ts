/**
 * Official Iranian (solar / Jalali) public holidays.
 *
 * Only the fixed-date *solar* national holidays are encoded here — these recur on
 * the same Jalali day every year, so they can be derived purely from (month, day).
 * Religious holidays that follow the lunar Hijri calendar (e.g. Eid al-Fitr,
 * Ashura) drift across the solar year and require a per-year table; they are not
 * included yet. Fridays are handled separately as the weekly rest day.
 */

interface FixedHoliday {
  month: number; // Jalali month 1..12
  day: number; // Jalali day 1..31
  name: string;
}

const FIXED_SOLAR_HOLIDAYS: readonly FixedHoliday[] = [
  { month: 1, day: 1, name: 'نوروز' },
  { month: 1, day: 2, name: 'نوروز' },
  { month: 1, day: 3, name: 'نوروز' },
  { month: 1, day: 4, name: 'نوروز' },
  { month: 1, day: 12, name: 'روز جمهوری اسلامی' },
  { month: 1, day: 13, name: 'روز طبیعت' },
  { month: 3, day: 14, name: 'رحلت امام خمینی' },
  { month: 3, day: 15, name: 'قیام ۱۵ خرداد' },
  { month: 11, day: 22, name: 'پیروزی انقلاب اسلامی' },
  { month: 12, day: 29, name: 'روز ملی شدن صنعت نفت' },
] as const;

const FRIDAY = 5; // JS Date.getDay(): 0=Sun..5=Fri..6=Sat

/**
 * Return the holiday name for a Jalali date, or `null` if it is an ordinary day.
 * `weekday` is the JS `Date.getDay()` value of the same date (Friday = 5).
 */
export function jalaliHolidayName(month: number, day: number, weekday: number): string | null {
  const fixed = FIXED_SOLAR_HOLIDAYS.find((h) => h.month === month && h.day === day);
  if (fixed) return fixed.name;
  if (weekday === FRIDAY) return 'جمعه';
  return null;
}
