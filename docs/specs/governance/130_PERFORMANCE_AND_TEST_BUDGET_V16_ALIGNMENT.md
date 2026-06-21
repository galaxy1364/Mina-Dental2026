# 130 — Performance and Test Budget V16 Alignment
Version: V1.8
Status: LOCKED

## Performance budget
| Area | Budget | Test ID | Evidence |
|---|---:|---|---|
| Dashboard open | <= 2s | DASH-PERF-001 | phone/runtime timing |
| Patient search | <= 500ms | PAT-PERF-001 | indexed search with 20k+ synthetic records |
| Appointment save offline | <= 1s perceived | SCH-PERF-001 | SQLite write + sync_queue enqueue |
| Drill-down card | <= 1s | DASH-PERF-002 | card to filtered detail |
| Sync retry | visible state + backoff | SYNC-PERF-001 | offline->online |
| Large lists | no freeze | UI-PERF-001 | virtualized/paginated 20k+ |

## Minimal test matrix
| Module | Required tests |
|---|---|
| Foundation | RTL, safe area, dock, no dead action, route guard |
| Auth | session, lockout, biometric/PIN path when scoped |
| RBAC | manager/doctor/secretary denial/masking |
| Scheduling | conflict, past time, custom duration, archive reactivation |
| Finance | payment, debt, cheque, installment, discount, correction, share |
| Lab | send, due, overdue, delivered, returned |
| Sync | pending, synced, failed, conflict, dead letter |
| Release | smoke, rollback, changelog, monitoring |

## Evidence rules
- Unit tests alone are not enough for UI.
- Runtime screenshots alone are not enough for business logic.
- Finance requires ledger + permission + audit evidence.
- Scheduling requires past-time and conflict tests.
- Sync requires restart/offline-online test.
