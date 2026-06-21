# 184 — Dashboard Command Center Requirement Import

Status: CANONICAL_DASHBOARD_REQUIREMENT_IMPORT  
Source class: dashboard design target + command center blueprint  
Direct implementation: FORBIDDEN until Phase packet

## Canonical definition

MinaDent Dashboard is not a statistics page. It is the **Ultra Enterprise Smart Dental Clinic Command Center**.

It must answer in seconds:
- امروز کلینیک چه وضعی دارد؟
- چه بیمارهایی در کلینیک هستند؟
- چه نوبت‌هایی دیر شده یا no-show شده‌اند؟
- کدام یونیت آزاد/اشغال/خراب است؟
- کدام پزشک آزاد/درگیر/دارای تأخیر است؟
- چه بدهی، چک، قسط، تخفیف یا مالی ناقص وجود دارد؟
- کدام درمان، عکس، رضایت‌نامه، لابراتوار یا follow-up ناقص است؟
- sync، backup، امنیت و configuration چه وضعی دارند؟
- قدم بعدی هر نقش چیست؟

## Dashboard sections to preserve

1. Clinic Live Command Center
2. Smart System Health Bar
3. Smart Search & Persian Command
4. Today Scheduling Board
5. Doctor & Unit Live Cockpit
6. Patient Journey Monitor
7. Patient Quick Cards
8. Dental Chart & Treatment Intelligence
9. Imaging/RVG/PSP/Files Monitor
10. Finance & Revenue Dashboard
11. Debt/Checks/Installments Collection Center
12. Insurance & Tariff Dashboard
13. Laboratory Workflow Dashboard
14. CRM/Patient Communication/Growth Dashboard
15. Online Booking & Lead Intake
16. Inventory/Materials/Equipment Dashboard
17. Reports/KPI/Scorecards
18. Alert/Escalation Engine
19. Task/Owner Assignment
20. Notification Center
21. RBAC/Security/Audit Dashboard
22. Backup/Restore/Disaster Readiness Dashboard
23. Sync/Offline Operations Dashboard
24. Settings/Catalog Management Dashboard

## Required behavior for every item

Every card, number, chip, badge, alert, search result, and action must be exactly one of:

| State | Meaning |
|---|---|
| DATA_BACKED | real selector/store/source exists |
| CONTRACT_BACKED | not implemented but explicit contract route/hook/test exists |
| HONEST_DISABLED | disabled with Persian explanation |
| BLOCKER_BACKED | blocked with reason/evidence/next action |

## Permanent forbidden dashboard patterns

- Fake count
- Mock patient/finance/sync
- Dead action
- Card without route/hook
- AI command without preview/permission/audit
- Dashboard KPI without source selector
- Green sync/backup/financial badge without confirmation
- Old UI trace
- Heavy scrolling stats page
- CTA duplication
- Internal English labels in visible UI

## Role dashboards

Dashboard must support:
- Manager
- Reception/Secretary
- Doctor
- Assistant
- Finance/Accountant
- Lab
- CRM/Marketing
- Admin/System

Each role view must be RBAC filtered and must not expose sensitive financial/medical/security data beyond role permission.

## Done gate

Dashboard is not acceptable until:
- real route/contracts exist for all actions
- empty/loading/error/offline/sync states exist
- every visible number has selector or honest contract
- patient journey is connected
- finance/lab/scheduling/patient links are traceable
- performance plan for large patient count exists
- phone runtime visual evidence is collected
- no fake data exists
