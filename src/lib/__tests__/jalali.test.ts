import { describe, expect, it } from '@jest/globals';
import {
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
