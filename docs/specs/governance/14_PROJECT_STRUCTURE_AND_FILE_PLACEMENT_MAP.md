# MinaDent Project Structure & File Placement Map V1.1

**Status:** GOVERNANCE_ADDENDUM / NO_CODE
**Date:** 2026-06-21
**Purpose:** مشخص‌کردن اینکه فایل‌های قانون، prompt، evidence و source در پروژه جدید کجا قرار بگیرند.

---

## 1. ساختار پیشنهادی root پروژه

```text
minadent/
  README_START_HERE.md
  STATUS.md
  RESUME_STATE.md
  PROJECT_FILE_INDEX.md
  governance/
    00_MINADENT_CONSTITUTION.md
    01_MASTER_PRODUCT_BLUEPRINT.md
    02_REQUIREMENT_CONTROL_BOARD.md
    03_FOUNDATION_ARCHITECTURE.md
    04_DESIGN_SYSTEM_CONTRACT.md
    05_DATA_SYNC_BACKUP_CONTRACT.md
    06_SECURITY_RBAC_AUDIT_CONTRACT.md
    07_CONNECTOR_MCP_POLICY.md
    08_AI_EXECUTOR_PROTOCOL.md
    09_CHANGE_CONTROL_AND_UPDATE_PROTOCOL.md
    12_MEMORY_CONTEXT_TAXONOMY.md
    13_PROMPT_AND_INSTRUCTION_LAYERING_GUIDE.md
    14_PROJECT_STRUCTURE_AND_FILE_PLACEMENT_MAP.md
    15_MASTER_UPDATE_ROUTING_MATRIX.md
    16_PHASE_0B_AUDIT_CHECKLIST.md
    17_STOP_BLOCKER_RULEBOOK.md
  evidence/
    EVIDENCE_LEDGER.md
    YYYY-MM-DD_BATCH_ID.txt
  docs/
    packets/
    decisions/
    audits/
  app/
  src/
  lib/
  assets/
  package.json
```

---

## 2. قانون root

در root پروژه همیشه باید این‌ها وجود داشته باشد:

- `README_START_HERE.md`
- `STATUS.md`
- `RESUME_STATE.md`
- `PROJECT_FILE_INDEX.md`
- پوشه `governance/`
- پوشه `evidence/`

اگر هرکدام نبود:

`STOP_BLOCKER: GOVERNANCE_ROOT_INCOMPLETE`

---

## 3. فایل‌هایی که نباید درهم ریخته شوند

| نوع فایل | محل صحیح | ممنوعیت |
|---|---|---|
| قانون اساسی | governance/ | قاطی با README معمولی نشود |
| وضعیت پروژه | root STATUS.md | در چت تنها نماند |
| نقطه ادامه | root RESUME_STATE.md | با حدس update نشود |
| evidence | evidence/ | داخل source code پخش نشود |
| packets | docs/packets/ | در message history گم نشود |
| decisions | docs/decisions/ | بدون ID تصمیم نهایی نشود |
| source | app/src/lib | governance داخل source قاطی نشود |

---

## 4. جایگذاری در Replit

در Replit، قبل از هر agent task:

1. ZIP governance را در root import کن.
2. فایل‌های root را verify کن.
3. اگر Replit خودش template ساخت، اول audit شود.
4. هیچ generated page پذیرفته نیست مگر با governance سازگار باشد.
5. هر خروجی Replit باید فایل report/evidence بسازد.

---

## 5. جایگذاری در ChatGPT Project

در ChatGPT Project Instructions باید نسخه کوتاه قرار گیرد:

- `COPY_TO_CHATGPT_PROJECT_INSTRUCTIONS_SHORT.txt`

در فایل‌های پروژه باید نسخه کامل باشد:

- governance folder
- STATUS
- RESUME
- Requirement Board

---

## 6. جایگذاری در GitHub یا backup

اگر GitHub ساخته شد:

- governance و docs باید commit شوند.
- `.env` و secretها هرگز commit نشوند.
- evidence حساس بدون secret مجاز است.
- هر batch باید commit کوچک و قابل rollback داشته باشد.
