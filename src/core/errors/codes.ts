/**
 * Standardized, typed error codes with user-facing Persian messages.
 * Aligned with the canonical execution prompt (Section 25).
 */
export const ERROR_CODES = {
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',
  CONFIG_MISSING: 'CONFIG_MISSING',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  DUPLICATE_PATIENT: 'DUPLICATE_PATIENT',
  SLOT_UNAVAILABLE: 'SLOT_UNAVAILABLE',
  OUTSIDE_WORKING_HOURS: 'OUTSIDE_WORKING_HOURS',
  SYNC_CONFLICT: 'SYNC_CONFLICT',
  SYNC_DEAD_LETTER: 'SYNC_DEAD_LETTER',
  BACKUP_FAILED: 'BACKUP_FAILED',
  NETWORK_OFFLINE: 'NETWORK_OFFLINE',
  NOT_FOUND: 'NOT_FOUND',
  DB_ERROR: 'DB_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN',
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

export const ERROR_MESSAGES_FA: Record<ErrorCode, string> = {
  AUTH_INVALID_CREDENTIALS: 'ایمیل یا رمز عبور نادرست است.',
  AUTH_SESSION_EXPIRED: 'نشست شما منقضی شده است. دوباره وارد شوید.',
  CONFIG_MISSING: 'پیکربندی سرویس ابری کامل نیست. با مدیر سیستم تماس بگیرید.',
  PERMISSION_DENIED: 'شما به این بخش دسترسی ندارید.',
  VALIDATION_FAILED: 'اطلاعات واردشده معتبر نیست.',
  DUPLICATE_PATIENT: 'بیماری با این مشخصات قبلاً ثبت شده است.',
  SLOT_UNAVAILABLE: 'این بازهٔ زمانی قبلاً رزرو شده است.',
  OUTSIDE_WORKING_HOURS: 'زمان انتخابی خارج از ساعات کاری کلینیک است.',
  SYNC_CONFLICT: 'تعارض در همگام‌سازی داده‌ها رخ داد.',
  SYNC_DEAD_LETTER: 'همگام‌سازی این مورد ناموفق بود و نیازمند بررسی است.',
  BACKUP_FAILED: 'تهیهٔ نسخهٔ پشتیبان ناموفق بود.',
  NETWORK_OFFLINE: 'اتصال اینترنت برقرار نیست. اطلاعات به‌صورت محلی ذخیره شد.',
  NOT_FOUND: 'مورد موردنظر یافت نشد.',
  DB_ERROR: 'خطا در پایگاه‌دادهٔ محلی.',
  SERVER_ERROR: 'خطای غیرمنتظره در سرور.',
  UNKNOWN: 'خطای ناشناخته رخ داد.',
};
