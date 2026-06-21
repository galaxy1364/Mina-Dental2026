# 126 — Definition of Ready/Done V16 Enhancement
Version: V1.8
Status: LOCKED

## Definition of Ready — enhanced
A phase or micro-batch is READY only when all are known:

1. source reality read
2. source of truth files identified
3. owner data impact checked
4. allowed files listed
5. forbidden files listed
6. REQ-ID mapped
7. entity/data contract mapped
8. RBAC/permission impact known
9. audit/log event defined
10. sync/offline impact known
11. test plan defined
12. rollback plan defined
13. runtime evidence path defined
14. cost/build impact defined
15. user approval required or not required specified

If any item is missing:
- OWNER_INPUT_REQUIRED
- SOURCE_AUDIT_REQUIRED
- PROVIDER_REQUIRED
- LEGAL_REVIEW_REQUIRED
- STOP_BLOCKER_READY_INCOMPLETE

## Definition of Done — enhanced
A work item is DONE only if:

- real code changed or document update completed as scoped
- no forbidden file touched
- TypeScript PASS when code exists
- ESLint PASS when code exists
- secret scan PASS when source exists
- relevant unit/integration/runtime tests executed
- raw output captured
- phone/runtime evidence captured when UI/runtime scoped
- diff summary produced
- manifest/hash produced
- STATUS/RESUME updated
- ZIP updated if governance/project packet changed
- known limits listed
- next resume point set

## UI Done
UI is Done only if:
- Persian RTL correct
- safe area correct
- loading/empty/error/offline/RBAC states exist
- no dead button
- every action has route/hook/disabled reason
- design token usage verified
- phone screenshot or screen recording exists

## Finance Done
Finance is Done only if:
- ledger transition tested
- audit record tested
- permission denial tested
- receipt/correction path tested
- doctor attribution tested
- no client-side final share calculation

## Sync Done
Sync is Done only if:
- local write persists
- queue survives restart
- online processor runs
- conflict/dead-letter path exists
- evidence includes state transition
