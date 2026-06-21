# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## Golden Baseline, Overlay, and Legacy Build Quarantine

### Imported principle
Legacy handoff files strongly prove that whole-project replacement, broad Replit output, dependency guessing, Gradle/native patching, and paid build guessing caused execution risk. Therefore V1.10 locks a stricter quarantine.

### V1.10 rule

```text
No legacy build path, old local path, old EAS baseline, old app package, old root .npmrc, old lockfile, old native workaround, or old Expo CLI command is executable in Zero Rebuild until current-repo read-only audit confirms it.
```

### Allowed from legacy
- Concept of overlay manifest
- Forbidden-file list discipline
- Local gates before build
- Secret scan before build
- Android screenshot as UI proof
- Do not replace whole project

### Forbidden from legacy
- Reusing old app folders as current source
- Importing old package.json / lockfile / native route
- Old EAS project IDs as current truth
- Old Expo SDK 51 baseline as current runtime target
- Old `npx expo export from app` rules without current audit
- Any old password/auth/env output

### Mandatory overlay protocol for future code batches
Every executor output must include:

```text
OVERLAY_MANIFEST
FILES_CHANGED
FILES_NOT_CHANGED
FORBIDDEN_FILES_CHECK
CHECKSUMS
ROLLBACK
LOCAL_GATES
RUNTIME_EVIDENCE_REQUIRED
```

If ZIP/manifest/checksum is missing: `STOP_BLOCKER_OVERLAY_EVIDENCE_MISSING`.
