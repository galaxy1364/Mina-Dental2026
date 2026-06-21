# MinaDent Phase 0B Audit Checklist V1.1

**Status:** GOVERNANCE_ADDENDUM / NO_CODE
**Date:** 2026-06-21
**Purpose:** چک‌لیست مرحله بعد بعد از قرار دادن Governance Pack در پروژه جدید.

---

## 1. هدف Phase 0B

Phase 0B هیچ کدی نمی‌نویسد. فقط بررسی می‌کند پروژه جدید واقعاً آماده شروع استاندارد است یا نه.

---

## 2. ورودی‌های لازم

- root پروژه جدید Replit یا local
- governance pack import شده
- فایل‌های root موجود
- وضعیت template یا existing files مشخص
- بدون build و بدون install اضافه

---

## 3. چک‌لیست اجباری

### A. Governance Root Check

```text
README_START_HERE.md exists
STATUS.md exists
RESUME_STATE.md exists
PROJECT_FILE_INDEX.md exists
governance/ exists
evidence/ exists
```

### B. Constitution Check

```text
00_MINADENT_CONSTITUTION.md exists
No-demo/no-mock rules present
Evidence-first rule present
Forbidden changes listed
STOP_BLOCKER rule present
```

### C. Requirement Board Check

```text
02_REQUIREMENT_CONTROL_BOARD.md exists
Requirement statuses use allowed enum
No capability marked verified without evidence
```

### D. Replit Executor Check

```text
COPY_TO_REPLIT_AGENT_SYSTEM_PROMPT.txt exists
AI executor is limited to allowed files
Manifest/evidence required
```

### E. Secret Safety Check

```text
No real secrets in governance files
.env is not committed
No service_role in client files
No SMS secret in source
```

### F. Project Identity Check

```text
Project name/slug confirmed
Old MinaDent paths not used as current truth
No legacy cache treated as source of truth
```

---

## 4. خروجی مجاز Phase 0B

فقط یکی از این‌ها:

```text
PHASE_0B_AUDIT_PASS_READY_FOR_PHASE_1_APP_SHELL
```

یا

```text
STOP_BLOCKER: <exact blocker>
```

---

## 5. خروجی ممنوع Phase 0B

- ساخت صفحه
- نصب package
- تغییر schema
- اتصال Supabase
- ساخت Auth واقعی
- اجرای build
- اضافه‌کردن MCP/Connector
- ساخت mock dashboard
- ساخت demo patient data

---

## 6. Evidence مورد نیاز

گزارش Phase 0B باید این‌ها را بدهد:

```text
Checked files:
Missing files:
Forbidden files touched:
Secrets found:
Status result:
Next resume point:
```
