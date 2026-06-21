# MinaDent Prompt & Instruction Layering Guide V1.1

**Status:** GOVERNANCE_ADDENDUM / NO_CODE
**Date:** 2026-06-21
**Purpose:** دسته‌بندی دقیق پرامپت‌ها و دستورها برای جلوگیری از دوباره‌کاری و خروج AI از مسیر.

---

## 1. ترتیب قدرت دستورها

1. Safety / platform rules
2. User explicit instruction در همان لحظه
3. Project Instructions
4. MinaDent Governance Files
5. STATUS/RESUME/Evidence
6. Executor packet
7. Chat context
8. حدس یا حافظه عمومی

اگر دستور پایین‌تر با دستور بالاتر conflict داشت، دستور پایین‌تر باطل است.

---

## 2. انواع پرامپت لازم

### A. Account-Level Behavior Prompt
برای رفتار دائمی دستیار. کوتاه، سختگیر، غیرقابل‌تفسیر.

محل: ChatGPT Custom Instructions / Memory preference

محتوا:
- فارسی، evidence-first
- no fake/no mock/no patchwork
- قبل از اجرا: STATUS/RESUME/evidence
- بدون اجازه: build/package/schema/connector ممنوع

### B. Project-Level Instructions
برای پروژه MinaDent. طولانی‌تر و دقیق‌تر.

محل: ChatGPT Project Instructions

محتوا:
- source of truth فایل‌های پروژه است
- هر پاسخ اجرایی باید status, blocker, allowed/forbidden, next step داشته باشد
- UI بعد از domain/workflow
- هر requirement جدید باید وارد board شود

### C. Replit Agent System Prompt
برای قفل‌کردن Replit به عنوان executor محدود.

محل: ابتدای هر Replit session یا فایل `COPY_TO_REPLIT_AGENT_SYSTEM_PROMPT.txt`

محتوا:
- قبل از هر تغییر فایل‌های governance را بخوان
- بدون manifest و evidence خروجی نامعتبر است
- forbidden files را لمس نکن
- build نزن مگر مجاز شده باشد
- اگر اطلاعات کم است STOP_BLOCKER بده

### D. Batch Execution Packet
برای هر کار کوچک و مشخص.

محل: فایل جدا در `docs/packets/` یا پیام به Replit

ساختار اجباری:
- Batch ID
- Target requirement IDs
- Current status
- Allowed files
- Forbidden files
- Exact task
- Gates
- Evidence required
- Rollback plan
- Resume update required

### E. Review/Audit Prompt
برای بررسی خروجی بدون تغییر کد.

محل: قبل از overlay/build/merge

ساختار:
- Read-only فقط
- لیست فایل‌های تغییرکرده
- compare با governance
- نتیجه: PASS / FAIL / STOP_BLOCKER

### F. Update/Merge Prompt
برای اضافه‌شدن قانون یا قابلیت جدید.

محل: `09_CHANGE_CONTROL_AND_UPDATE_PROTOCOL.md`

ساختار:
- New requirement
- Affected files
- Decision
- Version bump
- Evidence needed

---

## 3. قالب پرامپت اصلی برای هر AI Executor

```text
You are an executor, not the architect.
Before any change, read the MinaDent governance files in root.
If STATUS.md, RESUME_STATE.md, Requirement Board, or the relevant contract is missing or contradictory, stop with STOP_BLOCKER.
Do not create demo, mock, fake, random UI, disconnected buttons, or isolated pages.
Do not change package/dependencies/schema/routes/native/build/connectors unless explicitly allowed in the batch.
Return manifest, changed files, forbidden files check, gates, evidence, known limits, and updated resume point.
```

---

## 4. قالب پاسخ اجرایی ChatGPT برای MinaDent

هر پاسخ اجرایی باید این بخش‌ها را داشته باشد:

```text
REAL STATUS:
EVIDENCE READ:
BLOCKERS:
ALLOWED NOW:
FORBIDDEN NOW:
ACTION / PACKET:
GATES REQUIRED:
UNVERIFIED ITEMS:
NEXT STEP:
RESUME POINT:
```

اگر evidence کافی نیست، پاسخ باید با STOP_BLOCKER تمام شود.

---

## 5. ممنوعیت پرامپتی

- «خودت درستش کن» بدون scope مجاز نیست.
- «همه چیز را بساز» بدون batch مجاز نیست.
- «ظاهرش را قشنگ کن» بدون design contract مجاز نیست.
- «build بگیر» بدون gate مجاز نیست.
- «connector وصل کن» بدون MCP policy مجاز نیست.
- «فعلاً mock کن» برای مسیرهای core ممنوع است.
- «بعداً وصل می‌کنیم» برای دکمه/action اصلی ممنوع است.
