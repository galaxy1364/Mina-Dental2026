# 124 — Developer-Grade SDLC Stage Gate Merge
Version: V1.8
Status: LOCKED

## هدف
V16 یک فازبندی P0 تا P27 معرفی می‌کند. بسته MinaDent Zero تا V1.7 هم roadmap فنی/محصولی و foundation-first دارد. V1.8 این دو را merge می‌کند بدون ایجاد roadmap تکراری.

## نقشه canonical
| V16 Phase | Merge into MinaDent Canonical Stage | Notes |
|---|---|---|
| P0 Read-only Source Reality Audit | Phase 0H/0K Read-only Placement + Source Audit | no file changes |
| P1 Project Identity Freeze | Identity Guard + SDK54 Guard | package/slug/projectId/path |
| P2 Requirement Intake | Requirement Traceability Matrix | REQ-ID mandatory |
| P3 Owner Data Register | V1.7 Real Clinic Data | source of truth |
| P4 Domain Model | Data Model Completeness Before Schema | schema still forbidden |
| P5 Architecture/ADR | ADR Pack | every sensitive decision |
| P6 Library Admission | Dependency Admission Gate | license/security/sdk54 |
| P7 Design Foundation | Foundation Preview/App Shell | banking-grade RTL |
| P8 Repo Baseline Gates | Repo baseline only after permission | tsc/eslint/secret scan |
| P9 Auth/RBAC/Security | later vertical slice | not before foundation |
| P10 Local DB/Sync/Audit | foundation kernel slice | offline-first |
| P11 Foundation/App Shell | FIRST CODE PHASE | Expo Go 54 runtime preview |
| P12 Dashboard | after shell and route guard | live cards with actions |
| P13 Patient Master | after foundation | vertical slice |
| P14 Scheduling | after Patient Master unless scoped foundation demo | strict slot logic |
| P15 Journey | after Patient/Scheduling foundations | no decorative timeline |
| P16 Clinical/Dental Chart | later clinical vertical | iPad Pencil future-ready |
| P17 Finance Ledger | after treatment/payment path | audit ledger mandatory |
| P18 Lab | after encounter/payment integration | lifecycle required |
| P19 Implant | after clinical/lab/finance | no cost mix-up |
| P20 Inventory | after treatment material model | no fake inventory |
| P21 CRM/SMS | provider verified | consent/opt-out |
| P22 Reports | after real data sources | no fake analytics |
| P23 Backup/Restore | before release | restore drill |
| P24 Quality Hardening | before UAT | perf/security/a11y |
| P25 UAT | real device evidence | owner review |
| P26 Release Readiness | final release packet | approval |
| P27 Stabilization | post-release | evidence continues |

## قفل اجرایی
- Phase order is strict.
- But MinaDent canonical must remain foundation-first and Expo Go 54-first.
- No V16 phase may skip V1.7 clinic data locks.
- The first code phase remains: `Production App Shell / Foundation Preview`, not business module.
