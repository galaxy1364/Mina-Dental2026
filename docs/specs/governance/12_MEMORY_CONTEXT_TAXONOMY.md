# MinaDent Memory & Context Taxonomy V1.1

**Status:** GOVERNANCE_ADDENDUM / NO_CODE
**Date:** 2026-06-21
**Scope:** دسته‌بندی حافظه، context، source of truth، و محل ذخیره هر نوع اطلاعات برای شروع صفر MinaDent.

---

## 1. اصل حاکم

چت، حافظه، پرامپت و ابزارها «منبع حقیقت قطعی» نیستند. منبع حقیقت عملیاتی فقط این‌ها هستند:

1. فایل‌های governance داخل root پروژه
2. `STATUS.md`
3. `RESUME_STATE.md`
4. `REQUIREMENT_CONTROL_BOARD.md`
5. `EVIDENCE_LEDGER.md` یا evidence folder
6. فایل‌های source واقعی پروژه پس از اجرای batchهای مجاز
7. خروجی تست‌های واقعی و قابل تکرار

هر چیزی که فقط در چت گفته شده ولی داخل فایل‌های پروژه ثبت نشده باشد، برای اجرا کافی نیست.

---

## 2. لایه‌های حافظه و context

| لایه | محل | کاربرد | اعتبار برای اجرا |
|---|---|---|---|
| Account Memory | حافظه ChatGPT | ترجیح‌ها، قوانین دائمی، حساسیت‌ها | کمکی، نه قطعی |
| Project Instructions | تنظیمات پروژه ChatGPT | رفتار ثابت دستیار در پروژه | قوی، ولی بدون evidence کافی نیست |
| Governance Files | root پروژه / docs/governance | قانون اساسی و contract اجرایی | منبع حقیقت اصلی |
| STATUS/RESUME | root پروژه | وضعیت واقعی و نقطه ادامه | اجباری برای هر batch |
| Evidence Ledger | evidence/ یا docs/evidence | اثبات انجام کار | شرط ادعای تکمیل |
| Source Code | app/src/lib/... | پیاده‌سازی واقعی | فقط بعد از تست و evidence |
| External Tools | Replit/v0/Codex/MCP | executor محدود | بدون اجازه governance نامعتبر |

---

## 3. چه چیزی کجا ذخیره شود؟

### 3.1 قوانین دائمی و ممنوعیت‌ها
- فایل اصلی: `00_MINADENT_CONSTITUTION.md`
- کپی کوتاه: `COPY_TO_CHATGPT_PROJECT_INSTRUCTIONS_SHORT.txt`
- برای Replit: `COPY_TO_REPLIT_AGENT_SYSTEM_PROMPT.txt`

### 3.2 قابلیت‌ها و scope محصول
- فایل اصلی: `01_MASTER_PRODUCT_BLUEPRINT.md`
- کنترل وضعیت: `02_REQUIREMENT_CONTROL_BOARD.md`
- اگر قابلیت جدید اضافه شد: اول Requirement ID، بعد dependency، بعد status.

### 3.3 معماری و فاندیشن
- فایل اصلی: `03_FOUNDATION_ARCHITECTURE.md`
- هر تغییر route/schema/sync/auth باید با همین فایل سازگار باشد.

### 3.4 طراحی، UI و یکپارچگی ظاهری
- فایل اصلی: `04_DESIGN_SYSTEM_CONTRACT.md`
- هیچ صفحه‌ای مجاز نیست style، spacing، typography یا navigation مستقل بسازد.

### 3.5 دیتابیس، sync، backup
- فایل اصلی: `05_DATA_SYNC_BACKUP_CONTRACT.md`
- هر schema/migration/sync change قبل از اجرا باید plan و rollback داشته باشد.

### 3.6 امنیت، نقش‌ها، audit
- فایل اصلی: `06_SECURITY_RBAC_AUDIT_CONTRACT.md`
- Manager/Doctor/Secretary/Assistant باید با permission واقعی کنترل شوند.

### 3.7 MCP و connectorها
- فایل اصلی: `07_CONNECTOR_MCP_POLICY.md`
- اتصال آزاد ممنوع است؛ فقط allowlist، audit، least privilege.

### 3.8 نحوه کار AI/Executor
- فایل اصلی: `08_AI_EXECUTOR_PROTOCOL.md`
- هر خروجی AI باید manifest، changed files، forbidden files، gates و evidence بدهد.

### 3.9 آپدیت و جلوگیری از خرابکاری
- فایل اصلی: `09_CHANGE_CONTROL_AND_UPDATE_PROTOCOL.md`
- update یعنی merge کنترل‌شده، نه overwrite و نه rewrite کور.

---

## 4. دسته‌بندی contextهای ضروری MinaDent

| دسته | نمونه | محل ثبت | قبل از اجرا چه باید شود؟ |
|---|---|---|---|
| Clinic Facts | پزشک‌ها، یونیت‌ها، ساعات، نقش‌ها | Blueprint + Requirement Board | user-confirmed و versioned |
| Domain Rules | نوبت، بیمار، درمان، مالی، لابراتوار | Blueprint + Data Contract | entity/state تعریف شود |
| Workflow Rules | خط روند بیمار | Foundation Architecture | state machine تعریف شود |
| UI Rules | RTL، داک، چیپ، شیت، کارت | Design Contract | component contract تعریف شود |
| Security Rules | دسترسی مدیر/پزشک/منشی | RBAC Contract | permission matrix تعریف شود |
| Sync Rules | offline queue، conflict، backup | Data Sync Contract | test plan نوشته شود |
| AI Rules | فرمان هوشمند، assistant | AI Protocol + MCP Policy | read-only اول، action بعد از approval |
| Evidence Rules | gateها و runtime proof | Evidence Ledger | بدون evidence ادعای done ممنوع |

---

## 5. قانون resume

قبل از هر پاسخ اجرایی باید این پنج مورد خوانده یا به‌روزرسانی شود:

1. `STATUS.md`
2. `RESUME_STATE.md`
3. `02_REQUIREMENT_CONTROL_BOARD.md`
4. آخرین evidence مرتبط
5. فایل contract مربوط به همان حوزه

اگر هرکدام وجود ندارد یا متناقض است:

`STOP_BLOCKER: GOVERNANCE_CONTEXT_INCOMPLETE`

---

## 6. ممنوعیت حافظه‌ای

- اتکا به «یادم هست» برای ساخت کد ممنوع است.
- اتکا به screenshot بدون فایل/evidence ممنوع است.
- قاطی‌کردن پروژه قدیمی و پروژه جدید ممنوع است.
- استفاده از وضعیت Replit قدیمی بعد از delete شدن پروژه ممنوع است.
- هر requirement جدید باید وارد board شود، نه اینکه فقط در چت بماند.
