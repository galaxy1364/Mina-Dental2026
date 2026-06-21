# 192 — Dashboard to Smart Operating Brain Traceability

Status: TRACEABILITY_CONTRACT_CREATED

## Principle

Dashboard must be a projection of the Smart Operating Brain, not a separate UI island.

## Required mapping

| Dashboard area | Smart Brain dependency | Domain dependency |
|---|---|---|
| Clinic Live KPIs | Event/State/Task aggregation | appointments, patients, payments |
| System Health Bar | Health Engine | sync, backup, config, session |
| Persian Command | Command preview engine | RBAC, audit, sync queue |
| Today Scheduling Board | Appointment State Machine | slots, doctors, units |
| Doctor/Unit Cockpit | Capacity/Utilization Engine | doctors, units, appointments |
| Patient Journey Monitor | Patient Journey State Machine | patient, appointment, encounter, finance |
| Quick Patient Cards | Next Best Action Engine | patient, debt, lab, treatment |
| Treatment Intelligence | Clinical Protocol/Workflow Engine | encounter, tooth, treatment |
| Finance Dashboard | Revenue/Debt/Collection Engine | payments, charges, cheques, installments |
| Lab Dashboard | Lab SLA Engine | lab orders, treatments |
| CRM Dashboard | Lead/Recall Engine | communications, campaigns |
| Alerts/Escalation | Escalation Engine | tasks, notifications |
| End-of-day Closeout | Closeout Rule Engine | appointments, finance, sync, backup |

## Required evidence per dashboard slice

- selector exists or contract-backed disabled state exists
- owner role exists
- action route/hook exists
- audit event exists
- sync impact is declared
- error/offline/empty state exists
- test scenario exists

## STOP_BLOCKER

If a dashboard card cannot be traced to a Smart Brain contract:
`STOP_BLOCKER_DASHBOARD_NOT_BACKED_BY_SMART_BRAIN`
