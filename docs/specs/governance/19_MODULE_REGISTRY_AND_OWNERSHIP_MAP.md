# MinaDent Module Registry & Ownership Map V1.2

**Purpose:** هیچ بخش برنامه نباید مرده، جدا، بدون owner، بدون route، بدون data contract، بدون audit/sync یا بدون test ساخته شود.

## 1) Module Registry Template
برای هر ماژول باید این فیلدها پر شود:

```text
MODULE_ID:
MODULE_NAME_FA:
BUSINESS_OWNER_ROLE:
PRIMARY_USERS:
ROUTES:
SCREENS:
DOMAIN_ENTITIES:
SQLITE_TABLES:
SUPABASE_TABLES:
REPOSITORIES:
SERVICES:
STATE_MACHINE:
RBAC_RULES:
AUDIT_EVENTS:
SYNC_RULES:
OFFLINE_BEHAVIOR:
UI_STATES:
ERROR_CATALOG:
TESTS_REQUIRED:
EVIDENCE_REQUIRED:
FORBIDDEN_SHORTCUTS:
FUTURE_EXTENSION_SLOTS:
```

## 2) Registry رسمی MinaDent
| ID | Module | Owner | اتصال اجباری |
|---|---|---|---|
| MOD-CLINIC | تنظیمات کلینیک | Manager | Staff, Calendar, Finance, Backup |
| MOD-STAFF | پزشک/منشی/دستیار | Manager | RBAC, Scheduling, Audit |
| MOD-PATIENT | بیماران | Secretary/Doctor/Manager | Journey, Scheduling, Finance, Clinical |
| MOD-JOURNEY | خط روند بیمار | System/Manager | همه ماژول‌ها |
| MOD-SCHED | نوبت‌دهی هوشمند | Secretary/Manager | Patients, Doctors, Units, Calendar, CRM |
| MOD-CALENDAR | تقویم شمسی هوشمند | Secretary/Manager | Scheduling, Finance, Lab, Recall |
| MOD-CLINICAL | درمان/معاینه | Doctor | Dental Chart, Treatment Plan, Finance |
| MOD-DENTAL-CHART | چارت دندان | Doctor | Clinical, Imaging, Consent |
| MOD-IMPLANT | ایمپلنت | Doctor/Manager | Treatment, Lab, Finance, Consent |
| MOD-FINANCE | مالی | Manager | Patients, Treatments, Doctor Share |
| MOD-DEBT | بدهی/قسط/چک | Manager/Secretary-limited | Calendar, Alerts, Patient Journey |
| MOD-LAB | لابراتوار | Secretary/Doctor | Treatments, Delivery, Finance |
| MOD-INVENTORY | انبار/تجهیزات | Manager/Assistant | Treatments, Lab, Alerts |
| MOD-FILES | تصاویر/RVG/OPG/فایل | Doctor/Secretary | Patients, Clinical, Consent |
| MOD-CRM | CRM/پیگیری | Secretary/Manager | Journey, SMS, Recall, Leads |
| MOD-COMMS | SMS/WhatsApp/Call | Secretary/Manager | Patient, Scheduling, CRM, Audit |
| MOD-ONLINE | نوبت‌دهی آنلاین | Public/Patient | Scheduling, Auth, Anti-abuse |
| MOD-DASHBOARD | داشبورد فرماندهی | Manager/Staff role-scoped | همه ماژول‌ها |
| MOD-REPORTS | گزارش/KPI | Manager | Finance, Scheduling, Staff, Clinical |
| MOD-AI | AI Assistant | Role-scoped | Command Governance, Audit, MCP |
| MOD-RBAC | سطح دسترسی | Manager/System | همه ماژول‌ها |
| MOD-AUDIT | ممیزی | System | همه تغییرات حساس |
| MOD-SYNC | Sync/Offline | System | SQLite/Supabase/Queue |
| MOD-BACKUP | Backup/Restore | Manager/System | DB, Files, Release |
| MOD-SETTINGS | Catalog/Settings | Manager | همه ماژول‌ها |

## 3) قانون مالکیت
- هر ماژول باید owner عملیاتی و owner فنی داشته باشد.
- هر action حساس باید actor، timestamp، old_value/new_value، reason و device/session داشته باشد.
- دکمه بدون handler واقعی یا disabled/blocked صادقانه ممنوع است.

## 4) برتری نسبت به رقبا
MinaDent باید علاوه بر قابلیت‌های رایج نرم‌افزارهای جهانی/ایرانی، یک لایه عملیاتی اضافه داشته باشد: **Patient Journey Engine + AI Action Governance + Offline-first + Audit-by-design + RTL/Persian-first + Manager Control Center**.
