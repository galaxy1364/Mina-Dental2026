# Phase 0 Execution Packet for Replit — فقط ایجاد Governance Pack

وضعیت: آماده برای استفاده در Replit جدید  
هشدار: این packet فقط برای کپی فایل‌های governance در پروژه جدید است. هیچ کد اپ نباید ساخته شود.

---

## Batch ID

`BATCH-ZERO-GOVERNANCE-PACK-IMPORT-001`

## Purpose

قرار دادن فایل‌های قانون اساسی، نقشه محصول، requirement board، architecture، design، data/sync، security، connector/MCP، executor protocol، update protocol، STATUS و RESUME در root پروژه جدید MinaDent.

## Strict Reminder

You are Executor only.  
Do not architect.  
Do not add features.  
Do not create UI.  
Do not install packages.  
Do not run build.  
Do not change schema.  
Do not connect external services.  
Do not create mock/demo app.  
Only import the provided governance files exactly.

## Allowed Files

- `README_START_HERE.md`
- `00_MINADENT_CONSTITUTION.md`
- `01_MASTER_PRODUCT_BLUEPRINT.md`
- `02_REQUIREMENT_CONTROL_BOARD.md`
- `03_FOUNDATION_ARCHITECTURE.md`
- `04_DESIGN_SYSTEM_CONTRACT.md`
- `05_DATA_SYNC_BACKUP_CONTRACT.md`
- `06_SECURITY_RBAC_AUDIT_CONTRACT.md`
- `07_CONNECTOR_MCP_POLICY.md`
- `08_AI_EXECUTOR_PROTOCOL.md`
- `09_CHANGE_CONTROL_AND_UPDATE_PROTOCOL.md`
- `10_EVIDENCE_LEDGER_TEMPLATE.md`
- `STATUS.md`
- `RESUME_STATE.md`
- `PROJECT_FILE_INDEX.md`

## Forbidden

- `package.json`
- `app.json`
- `eas.json`
- `tsconfig.json`
- `src/`
- `app/`
- `lib/`
- database/migrations
- `.env`
- dependencies
- build commands
- prebuild
- schema changes
- connector setup

## Required Output

- STATUS
- Files created
- Files modified
- Forbidden files touched: must be NONE
- Checksums
- ZIP overlay with manifest
- Resume point

## Acceptance Criteria

PASS فقط اگر:

- همه فایل‌ها دقیقاً ایجاد شوند
- فایل ممنوع تغییر نکند
- manifest و SHA256 داده شود
- STATUS و RESUME درست باشند
- هیچ کدنویسی انجام نشده باشد

## Stop Conditions

- اگر پروژه اشتباه است: `STOP_BLOCKER_WRONG_PROJECT`
- اگر اجازه تغییر source خواسته شد: `STOP_BLOCKER_SOURCE_CHANGE_FORBIDDEN`
- اگر فایل‌های governance ناقص است: `STOP_BLOCKER_INPUT_PACKAGE_INCOMPLETE`
