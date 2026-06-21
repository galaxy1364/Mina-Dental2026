# MinaDent Constitution — قانون اساسی غیرقابل تخطی

نسخه: V1.0.0  
تاریخ: 2026-06-21  
مالک محصول: کلینیک دندانپزشکی مینا مازندرانی  
هدف: ساخت سیستم مدیریت کلینیک دندانپزشکی فوق تخصصی، Enterprise، فارسی‌اول، Offline-first، قابل نصب روی Android/iOS و قابل توسعه برای Web.

---

## 1. هویت محصول

MinaDent فقط یک اپ نوبت‌دهی یا دفترچه بیمار نیست. MinaDent باید یک Dental Operating System باشد:

- Patient Master
- Smart Scheduling
- Persian Calendar
- Doctor/Unit Capacity
- Treatment Workflow
- Dental Chart
- Finance Ledger
- Doctor Share
- Lab Orders
- Inventory
- Cheques
- Installments
- CRM/Communication
- Notifications
- Backup/Restore
- Audit Trail
- AI Assistant
- Offline-first Sync
- Cloud-ready Architecture
- Multi-doctor / Multi-clinic ready

## 2. قوانین منبع حقیقت

منبع حقیقت به ترتیب:

1. فایل‌های governance همین بسته
2. `STATUS.md`
3. `RESUME_STATE.md`
4. `02_REQUIREMENT_CONTROL_BOARD.md`
5. evidence واقعی
6. کد واقعی پروژه
7. گزارش ابزار فقط در صورت داشتن evidence

چت، حافظه شفاهی، ادعای AI، preview زیبا، و screenshot بدون مسیر source، منبع حقیقت قطعی نیستند.

## 3. ممنوعیت‌های مطلق

موارد زیر ممنوع است:

- ساخت UI نقاشی بدون اتصال واقعی
- ساخت feature بدون workflow و data contract
- mock/fake/demo persistence
- hardcoded کردن پزشک، یونیت، تعرفه، وضعیت‌ها، مسیرها یا نقش‌ها
- service_role یا secret در client
- تغییر package/dependency/native/config بدون اجازه مرحله‌ای
- تغییر schema/database بدون migration و rollback
- build گرفتن بدون local gates
- ادعای کامل بودن بدون evidence
- حذف فایل یا route قبلی بدون impact audit
- اتصال AI/MCP/Connector بدون policy و allowlist
- مخفی کردن failure
- patch شانسی
- workaround بدون ریشه‌یابی
- قاطی‌کردن پروژه‌ها
- ساخت صفحه با style جدا از Design System
- دکمه بی‌عملکرد
- route مرده
- فایل مرده
- requirement بدون ID
- تغییرات بزرگ بدون micro-batch
- اجرای Replit به‌عنوان معمار
- اجرای v0 به‌عنوان منبع حقیقت محصول

## 4. تعریف Foundation

Foundation یعنی Production App Shell و reusable framework واقعی، نه UI تزئینی.

Foundation باید شامل این لایه‌ها باشد:

- App identity
- Routing contract
- RTL/Persian contract
- Design tokens
- Navigation shell
- Auth/Role shell
- Offline storage shell
- Sync queue shell
- Audit shell
- Error/loading/empty/success states
- Form foundation
- List foundation
- Sheet/fullscreen detail foundation
- Permission guard
- Requirement trace guard
- Evidence gate

## 5. اصل فارسی‌اول

تمام متن‌های visible باید فارسی باشد.  
تمام layoutها باید RTL باشند.  
تقویم باید شمسی/Jalali باشد.  
فرمت موبایل ایران باید معتبر باشد.  
روز جمعه و تعطیلات رسمی ایران باید قابل نمایش/مدیریت باشد.

## 6. اصل Offline-first

اپ باید بدون اینترنت کار کند:

- ایجاد بیمار
- ایجاد نوبت
- ثبت درمان
- ثبت پرداخت
- مشاهده اطلاعات محلی
- queue کردن sync
- audit محلی
- backup محلی

Sync با cloud باید queue-based، قابل retry، قابل audit و conflict-aware باشد.

## 7. اصل Evidence-first

هر ادعا باید evidence داشته باشد:

- Source evidence
- Test evidence
- Runtime evidence
- Data evidence
- Screenshot/video فقط همراه با مسیر نسخه
- Checksum/manifest برای overlay/zip
- Status و resume update

بدون evidence، وضعیت رسمی:

`IMPLEMENTED_NOT_VERIFIED`

یا:

`STOP_BLOCKER_EVIDENCE_REQUIRED`

## 8. اصل Phase-Gated

هیچ مرحله‌ای وارد مرحله بعد نمی‌شود مگر gate قبلی PASS باشد.

وضعیت‌های معتبر:

- `NOT_STARTED`
- `PLANNED`
- `SOURCE_GATED`
- `LOCAL_GATES_PASS`
- `RUNTIME_VERIFIED`
- `PARTIAL`
- `BLOCKED`
- `STOP_BLOCKER`
- `DEPRECATED`
- `ARCHIVED`

## 9. قانون Replit

Replit فقط Executor است، نه Architect.

Replit فقط batch مشخص را اجرا می‌کند.  
Replit حق اضافه کردن feature تصادفی ندارد.  
Replit باید فایل‌های تغییرکرده، manifest، checksum، evidence و zip بدهد.  
اگر source تغییر دهد ولی overlay ZIP ندهد، خروجی معتبر نیست:

`INVALID_OUTPUT_NEEDS_OVERLAY_ZIP`

## 10. قانون ChatGPT

ChatGPT Architect/QA/Code Planner است.  
ChatGPT نباید بدون evidence ادعا کند.  
ChatGPT نباید مستقیم build/schema/dependency/package/native پیشنهاد دهد مگر با دلیل و اجازه مرحله‌ای.  
ChatGPT باید همیشه وضعیت واقعی، blocker، forbidden، next step و resume point را اعلام کند.

## 11. قانون تغییر

هیچ نیازمندی قبلی پاک نمی‌شود. تغییر فقط به شکل versioned amendment انجام می‌شود.

هر update باید در این فایل‌ها merge شود:

- `02_REQUIREMENT_CONTROL_BOARD.md`
- `STATUS.md`
- `RESUME_STATE.md`
- `10_EVIDENCE_LEDGER_TEMPLATE.md`
- در صورت نیاز: Blueprint/Architecture/Design/Data/Security/Connector

## 12. اصل No Regression

هیچ اصلاحی نباید قابلیت قبلی را خراب کند.  
هر تغییر باید impact audit داشته باشد.  
اگر impact معلوم نیست:

`STOP_BLOCKER_IMPACT_UNKNOWN`

## 13. اصل محصول نهایی

MinaDent باید در سطح جهانی و ایرانی، قابل تست، قابل ممیزی، قابل نگهداری، قابل توسعه، سریع، امن، زیبا و واقعی باشد.
