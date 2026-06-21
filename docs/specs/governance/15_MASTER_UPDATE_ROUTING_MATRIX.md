# MinaDent Master Update Routing Matrix V1.1

**Status:** GOVERNANCE_ADDENDUM / NO_CODE
**Date:** 2026-06-21
**Purpose:** هر تغییر جدید باید بداند کدام فایل‌ها را آپدیت می‌کند تا سندها خراب یا موازی نشوند.

---

## 1. قانون اصلی update

هیچ requirement، قانون، تصمیم یا تغییر جدید نباید فقط در چت بماند. هر تغییر باید به فایل مادر مربوطه route شود.

اگر مشخص نیست کجا باید ثبت شود:

`STOP_BLOCKER: UPDATE_ROUTING_UNKNOWN`

---

## 2. ماتریس مسیر آپدیت

| نوع تغییر | فایل اصلی که باید آپدیت شود | فایل‌های وابسته | نیاز به evidence؟ |
|---|---|---|---|
| قانون ممنوعیت جدید | `00_MINADENT_CONSTITUTION.md` | AI Protocol, STOP Rulebook | بله |
| قابلیت جدید محصول | `01_MASTER_PRODUCT_BLUEPRINT.md` | Requirement Board | بله |
| تغییر وضعیت capability | `02_REQUIREMENT_CONTROL_BOARD.md` | STATUS/RESUME | بله |
| تغییر معماری route/nav/domain | `03_FOUNDATION_ARCHITECTURE.md` | Data Contract, Design Contract | بله |
| تغییر UI/design | `04_DESIGN_SYSTEM_CONTRACT.md` | Requirement Board | screenshot/runtime بعداً |
| تغییر DB/schema/sync | `05_DATA_SYNC_BACKUP_CONTRACT.md` | Security, Evidence, rollback | بله، سختگیرانه |
| تغییر role/permission | `06_SECURITY_RBAC_AUDIT_CONTRACT.md` | Data Contract, Requirement Board | بله |
| تغییر connector/MCP | `07_CONNECTOR_MCP_POLICY.md` | Security, Evidence | بله، با threat review |
| تغییر روش کار AI/Replit | `08_AI_EXECUTOR_PROTOCOL.md` | Replit prompt, Constitution | بله |
| تغییر process/update | `09_CHANGE_CONTROL_AND_UPDATE_PROTOCOL.md` | Status/Resume | بله |
| گزارش تست | `10_EVIDENCE_LEDGER_TEMPLATE.md` یا evidence/ | STATUS/RESUME | بله |
| شروع batch جدید | `docs/packets/BATCH_ID.md` | Requirement Board | بله |
| پایان batch | evidence + STATUS + RESUME | Requirement Board | بله |

---

## 3. وضعیت‌های مجاز requirement

```text
NOT_STARTED
PLANNED
BLOCKED
SOURCE_GATED
LOCAL_GATED
RUNTIME_VERIFIED
REMOTE_VERIFIED
RELEASE_READY
DEFERRED
REJECTED
STOP_BLOCKER
```

هیچ requirement با عبارت مبهم «تقریباً آماده»، «خوب شد»، «فکر کنم»، «احتمالاً پاس» مجاز نیست.

---

## 4. قانون عدم خرابکاری سندها

- فایل مادر overwrite کور نمی‌شود.
- update باید section مشخص و version note داشته باشد.
- requirement حذف نمی‌شود؛ اگر حذف شد، status=`REJECTED` با دلیل ثبت می‌شود.
- فایل موازی ساخته نمی‌شود مگر addendum با version و routing مشخص باشد.
- یک قابلیت در دو فایل با دو تعریف متفاوت ممنوع است.

---

## 5. قالب ثبت تغییر جدید

```text
CHANGE_ID:
DATE:
SOURCE:
REQUEST:
AFFECTED_REQUIREMENTS:
AFFECTED_FILES:
DECISION:
STATUS:
EVIDENCE_REQUIRED:
BLOCKERS:
RESUME_POINT:
```
