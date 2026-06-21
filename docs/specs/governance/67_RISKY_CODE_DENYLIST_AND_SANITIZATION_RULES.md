# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 67 — Risky Code Denylist and Sanitization Rules

### Direct-copy denylist
هر legacy snippet شامل موارد زیر مستقیم ممنوع است:

```text
service_role
SUPABASE_SERVICE_ROLE_KEY در client/src/app
CLINIC_ID
YOUR_
TODO
MOCK
mockGet
placeholder
publicUrl برای medical/private files
console.log PII
hard delete / DELETE FROM clinical/financial
Doctor share in client
Jalali DB column
raw fetch critical API بدون typed service/error handling
Payment callback بدون idempotency
AI diagnosis بدون disclaimer/doctor confirmation
Voice auto action بدون confirmation
```

### Sanitization pipeline
1. Extract idea only.
2. Remove secrets/placeholders/mock paths.
3. Convert to Requirement ID.
4. Map to Module Blueprint.
5. Define data contract.
6. Define RBAC/audit/sync.
7. Define tests/evidence.
8. Create implementation packet from scratch.

### Forbidden implementation claims
- “کامل شد” بدون evidence.
- “ذخیره شد” بدون persistence.
- “sync شد” بدون queue/server evidence.
- “امن است” بدون RLS/secret scan/deny tests.
- “production” بدون runtime/device/build artifact.

### Enforcement
اگر فایل یا prompt پیشنهادی legacy حاوی denylist بود، Executor باید گزارش بدهد:
`STOP_BLOCKER_RISKY_LEGACY_SNIPPET` و file/line/pattern را ثبت کند.
