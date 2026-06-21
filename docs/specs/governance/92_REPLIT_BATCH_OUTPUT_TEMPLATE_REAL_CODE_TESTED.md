# 92 — Replit Batch Output Template: Real Code + Tested + Evidence
Version: V1.5
Status: LOCKED EXECUTOR FORMAT

## Replit must output every batch in this format

```text
BATCH_ID:
PHASE:
STATUS:
SCOPE:
FILES_CHANGED:
FILES_NOT_TOUCHED:
DEPENDENCIES_CHANGED:
SCHEMA_CHANGED:
NATIVE_CONFIG_CHANGED:
SDK_COMPATIBILITY:
CODE_SUMMARY:
DATA_CONTRACT_STATUS:
SCREEN_CONTRACT_STATUS:
RBAC_STATUS:
AUDIT_STATUS:
SYNC_STATUS:
TESTS_RUN:
TEST_RESULTS:
PHONE_PREVIEW_EVIDENCE:
KNOWN_LIMITS:
BLOCKERS:
ROLLBACK_PLAN:
STATUS_UPDATE:
RESUME_POINT:
ZIP/MANIFEST_REQUIRED:
```

## Required refusal condition
If Replit cannot provide this structure, its output is invalid and must not be merged.

## No code dump without evidence
Any code-only answer without tests/evidence/STATUS/RESUME is rejected.

## Build command restriction
Replit must never run build, install dependency, modify schema, modify native config, or create connector unless that exact action appears in the approved packet.
