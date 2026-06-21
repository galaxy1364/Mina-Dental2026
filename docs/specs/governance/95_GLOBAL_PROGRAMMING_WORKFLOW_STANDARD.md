# 95 — Global Programming Workflow Standard for MinaDent
Version: V1.5
Status: LOCKED ENGINEERING WORKFLOW

## Purpose
Define how MinaDent must be built using global engineering discipline while staying practical for the user's Replit/phone-preview workflow.

## Workflow model
MinaDent uses a hybrid of:

- secure software development lifecycle;
- phase-gated delivery;
- trunk-safe small batches;
- acceptance-test-driven requirements;
- design-system-first UI;
- offline-first mobile architecture;
- evidence-first QA.

## Batch size rule
Batches must be small enough that:

- files changed are reviewable;
- static tests run quickly;
- phone preview is possible;
- rollback is simple;
- user can visually verify if UI-facing.

## Standard batch flow
```text
1. Intake
2. Requirement mapping
3. Research check
4. Design/data contract
5. Implementation plan
6. Code
7. Static tests
8. Runtime/phone test
9. Evidence collection
10. User review
11. Lock/update ZIP
12. Next batch
```

## Branch/merge principle
Even if Replit does not expose Git branches well, the logical model is:

```text
one batch = one change set = one evidence folder = one manifest = one resume point
```

## Failure handling
Any failure creates:

- blocker ID;
- exact evidence;
- suspected file/scope;
- no guessing;
- next read-only diagnostic packet.

## Quality thresholds
- Governance completeness: 100%.
- Safety/security: no known critical gaps.
- UI score: 900/1000 minimum before user-facing lock.
- Runtime evidence: required before verified label.
- No fake data: zero tolerance.
