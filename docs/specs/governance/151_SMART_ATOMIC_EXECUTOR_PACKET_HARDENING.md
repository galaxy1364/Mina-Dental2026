# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## Smart Atomic Executor Packet Hardening Import

### Purpose
The v65 executor packet is valuable because it forces executor adoption before action. V1.10 rewrites that idea for the current Zero Rebuild.

### Required executor adoption before any future action
Any executor must first answer:

1. آیا آخرین ZIP مادر را خوانده؟
2. آیا قبول دارد فقط executor است؟
3. آیا هیچ فایل تغییر نداده؟
4. آیا هیچ dependency نصب نکرده؟
5. آیا build اجرا نکرده؟
6. آیا current status/resume point را دقیق خوانده؟
7. آیا forbidden actions را فهمیده؟
8. آیا فقط read-only audit انجام داده؟

### Atomic batch rule
Every batch must be small enough that:

- allowed files can be listed exactly
- forbidden files can be checked exactly
- tests can be run in one pass
- rollback is clear
- phone runtime target is clear when UI is involved

### Invalid executor response
A response is invalid if it contains:

- “Done / complete / ready / OK” without evidence
- code outside allowed files
- package/schema/build changes without packet permission
- summarized errors instead of raw output
- suggested feature beyond current phase
- self-healing or architecture decisions
- missing manifest/checksum

### V1.10 executor output contract

```text
BATCH_ID:
STATUS:
SCOPE:
FILES_READ:
FILES_CHANGED:
FILES_NOT_CHANGED:
FORBIDDEN_FILES_CHECK:
DEPENDENCIES_CHANGED:
BUILD_RUN:
SCHEMA_CHANGED:
COMMANDS_RUN:
RAW_OUTPUT:
TESTS:
EVIDENCE:
BLOCKERS:
LIMITS:
ROLLBACK:
GOVERNANCE_UPDATE:
OVERLAY_MANIFEST:
CHECKSUMS:
NEXT_ALLOWED_STEP:
RESUME_POINT:
```
