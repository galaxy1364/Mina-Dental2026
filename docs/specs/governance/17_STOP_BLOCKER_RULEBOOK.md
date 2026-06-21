# MinaDent STOP_BLOCKER Rulebook V1.1

**Status:** GOVERNANCE_ADDENDUM / NO_CODE
**Date:** 2026-06-21
**Purpose:** تعریف دقیق مواردی که باید فوراً کار را متوقف کند.

---

## 1. اصل STOP_BLOCKER

وقتی شواهد کافی نیست یا خطر خرابکاری وجود دارد، پاسخ درست «حدس‌زدن» یا «fix سریع» نیست. پاسخ درست STOP_BLOCKER است.

---

## 2. STOP_BLOCKERهای اصلی

| Code | معنی | اقدام مجاز |
|---|---|---|
| GOVERNANCE_ROOT_INCOMPLETE | فایل‌های root/governance ناقص‌اند | فقط تکمیل governance |
| GOVERNANCE_CONTEXT_INCOMPLETE | STATUS/RESUME/Board/evidence خوانده نشده | فقط audit read-only |
| UPDATE_ROUTING_UNKNOWN | معلوم نیست تغییر کجا ثبت شود | فقط routing decision |
| EVIDENCE_MISSING | ادعا evidence ندارد | فقط evidence request/audit |
| FORBIDDEN_FILE_TOUCHED | فایل ممنوعه تغییر کرده | reject/quarantine |
| SECRET_EXPOSURE_RISK | secret در source/chat/report آمده | توقف و پاک‌سازی امن |
| SCHEMA_CHANGE_UNAPPROVED | schema بدون اجازه تغییر کرده | reject و rollback plan |
| PACKAGE_CHANGE_UNAPPROVED | dependency/package تغییر کرده | reject و baseline compare |
| BUILD_UNAPPROVED | build بدون مجوز اجرا شده | evidence invalid تا audit |
| CONNECTOR_UNAPPROVED | MCP/Connector بدون policy وصل شده | disconnect/review |
| MOCK_OR_FAKE_DETECTED | mock/fake/demo در مسیر core دیده شد | reject |
| UI_WITHOUT_DOMAIN | UI بدون workflow/data/action ساخته شد | reject یا redesign |
| LEGACY_PROJECT_MIXED | پروژه قدیمی با جدید قاطی شده | isolate و audit |
| RUNTIME_NOT_VERIFIED | ادعای runtime بدون گوشی/وب evidence | status را پایین بیاور |

---

## 3. قالب پاسخ STOP_BLOCKER

```text
STOP_BLOCKER: <CODE>
Reason:
Evidence missing or conflicting:
Allowed next action:
Forbidden actions:
Resume point:
```

---

## 4. کارهایی که در STOP_BLOCKER ممنوع‌اند

- دادن fix شانسی
- پیشنهاد build/install
- تغییر dependency
- تغییر schema
- ساخت workaround
- حذف code برای رد شدن lint
- ساخت UI موقت
- ادامه دادن روی فرض

---

## 5. رفع STOP_BLOCKER

هر blocker فقط با evidence رفع می‌شود، نه با توضیح شفاهی.

مثال:

```text
Before: STOP_BLOCKER: GOVERNANCE_ROOT_INCOMPLETE
Evidence required: ls/root file list showing governance files exist
After: PHASE_0B_AUDIT_PASS
```
