# MinaDent Zero Rebuild — Roadmap & Phase Gate Master V1.2

**Version:** V1.2  
**Date:** 2026-06-21  
**Status:** GOVERNANCE-LOCKED / IMPLEMENTATION-NOT-STARTED  
**Rule:** هیچ فاز اجرایی بدون Gate قبلی، Evidence، STATUS/RESUME و اجازه مرحله‌ای شروع نمی‌شود.

## 1) اصل کنترل فاز
MinaDent از صفر باید مثل یک محصول Enterprise ساخته شود، نه با صفحه‌سازی پراکنده. هر فاز فقط وقتی مجاز است که:

- ورودی‌های فاز قبلی PASS شده باشند.
- فایل‌های مجاز و ممنوع مشخص باشند.
- Requirement ID، Data Contract، UI Contract، Test Plan و Evidence Plan وجود داشته باشد.
- خروجی قابل ممیزی باشد.
- اگر خروجی source/docs/config تغییر می‌دهد، overlay ZIP با manifest/hash داشته باشد.

## 2) Phase Map رسمی
| Phase | نام | هدف | کد مجاز؟ | شرط ورود | شرط خروج |
|---|---|---|---|---|---|
| 0A | Governance Pack | قانون، scope، ممنوعیت، source of truth | No | درخواست مالک | Pack + Manifest |
| 0B | Input Package Audit | بررسی جایگذاری فایل‌ها در پروژه جدید | No | ZIP در root | Audit PASS/STOP |
| 0C | Governance Completion | تکمیل roadmap/module/state/test/security/release | No | V1.1 موجود | V1.2 Pack |
| 1 | Repo Init Clean | ساخت repo تمیز، Expo/TS، Git، env guard | Limited | 0C PASS | expo-doctor/tsc PASS |
| 2 | Production App Shell | RTL shell، navigation، tokens، layout، role shell | Yes | Phase 1 PASS | runtime shell evidence |
| 3 | Local Data Foundation | SQLite migrations، repository، offline queue | Yes | Phase 2 PASS | local DB evidence |
| 4 | Auth/RBAC/Clinic | login، roles، clinic isolation، staff | Yes | Phase 3 PASS | role evidence |
| 5 | Patient Master | پرونده بیمار، جستجو، duplicate، relationships | Yes | Phase 4 PASS | patient evidence |
| 6 | Smart Scheduling | نوبت‌دهی، تقویم، یونیت/پزشک، conflict | Yes | Phase 5 PASS | scheduling evidence |
| 7 | Patient Journey Engine | خط روند stage-aware، owner/due/risk/action | Yes | Phase 6 PASS | journey evidence |
| 8 | Clinical/Dental Chart | چارت دندان، طرح درمان، درمان انجام‌شده | Yes | Phase 7 PASS | clinical evidence |
| 9 | Finance | پرداخت، بدهی، قسط، چک، سهم پزشک | Yes | Phase 8 PASS | finance evidence |
| 10 | Lab/Inventory/Files | لابراتوار، کالا، RVG/OPG/file hooks | Yes | Phase 9 PASS | lab/inventory evidence |
| 11 | CRM/Comms | SMS، WhatsApp، recall، lead، birthday | Yes | Phase 10 PASS | comms evidence |
| 12 | Dashboard/Reports | command center زنده، KPI، alerts، reports | Yes | Phase 11 PASS | dashboard evidence |
| 13 | AI Assistant/MCP | AI action، tool policy، MCP guardrails | Yes | Phase 12 PASS + Security Gate | AI safety evidence |
| 14 | Hardening | security، backup/restore، conflict، scale | Yes | Phase 13 PASS | hardening evidence |
| 15 | Build/Release | Android/iOS/Web release، update، rollback | Yes | all gates PASS | release evidence |
| 16 | Operations | monitoring، support runbook، maintenance | Yes | release candidate | operational readiness |

## 3) Gate Template اجباری برای هر فاز
هر Phase Packet باید دقیقاً این ساختار را داشته باشد:

```text
PHASE_ID:
OBJECTIVE:
SOURCE_OF_TRUTH_FILES_READ:
CURRENT_RESUME_POINT:
BLOCKERS_OPEN:
ALLOWED_FILES:
FORBIDDEN_FILES:
DATA_CONTRACT_REQUIRED:
UI_CONTRACT_REQUIRED:
RBAC_AUDIT_SYNC_IMPACT:
SECURITY_PRIVACY_IMPACT:
TEST_PLAN:
EVIDENCE_PLAN:
ROLLBACK_PLAN:
COST_BUILD_JUSTIFICATION:
EXPECTED_OUTPUT:
STOP_CONDITIONS:
```

## 4) Build ممنوع تا زمان مناسب
Build فقط وقتی مجاز است که خروجی قابل مشاهده/تست واقعی باشد. Build برای حدس، UI ناقص، schema-only بدون runtime path، یا صرفاً «ببینیم چه شد» ممنوع است.

## 5) Resume Point فعلی
`PHASE_0C_GOVERNANCE_COMPLETION_V1_2_CREATED__AWAITING_PHASE_0B_PROJECT_PLACEMENT_AUDIT`
