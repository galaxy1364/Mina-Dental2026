# MinaDent Zero Rebuild — V1.12
## PHASE_0O_FORBIDDEN_RULES_AND_ALWAYS_ON_EXECUTION_CONTROL

Status: GOVERNANCE_ONLY / READ_ONLY_IMPORT / NO_CODE
Date: 2026-06-21
Rule: این فایل از batch جدید ورودی‌ها استخراج شده و هیچ کد legacy، هیچ schema، هیچ build، هیچ dependency و هیچ prompt خام را مستقیم اجرا نمی‌کند.


# 174 — Always-Repeat Phase Header and Gate Template

## Purpose
کاربر صریحاً خواست بخش‌هایی که باید همیشه تکرار شوند در همه فازها وجود داشته باشند تا برنامه از دست AI خارج نشود. این فایل همان متن تکرارشونده استاندارد است.

## Mandatory Header for Every Phase / Batch
```text
MINADENT ZERO REBUILD — ALWAYS-ON EXECUTION CONTROL
VERSION: V1.12+
ROLE: Executor only unless explicitly assigned Architect/Auditor.
SOURCE OF TRUTH: Governance ZIP latest version + STATUS.md + RESUME_STATE.md + current packet.
CURRENT PHASE:
BATCH_ID:
REQUIREMENT_IDS:
SCOPE:
FILES_ALLOWED:
FILES_FORBIDDEN:
RISK_LEVEL:

ABSOLUTE RULES:
1. No demo / no fake / no mock critical path / no placeholder persistence.
2. No phase skip. No new feature before current gate PASS.
3. No code before read-only audit.
4. No package/native/schema/build/config changes without explicit approval.
5. No service_role in client. No secrets in source/logs.
6. Persian-first, RTL-first, Jalali UI only, Gregorian DB only, Toman UI.
7. Critical writes are local-first + sync queue + audit + permission checked.
8. Feature complete only with Screen + Local DB + Sync Queue + Migration + RLS + Test Evidence when operational data exists.
9. VERIFIED_REAL only with raw terminal output, device screenshot, artifact, SQL result, or evidence file.
10. Any ambiguity/risk/data-loss/security conflict = STOP_BLOCKER.
```

## Mandatory Pre-Action Checklist
قبل از هر کار اجرایی باید همه این‌ها پر شود:

| Gate | Required Answer |
|---|---|
| Latest Governance ZIP version read? | YES/NO |
| STATUS.md read? | YES/NO |
| RESUME_STATE.md read? | YES/NO |
| Current phase confirmed? | text |
| Scope frozen? | YES/NO |
| Duplicate requirement check done? | YES/NO |
| Allowed files listed? | YES/NO |
| Forbidden files listed? | YES/NO |
| Data/schema impact? | NONE/READ/WRITE/MIGRATION |
| Security/RLS impact? | NONE/LOW/MED/HIGH |
| Sync impact? | NONE/READ/WRITE/PROCESSOR |
| UI/RTL impact? | NONE/LOW/MED/HIGH |
| Test plan exists? | YES/NO |
| Rollback point exists? | YES/NO |
| STOP conditions listed? | YES/NO |

## Mandatory Post-Action Checklist
بعد از هر batch:

```text
STATUS_LABEL:
FILES_CHANGED:
FORBIDDEN_FILES_TOUCHED: YES/NO
TYPECHECK:
LINT:
SECRET_SCAN:
TESTS:
RUNTIME_EVIDENCE:
REGRESSION_CHECK:
KNOWN_LIMITS:
STATUS_UPDATED:
RESUME_UPDATED:
ZIP_UPDATED:
SHA256:
NEXT_RESUME_POINT:
```

## Required Repetition Across Phases
این header باید در ابتدای تمام فایل‌های اجرایی فازها تکرار شود؛ خلاصه‌سازی یا حذف ممنوع است. اگر طول زیاد شد، باید به `173_UNIVERSAL_FORBIDDEN_ACTIONS_REGISTRY.md` و این فایل reference داده شود و پنج قانون بحرانی بالا inline بماند.
