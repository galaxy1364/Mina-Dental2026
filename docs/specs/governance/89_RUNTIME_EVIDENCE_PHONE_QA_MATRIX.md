# 89 — Runtime Evidence & Phone QA Matrix
Version: V1.5
Status: LOCKED QA GOVERNANCE

## Purpose
The user must be able to see meaningful implementation on the phone as early and often as possible. Evidence must be structured, repeatable, and tied to each batch.

## Evidence types

### Static evidence
- TypeScript output.
- ESLint output.
- Expo doctor where applicable.
- Secret scan.
- Package/SDK identity.

### Runtime evidence
- Expo Go 54 screenshot/video on Android.
- Expo Go 54 screenshot/video on iPhone.
- Development build evidence when Expo Go cannot support feature.
- ADB/iOS logs when needed.

### Functional evidence
- screen opens;
- navigation works;
- buttons are not dead;
- validation works;
- offline banner/state works;
- data persists if persistence is in scope;
- RBAC blocks if access control is in scope.

### Visual evidence
- RTL screenshot;
- dock no overlap;
- text not clipped;
- cards readable;
- contrast acceptable;
- Persian strings;
- animations not blocking workflow.

## Phone QA rule
Every UI batch must include at least one user-visible screenshot/video from the target phone path before it can be marked verified.

## Evidence storage
Every batch must create:

```text
evidence/BATCH-ID/terminal.txt
evidence/BATCH-ID/screenshots/
evidence/BATCH-ID/status.md
evidence/BATCH-ID/manifest.txt
```

## No-evidence rule
No evidence means `IMPLEMENTED_NOT_VERIFIED`, never `VERIFIED_REAL`.
