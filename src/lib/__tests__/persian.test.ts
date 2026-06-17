import {
  formatToman,
  isValidIranianMobile,
  isValidNationalCode,
  normalizeMobile,
  normalizePersian,
  toEnglishDigits,
  toPersianDigits,
} from '../persian';

describe('digits', () => {
  it('converts to Persian digits', () => {
    expect(toPersianDigits('1402')).toBe('۱۴۰۲');
  });
  it('converts Persian and Arabic digits back to English', () => {
    expect(toEnglishDigits('۱۴۰۲')).toBe('1402');
    expect(toEnglishDigits('١٢٣')).toBe('123');
  });
});

describe('formatToman', () => {
  it('groups thousands with Persian digits and suffix', () => {
    expect(formatToman(1250000)).toBe('۱،۲۵۰،۰۰۰ تومان');
  });
  it('omits suffix when requested', () => {
    expect(formatToman(5000, false)).toBe('۵،۰۰۰');
  });
  it('handles zero and invalid input safely', () => {
    expect(formatToman(0)).toBe('۰ تومان');
    expect(formatToman(Number.NaN)).toBe('۰ تومان');
  });
});

describe('mobile validation', () => {
  it('normalizes +98 / 0098 / 98 prefixes', () => {
    expect(normalizeMobile('+989121234567')).toBe('09121234567');
    expect(normalizeMobile('00989121234567')).toBe('09121234567');
    expect(normalizeMobile('۰۹۱۲۱۲۳۴۵۶۷')).toBe('09121234567');
  });
  it('accepts valid and rejects invalid mobiles', () => {
    expect(isValidIranianMobile('09121234567')).toBe(true);
    expect(isValidIranianMobile('0812123456')).toBe(false);
  });
});

describe('national code validation', () => {
  it('accepts a valid code', () => {
    expect(isValidNationalCode('0499370899')).toBe(true);
    expect(isValidNationalCode('0084575948')).toBe(true);
  });
  it('rejects invalid / repeated-digit codes', () => {
    expect(isValidNationalCode('1111111111')).toBe(false);
    expect(isValidNationalCode('123')).toBe(false);
    expect(isValidNationalCode('0499370898')).toBe(false);
  });
});

describe('normalizePersian', () => {
  it('unifies Arabic Ye/Ke and collapses whitespace', () => {
    expect(normalizePersian('علي  كريمي')).toBe('علی کریمی');
  });
});
