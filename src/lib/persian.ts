/**
 * Persian / Iranian helpers — digits, currency (Toman), and validators.
 * UI shows Persian digits; storage/logic always uses normalized English digits.
 */

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;

export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function toEnglishDigits(input: string): string {
  let out = input;
  PERSIAN_DIGITS.forEach((d, i) => {
    out = out.replace(new RegExp(d, 'g'), String(i));
  });
  ARABIC_DIGITS.forEach((d, i) => {
    out = out.replace(new RegExp(d, 'g'), String(i));
  });
  return out;
}

/** Group integer part with thousands separators. Input may contain Persian digits. */
function groupThousands(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '،');
}

/**
 * Format an amount stored in Toman into a localized string, e.g. 1250000 -> "۱٬۲۵۰٬۰۰۰ تومان".
 * Currency is ALWAYS Toman — never raw Rials.
 */
export function formatToman(amount: number, withSuffix = true): string {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  const grouped = groupThousands(String(Math.abs(safe)));
  const sign = safe < 0 ? '-' : '';
  const persian = toPersianDigits(sign + grouped).replace('-', '−');
  return withSuffix ? `${persian} تومان` : persian;
}

const MOBILE_RE = /^09\d{9}$/;

export function normalizeMobile(input: string): string {
  let v = toEnglishDigits(input).replace(/[\s-]/g, '');
  if (v.startsWith('+98')) v = '0' + v.slice(3);
  else if (v.startsWith('0098')) v = '0' + v.slice(4);
  else if (v.startsWith('98') && v.length === 12) v = '0' + v.slice(2);
  return v;
}

export function isValidIranianMobile(input: string): boolean {
  return MOBILE_RE.test(normalizeMobile(input));
}

/** Iranian national code (کد ملی) validation with checksum. */
export function isValidNationalCode(input: string): boolean {
  const code = toEnglishDigits(input).replace(/\D/g, '');
  if (!/^\d{10}$/.test(code)) return false;
  if (/^(\d)\1{9}$/.test(code)) return false; // all identical digits are invalid
  const check = Number(code[9]);
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(code[i]) * (10 - i);
  const remainder = sum % 11;
  return remainder < 2 ? check === remainder : check === 11 - remainder;
}

/**
 * Normalize Persian text for search/dedup: unify Arabic/Persian Ye & Ke,
 * strip diacritics & ZWNJ, collapse whitespace, lowercase.
 */
export function normalizePersian(input: string): string {
  return toEnglishDigits(input)
    .replace(/\u064A/g, '\u06CC') // Arabic Ya -> Persian Ye
    .replace(/\u0643/g, '\u06A9') // Arabic Kaf -> Persian Ke
    .replace(/[\u064B-\u065F\u0670]/g, '') // harakat
    .replace(/\u200c/g, ' ') // ZWNJ -> space
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}
