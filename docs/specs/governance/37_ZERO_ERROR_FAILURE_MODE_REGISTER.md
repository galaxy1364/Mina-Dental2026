---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 37 — Zero Error Failure Mode Register

این فایل برای جلوگیری از تکرار خطاهای قبلی ساخته شده است. هر Executor، مخصوصاً Replit/AI، قبل از هر batch باید این جدول را بخواند.

## خطاهای ریشه‌ای ممنوع

| ID | Failure Mode | نمونه خرابی | تشخیص قبل از اجرا | اقدام مجاز |
|---|---|---|---|---|
| FM-001 | شروع کدنویسی قبل از governance | ساخت صفحه بدون architecture | STATUS != READY_FOR_IMPLEMENTATION | STOP_BLOCKER |
| FM-002 | قاطی کردن پروژه‌ها | استفاده از MinaDent قدیمی، dental-clinic یا مسیر اشتباه | path/projectId/package/slug match ندارد | STOP_BLOCKER |
| FM-003 | UI تزئینی بدون domain | کارت زیبا بدون route/action/data | Screen Contract یا Module Registry ندارد | STOP_BLOCKER |
| FM-004 | Mock/fake data | داده ساختگی با ظاهر real | Data Source واقعی یا explicit seed policy ندارد | حذف/رد batch |
| FM-005 | دکمه مرده | Touchable/Button بدون action واقعی یا route contract | action-map ناقص | FAIL |
| FM-006 | Patch شانسی | تغییر style/schema/package بدون علت ریشه‌ای | root-cause/evidence ندارد | STOP_BLOCKER |
| FM-007 | Build بی‌دلیل | EAS قبل از local gates | Local Gates pass نشده | Build ممنوع |
| FM-008 | Schema drift | migration بدون contract/RLS/audit | Data Contract ناقص | STOP_BLOCKER |
| FM-009 | Secret leak | env/key داخل source/log | secret scan fail | emergency rotation |
| FM-010 | Route drift | صفحه ساخته شده ولی route لینک ندارد | route integrity fail | FAIL |
| FM-011 | Design drift | هر صفحه رنگ/spacing/icon جدا دارد | token/registry استفاده نشده | FAIL |
| FM-012 | Sync بدون conflict policy | offline queue بدون حل تعارض | sync contract ناقص | STOP_BLOCKER |
| FM-013 | RBAC نمایشی | role فقط در UI، نه DB/service | RLS/service guard ندارد | STOP_BLOCKER |
| FM-014 | Evidence ناقص | ادعای PASS بدون log/screenshot/hash | Evidence Ledger خالی | INVALID |
| FM-015 | تغییر destructive | delete/clear data/uninstall | اجازه مرحله‌ای ندارد | ممنوع |
| FM-016 | Legacy copy بدون audit | کپی فایل قدیمی | legacy merge protocol اجرا نشده | STOP_BLOCKER |
| FM-017 | فارسی/RTL خراب | mojibake/چپ‌چین/برچسب بریده | RTL QA fail | FAIL |
| FM-018 | performance debt | load کل دیتا/لیست سنگین | Performance Budget fail | FAIL |
| FM-019 | AI action خطرناک | AI ارسال پیام/حذف/مالی بدون تأیید | human confirmation ندارد | STOP_BLOCKER |
| FM-020 | ادعای production بدون runtime | فقط source pass | device evidence ندارد | NOT_VERIFIED |

## پیشگیری اجباری قبل از هر batch

```text
1. Read README_START_HERE.md
2. Read STATUS.md
3. Read RESUME_STATE.md
4. Read 37_ZERO_ERROR_FAILURE_MODE_REGISTER.md
5. Identify current phase
6. Identify allowed files
7. Identify forbidden files
8. Confirm no blocker
9. Produce real implementation plan
10. Execute only after explicit scope
```


## قانون توقف مشترک
اگر هر بخش این سند با evidence قابل اثبات نشد، خروجی مجاز فقط این است:

```text
STOP_BLOCKER
NO_CODE
NO_BUILD
NO_SCHEMA
NO_CONNECTOR
NO_PATCH
```
