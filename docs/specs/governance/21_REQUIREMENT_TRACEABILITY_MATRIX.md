# MinaDent Requirement Traceability Matrix V1.2

**Purpose:** هر حرف، قابلیت، قاعده و ممنوعیت باید ID داشته باشد تا فراموش، تکراری یا ضدونقیض نشود.

## 1) RTM Template
```text
REQ_ID:
TITLE:
SOURCE:
SOURCE_DATE:
MODULE:
PHASE:
PRIORITY:
BUSINESS_RULES:
DATA_FIELDS:
UI_REQUIREMENTS:
RBAC_REQUIREMENTS:
AUDIT_REQUIREMENTS:
SYNC_OFFLINE_REQUIREMENTS:
TEST_REQUIREMENTS:
EVIDENCE_REQUIRED:
STATUS: PROPOSED|APPROVED|IMPLEMENTED|VERIFIED|REJECTED|SUPERSEDED
```

## 2) Seed Requirements
| REQ_ID | Title | Module | Phase | Status |
|---|---|---|---|---|
| REQ-GOV-001 | No implementation without governance | GOV | 0 | APPROVED |
| REQ-UI-001 | Persian-first RTL premium banking-grade UX | UI | 2 | APPROVED |
| REQ-DATA-001 | Offline-first SQLite with sync queue | Sync | 3 | APPROVED |
| REQ-PAT-001 | Patient file with mobile/file/national code search | Patient | 5 | APPROVED |
| REQ-SCHED-001 | Appointment requires doctor/unit/date/time/duration | Scheduling | 6 | APPROVED |
| REQ-SCHED-002 | Free-slot suggestion + overlap warning | Scheduling | 6 | APPROVED |
| REQ-JOURNEY-001 | Every patient has current stage/owner/next action | Journey | 7 | APPROVED |
| REQ-CLIN-001 | Dental chart with tooth/surface/treatment history | Clinical | 8 | APPROVED |
| REQ-IMPLANT-001 | Implant workflow includes fixture/abutment/lab/finance separation | Implant | 8/9/10 | APPROVED |
| REQ-FIN-001 | Doctor share rule: configurable, default Mina rule supported | Finance | 9 | APPROVED |
| REQ-LAB-001 | Lab order lifecycle and delivery due alerts | Lab | 10 | APPROVED |
| REQ-CRM-001 | No-show/debt/recall follow-up engine | CRM | 11 | APPROVED |
| REQ-AI-001 | AI assistant role-scoped and audit-first | AI | 13 | APPROVED |
| REQ-SEC-001 | Manager-only sensitive financial/permission changes | RBAC | 4+ | APPROVED |
| REQ-PERF-001 | 200k+ patient design with indexed search | Performance | all | APPROVED |

## 3) Update Rule
هر نیاز جدید ابتدا در RTM ثبت می‌شود. اگر مشابه قبلی است، supersede/merge می‌شود؛ فایل موازی جدید ممنوع مگر موضوع واقعاً جدید باشد.
