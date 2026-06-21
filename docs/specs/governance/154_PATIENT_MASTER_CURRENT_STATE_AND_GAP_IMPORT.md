# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## Patient Master Current-State and Gap Import

### Legacy current-state summary
The 2026-05 handoff reports partial old-project Patient Master progress: local SQLite alignment, auto file number, duplicate blocking for file number/national code, mobile normalization, and many not-yet-implemented parts.

### V1.10 decision
These are NOT current Zero Rebuild implementation proof. They are imported as checklist items only.

### Required future Patient Master gate
Patient Master cannot be considered complete unless all of the following are true under current repo/device:

- UI real and Persian/RTL verified on phone
- Local SQLite patient table exists/migrates safely
- Cloud migration and RLS exist when remote sync is in scope
- sync_queue handles offline create/update/archive
- file_number required and unique
- national_code required and unique with checksum
- mobile required and normalized; duplicate warning only
- relationship/referrer system implemented without auto-merge
- duplicate intelligence shows existing record summary and safe actions
- role permissions enforce manager/secretary/doctor boundaries
- audit trail for sensitive create/update/archive
- Android runtime evidence

### STOP_BLOCKER
If a future executor tries to reuse old Patient Master code as current completion:

```text
STOP_BLOCKER_PATIENT_MASTER_LEGACY_PROGRESS_NOT_CURRENT_PROOF
```
