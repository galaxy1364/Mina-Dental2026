# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 68 — Clinic Master Data Reconciliation

### اصل
Clinic master data نباید از legacy یا حافظه حدس زده شود. هر داده‌ای که روی staff/doctor/role/phone/email/pricing اثر دارد باید owner-confirmed باشد.

### Known sources to reconcile
| Field | Memory/New Zero context | Legacy/v54 docs | Status |
|---|---|---|---|
| Clinic name | کلینیک/مطب دندانپزشکی مینا | Mina-Dental / مطب دندانپزشکی مینا | NEED_CONFIRM_OFFICIAL_DISPLAY |
| Manager | Dr. Mehdi / user-managed context | Mehdi Hasanvand + phone/email | NEED_CONFIRM_PRIVATE_DATA_BEFORE_REPO |
| Doctors | Mina Mazandarani, Abdolfazl Farahani, Ali Yazarloo, Dr. Mehdi | Mehdi, Mina, Abolfazl | CONFLICT_PENDING |
| Secretary | Akram / Akram Eidieh | Akram Eydi + phone | CONFLICT_PENDING |
| Units | Blue/Yellow | Blue/Yellow | ACCEPT_PENDING_LABELS |
| Labs | Nadaki/Najdaki? | Najdaki/Hejbari | CONFLICT_PENDING |
| Working hours | irregular/editable | 08:00-24:00 | CONFLICT_PENDING |
| SMS doctor name | ممنوع یا privacy-sensitive | NEVER doctor name | ACCEPT |
| Currency | Toman | Toman | ACCEPT |
| File number | auto | auto sequential per clinic | ACCEPT_PENDING_POLICY |

### Rules
- هیچ شماره موبایل/ایمیل واقعی نباید در فایل عمومی repo قرار بگیرد مگر owner explicitly approve کند.
- داده‌های staff واقعی باید در seed secure یا admin setup flow وارد شود، نه hardcoded source.
- اگر clinic data conflict حل نشده باشد، `PHASE_1_AUTH_STAFF_SEED` ممنوع است.

### Required owner decisions before implementation
1. نام رسمی قابل نمایش کلینیک در UI.
2. لیست رسمی پزشکان اولیه.
3. نقش دقیق دکتر مهدی: manager؟ doctor؟ owner؟
4. نام/شماره/ایمیل منشی برای auth seed.
5. آزمایشگاه‌های اولیه و املای رسمی.
6. ساعات کاری پیش‌فرض: fixed یا editable calendar-only؟
7. شماره پرونده global per clinic یا per doctor؟

### Current gate
`STOP_BLOCKER_MASTER_DATA_RECONCILIATION_REQUIRED` قبل از هر seed/staff/auth/doctor catalog.
