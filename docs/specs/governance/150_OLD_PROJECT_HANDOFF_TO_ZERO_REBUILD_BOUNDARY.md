# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## Old Project State Reconciliation and Zero Rebuild Boundary

### Boundary rule
The uploaded files contain valuable execution history from prior MinaDent attempts. But user already declared the previous Replit/project was deleted and the current work is a Zero Rebuild. Therefore:

```text
Old project state is evidence history, not current implementation state.
```

### Carryover categories

| Category | Carryover allowed? | Handling |
|---|---:|---|
| Business requirements | Yes | Merge into requirement matrix after dedup |
| Failure lessons | Yes | Convert to STOP_BLOCKER rules |
| Runtime screenshots/logs | Limited | Evidence history only unless current repo/device repeats it |
| Code snippets | No direct copy | Quarantine and rewrite under current stack |
| Build commands | No direct use | Re-audit against current SDK/toolchain |
| Local paths | No | Legacy reference only |
| Credentials/env | No | Never import from chat/file into repo |
| Doctor/clinic rules | Yes, if consistent with latest user data | Latest explicit user data wins |

### Current Zero Rebuild truth
As of V1.10:

```text
CODE: NOT_STARTED
SCHEMA: NOT_STARTED
BUILD: NOT_ALLOWED
REPLIT IMPLEMENTATION: NOT_ALLOWED
OLD PROJECT PROGRESS: NOT CARRIED OVER
```

### Stop blocker
If any AI or executor says “این قبلاً ساخته شده پس ادامه بدهیم” without current repo evidence:

```text
STOP_BLOCKER_LEGACY_STATE_MIXED_WITH_ZERO_REBUILD
```
