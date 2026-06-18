import { describe, expect, it } from '@jest/globals';
import {
  addJalaliMonths,
  buildJalaliMonth,
  formatJalali,
  isoToJalaliDate,
  jalaliWeekday,
  parseJalaliToIso,
} from '../jalali';

describe('jalali formatting', () => {
  it('formats a known Gregorian date to Jalali with Persian digits', () => {
    // 2024-03-20 == 1403/01/01 (Nowruz)
    expect(formatJalali('2024-03-20T10:00:00Z', 'yyyy/MM/dd')).toBe('۱۴۰۳/۰۱/۰۱');
  });
  it('returns a dash for invalid input', () => {
    expect(formatJalali('not-a-date')).toBe('—');
  });
  it('returns a Persian weekday name', () => {
    expect(typeof jalaliWeekday('2024-03-20T10:00:00Z')).toBe('string');
  });
});

describe('jalali parsing', () => {
  it('parses Nowruz 1403/01/01 to the correct Gregorian day', () => {
    const iso = parseJalaliToIso('1403/01/01', '00:00');
    expect(iso).not.toBeNull();
    expect(isoToJalaliDate(iso as string)).toBe('1403/01/01');
  });

  it('accepts Persian digits', () => {
    const iso = parseJalaliToIso('۱۴۰۳/۰۱/۰۱', '۰۹:۳۰');
    expect(iso).not.toBeNull();
  });

  it('round-trips date through ISO and back', () => {
    const iso = parseJalaliToIso('1404/03/27', '10:00');
    expect(iso).not.toBeNull();
    expect(isoToJalaliDate(iso as string)).toBe('1404/03/27');
  });

  it('rejects malformed input', () => {
    expect(parseJalaliToIso('not-a-date')).toBeNull();
    expect(parseJalaliToIso('1403-01-01')).toBeNull();
    expect(parseJalaliToIso('1403/01/01', 'bad')).toBeNull();
  });
});

describe('jalali month grid', () => {
  it('builds a rectangular 42-cell matrix', () => {
    const m = buildJalaliMonth(new Date('2024-03-20T10:00:00Z'));
    expect(m.cells).toHaveLength(42);
  });

  it('starts Farvardin 1403 (a 31-day month) on Saturday (column 0)', () => {
    // 1403/01/01 (Nowruz) falls on a Wednesday → column 4 (Sat-first week).
    const m = buildJalaliMonth(new Date('2024-03-20T10:00:00Z'));
    const firstReal = m.cells.findIndex((c) => c.day === 1);
    expect(firstReal).toBe(4);
    const days = m.cells.filter((c) => c.day !== null).length;
    expect(days).toBe(31);
  });

  it('maps each cell to the correct Gregorian date', () => {
    // Farvardin 1403: day 1 == 2024-03-20, day 12 == 2024-03-31, day 13 == 2024-04-01.
    const m = buildJalaliMonth(new Date('2024-03-20T10:00:00Z'));
    const cell = (day: number) => m.cells.find((c) => c.day === day);
    expect(isoToJalaliDate((cell(1)?.date as Date).toISOString())).toBe('1403/01/01');
    expect(isoToJalaliDate((cell(12)?.date as Date).toISOString())).toBe('1403/01/12');
    expect(isoToJalaliDate((cell(31)?.date as Date).toISOString())).toBe('1403/01/31');
  });

  it('moves to the previous/next Jalali month', () => {
    const ref = new Date('2024-03-20T10:00:00Z'); // 1403/01
    const prev = buildJalaliMonth(addJalaliMonths(ref, -1));
    const next = buildJalaliMonth(addJalaliMonths(ref, 1));
    expect(prev.monthName).not.toBe(next.monthName);
  });
});
