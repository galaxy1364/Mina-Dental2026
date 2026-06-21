# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## Runtime Evidence, Auth/Login, and RTL Blocker Import

### What the legacy evidence says
The legacy evidence establishes a critical distinction:

- APK build/install/open can pass while login remains blocked.
- Source gates are not runtime verification.
- HTML/browser preview is not Android RTL proof.
- Android runtime screenshot is final proof for RTL visual acceptance.

### V1.10 imported rule

```text
Runtime proof must identify the exact layer it proves:
BUILD_ARTIFACT ≠ APP_BOOT ≠ AUTH_SUCCESS ≠ SESSION_RESTORE ≠ RTL_VISUAL_PASS ≠ FEATURE_COMPLETE
```

### Auth/Login old blocker handling
Old files say a previous project reached Android login screen but hit credential error. This is not current Zero Rebuild progress. It is imported only as a failure pattern.

V1.10 rule:

```text
No auth/login success can be claimed in Zero Rebuild until current repo/device evidence proves it.
```

### RTL old blocker handling
The old Patient Create RTL issue is imported as a permanent visual QA lesson:

```text
For Persian/RTL forms, final acceptance requires real phone screenshot/video on the target runtime.
TextInput alignment passing is not enough; labels, required markers, errors, helper text, cards and titles must all be visually right-anchored and consistent.
```

### Runtime evidence taxonomy

| Evidence type | Proves | Does not prove |
|---|---|---|
| TypeScript PASS | source type correctness | runtime correctness |
| ESLint PASS | static quality | UI correctness |
| Web/HTML preview | rough visual hint | Android/iOS RTL correctness |
| APK installed | artifact installability | login/session/feature |
| Login screen visible | app boot + route | auth success |
| Android screenshot | exact visual state | backend correctness |
| Device video | interaction/runtime behavior | cloud sync unless shown |
| SQL/RLS output | backend policy | mobile UI |
