# MinaDent Screen Contracts & Interaction Map V1.2

## 1) Screen Contract Template
```text
SCREEN_ID:
SCREEN_NAME_FA:
MODULE:
PRIMARY_USER:
ROUTE:
ENTRY_POINTS:
DATA_REQUIRED:
ACTIONS:
FORBIDDEN_ACTIONS:
EMPTY_STATE:
LOADING_STATE:
ERROR_STATE:
OFFLINE_STATE:
RBAC_STATE:
AUDIT_STATE:
SYNC_STATE:
RTL_RULES:
BOTTOM_DOCK_RULES:
SHEET_RULES:
TEST_EVIDENCE:
```

## 2) Core Screens
| Screen | Contract Summary |
|---|---|
| Dashboard Command Center | live role-scoped command center, no fake KPI |
| Patient Search/List | indexed, virtualized, quick actions, no full load |
| Patient Profile | stage-aware, clinical/finance/lab/CRM tabs by role |
| Patient Journey Sheet | next action, owner, due, risk, transition evidence |
| Appointment Board | compact selector-based, doctor/unit/date/time/duration |
| Persian Calendar | month/week/day/year, dots, chips, day detail sheet |
| Treatment Chart | tooth/surface/history/treatment plan |
| Finance Ledger | payments/debt/installment/cheque manager-gated |
| Lab Board | lab status, due, receive/deliver, correction |
| CRM Follow-up | no-show/debt/recall/lead queues |
| Staff/RBAC | manager-only role and activation changes |
| Settings/Catalog | tariffs/types/units/templates editable with audit |
| Backup/Restore | progress, verify, no destructive restore without confirmation |
| AI Assistant | suggestion/action governance, no hidden tool execution |

## 3) Visual Quality Rules
- فارسی‌اول، RTL واقعی، فونت خوانا، density مناسب موبایل.
- طراحی premium مشابه حس اپ‌های بانکی مدرن؛ کپی برند/لوگو ممنوع.
- micro-interaction هدفمند؛ animation نباید performance را خراب کند.
- هر action یا واقعی است، یا disabled/blocked با علت صادقانه.
