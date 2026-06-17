import { describe, expect, it } from '@jest/globals';
import { formatJalali, jalaliWeekday } from '../jalali';

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
