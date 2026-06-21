# MinaDent Zero Rebuild — V1.12
## PHASE_0O_FORBIDDEN_RULES_AND_ALWAYS_ON_EXECUTION_CONTROL

Status: GOVERNANCE_ONLY / READ_ONLY_IMPORT / NO_CODE
Date: 2026-06-21
Rule: این فایل از batch جدید ورودی‌ها استخراج شده و هیچ کد legacy، هیچ schema، هیچ build، هیچ dependency و هیچ prompt خام را مستقیم اجرا نمی‌کند.


# 175 — Phase Recurring Checklist / No-AI-Drift Guard

## Goal
این چک‌لیست جلوی drift هوش مصنوعی را می‌گیرد: یعنی AI نباید از مسیر اصلی خارج شود، تکراری بسازد، دمو بسازد، فایل‌های حساس را لمس کند، یا به فاز بعد بپرد.

## Checklist Must Exist in Every Phase

### 1. Requirement Control
- REQ-ID تعریف شده است.
- مشابه/تکراری آن در registry جستجو شده است.
- اگر تکراری بود، فقط canonical را extend کرده است.
- اگر جدید است، در roadmap و traceability ثبت شده است.

### 2. Domain Integrity
- Entity مشخص است.
- State machine مشخص است.
- Owner role مشخص است.
- Audit requirement مشخص است.
- Sync behavior مشخص است.
- Sensitive data classification مشخص است.

### 3. UI Integrity
- صفحه از design system استفاده می‌کند.
- RTL root و component-level چک شده است.
- Text کوتاه و فارسی است.
- Empty/Error/Loading/Offline/Retry وجود دارد.
- Action مرده وجود ندارد.
- Safe area و dock collision چک شده است.

### 4. Data Integrity
- Local DB impact مشخص است.
- Supabase/RLS impact مشخص است.
- Migration required? YES/NO.
- Unique/duplicate strategy مشخص است.
- Backup/rollback برای data change مشخص است.

### 5. Sync Integrity
- آیا write عملیاتی دارد؟
- اگر بله، sync queue entity_type تعریف شده است.
- retry/dead-letter/conflict behavior تعریف شده است.
- UI pending/failed/synced states دارد.

### 6. Security Integrity
- role/action matrix enforce می‌شود.
- service_role absent ثابت می‌شود.
- PII در log نیست.
- action حساس approval/audit دارد.

### 7. Evidence Integrity
- static gates تعریف شده‌اند.
- runtime path تعریف شده است.
- evidence folder تعریف شده است.
- status label صادقانه است.

## Phase Failure Rule
اگر هر بخش مهم این checklist ناقص باشد:
`STOP_BLOCKER_PHASE_RECURRING_GUARD_FAILED`
