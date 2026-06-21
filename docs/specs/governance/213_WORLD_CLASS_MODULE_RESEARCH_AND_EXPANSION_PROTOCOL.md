# MinaDent V1.16 — World-Class Module Research & Expansion Protocol

**Purpose:** هر ماژول قبل از اجرا باید از سطح «حدس AI» خارج شود و با تحقیق، checklist و تأیید مالک وارد کدنویسی شود.

---

## 1. قانون جستجو و تکمیل هر فاز

قبل از اجرای هر ماژول اصلی، AI Architect باید این کارها را انجام دهد:

1. سند مادر را بخواند.
2. requirementهای همان ماژول را استخراج کند.
3. اگر دانش ممکن است outdated باشد، از منابع رسمی و معتبر تحقیق کند.
4. قابلیت‌های جهانی و ایرانی را فهرست کند.
5. موارد اضافه پیشنهادی را به شکل tick-list به مالک بدهد.
6. مالک گزینه‌ها را تأیید/رد/تعویق کند.
7. فقط بعد از آن packet کدنویسی ساخته شود.

---

## 2. Template جستجوی هر ماژول

برای هر ماژول، این خروجی اجباری است:

```text
MODULE_NAME:
PHASE:
CURRENT_MASTER_REQUIREMENTS:
GLOBAL_BENCHMARK_FEATURES:
IRAN_CLINIC_REQUIREMENTS:
DENTAL_SPECIFIC_REQUIREMENTS:
DATA_MODEL_GAPS:
WORKFLOW_GAPS:
UI_PATTERN_OPTIONS:
RBAC/AUDIT/SYNC REQUIREMENTS:
PERFORMANCE RISKS:
USER_DECISION_TICKLIST:
ACCEPTED:
DEFERRED:
REJECTED:
NEXT_PACKET_SCOPE:
```

---

## 3. ماژول‌هایی که باید قبل از code deep-review شوند

- App Shell / Foundation
- Login/Auth/Role Shell
- Dashboard Command Center
- Smart Appointment Engine
- Persian Calendar
- Patient Master
- Patient Timeline / Journey
- Dental Chart / Treatment / Implant
- Finance / Cheque / Installment / Doctor Share
- Lab
- Inventory
- CRM / Communication / SMS
- Reports / BI / Doctor Productivity
- Backup / Sync / Health Center
- RBAC / Admin / Settings
- AI Assistant / Persian Command
- iPad/Web/PWA expansion

---

## 4. معیار «کامل بودن» ماژول

هیچ ماژول کامل نیست مگر همزمان این‌ها را داشته باشد:

- Screen/UI واقعی
- Domain model
- Local persistence
- Sync queue impact
- Server/RLS/migration plan
- RBAC guard
- Audit log
- State machine
- Empty/loading/error/offline states
- Test plan
- Runtime evidence
- Resume point

---

## 5. منابع مرجع رسمی که باید در research لحاظ شوند

- Expo / EAS / Development Builds برای مسیر mobile build/runtime
- React Native list/performance/accessibility برای 200k پرونده
- Apple Human Interface Guidelines برای iOS/iPad رفتار native
- Material Design 3 برای Android-native behavior
- OWASP MASVS / ASVS / API Security برای امنیت
- WCAG 2.2 برای accessibility
- HL7/FHIR Schedule/Slot/Appointment فقط به عنوان الهام مدل دامنه، نه full healthcare implementation unless approved

---

## 6. خروجی برای کاربر

AI نباید فقط بگوید «می‌سازم». باید قبل هر فاز به مالک بگوید:

```text
این قابلیت‌ها داخل سند هستند.
این قابلیت‌های جهانی/ایرانی هم می‌شود اضافه کرد.
این‌ها برای MVP لازم‌اند.
این‌ها برای آینده‌اند.
این‌ها ریسک دارند.
لطفاً فقط tick کن: اضافه شود / بعداً / رد شود.
```
