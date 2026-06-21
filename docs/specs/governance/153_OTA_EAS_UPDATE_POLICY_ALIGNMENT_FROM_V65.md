# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## OTA / EAS Update Policy Alignment from v65

### Imported value
The legacy contracts define a useful OTA policy: EAS Update can help test compatible JS/UI fixes, but cannot bypass native/build/schema/security gates.

### V1.10 locked policy

```text
OTA is a controlled delivery mechanism, not a shortcut around verification.
```

### Allowed OTA categories after runtime is established
- JS/TS UI fixes within compatible runtime
- Persian text fixes
- non-native RTL layout fixes
- validation/display formatting fixes
- route/screen fixes within same runtime version
- lightweight asset fixes if compatible

### Forbidden OTA categories
- Expo SDK upgrade
- native dependency addition/change
- permissions changes
- app.json/eas.json/runtimeVersion breaking changes
- android/** or ios/** changes
- destructive DB migration
- sensitive RLS/schema/security change without full gate
- any data-loss risk

### Required OTA evidence
- update ID
- channel
- runtime version
- commit/hash
- changed files
- TypeScript/ESLint/secret scan
- no forbidden file changes
- runtime compatibility proof
- rollback plan
- phone smoke evidence if UI affected

### Current state
For Zero Rebuild, OTA is future only. It must not be enabled before Phase 1 foundation and runtime strategy are accepted.
