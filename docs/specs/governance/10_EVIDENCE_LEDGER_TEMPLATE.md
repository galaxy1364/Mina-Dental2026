# Evidence Ledger Template — دفتر شواهد

وضعیت: template  
قانون: بدون evidence، ادعا معتبر نیست.

---

## قالب Evidence

| Evidence ID | Date | Batch | Requirement ID | Type | Description | Files/Routes | Result | Link/Path | Verified By |
|---|---|---|---|---|---|---|---|---|---|

## انواع Evidence

- DOC_EVIDENCE
- SOURCE_EVIDENCE
- TEST_EVIDENCE
- RUNTIME_SCREENSHOT
- RUNTIME_VIDEO
- DB_EVIDENCE
- SYNC_EVIDENCE
- BACKUP_EVIDENCE
- SECURITY_EVIDENCE
- CHECKSUM_EVIDENCE
- BLOCKER_EVIDENCE

## نمونه

| Evidence ID | Date | Batch | Requirement ID | Type | Description | Files/Routes | Result | Link/Path | Verified By |
|---|---|---|---|---|---|---|---|---|---|
| EVD-0001 | 2026-06-21 | ZERO_FOUNDATION_PACK | CORE-005 | DOC_EVIDENCE | Governance pack created | governance files | PASS | ZIP manifest | ChatGPT |

## قانون Evidence برای Runtime

هر runtime evidence باید شامل باشد:

- app version/build
- device
- platform
- route
- exact action
- expected result
- observed result
- screenshot/video path
- known limitations

## قانون Evidence برای Source

هر source evidence باید شامل باشد:

- file path
- line/section summary
- diff summary
- tests run
- checksum
- forbidden files check

## قانون Evidence برای Sync/Backup

- local row created
- sync queue created
- remote row created/updated
- status changed
- retry/conflict behavior
- audit event
- backup checksum
- restore validation

## وضعیت‌های معتبر Evidence

- PASS
- PASS_INITIAL
- PASS_SOURCE_ONLY
- PASS_LOCAL_GATES
- PASS_RUNTIME
- PARTIAL
- FAILED
- BLOCKED
- NOT_RUN
- NOT_APPLICABLE
