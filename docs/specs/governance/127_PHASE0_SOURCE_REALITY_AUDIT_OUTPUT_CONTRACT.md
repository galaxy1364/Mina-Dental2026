# 127 — Phase 0 Source Reality Audit Output Contract
Version: V1.8
Status: LOCKED

## هدف
V16 خروجی اجباری Phase 0 را دقیق کرده است. این فایل، خروجی canonical برای اولین برخورد Replit/AI با سورس واقعی است.

## Phase 0 — فقط read-only
Allowed:
- read files
- list files
- inspect package/app config
- inspect STATUS/RESUME
- inspect env placeholders without printing secrets
- inspect git status
- inspect route map
- inspect dependency list
- inspect test scripts
- produce report

Forbidden:
- install package
- create app
- edit file
- run build
- change schema
- connect provider
- change env
- delete/cache clean
- run migration

## خروجی اجباری
The executor must return:

- BATCH_ID
- STATUS
- FILES_READ
- PROJECT_IDENTITY
- CURRENT_STATE_MAP
- ROUTE_MAP
- SOURCE_OF_TRUTH_MAP
- ALLOWED_FILES
- FORBIDDEN_FILES
- BLOCKERS
- RISK_CLASSIFICATION
- DEPENDENCY_AUDIT
- SCHEMA_AUDIT
- SYNC_AUDIT
- RBAC_AUDIT
- UI_FOUNDATION_AUDIT
- TEST_BASELINE
- NEXT_MICRO_BATCH_PROPOSAL
- OWNER_QUESTIONS
- RESUME_POINT

## Valid status
- PHASE_0_SOURCE_REALITY_AUDIT_PASS
- PHASE_0_SOURCE_REALITY_AUDIT_PARTIAL
- STOP_BLOCKER_SOURCE_NOT_PROVIDED
- STOP_BLOCKER_INPUT_PACKAGE_INCOMPLETE
- STOP_BLOCKER_PROJECT_IDENTITY_CONFLICT
- STOP_BLOCKER_SDK_RUNTIME_MISMATCH

## حکم مهم
اگر فقط V16/V1.8 سند داده شود ولی سورس واقعی پروژه در Replit وجود نداشته باشد:
`STOP_BLOCKER_SOURCE_NOT_PROVIDED`
