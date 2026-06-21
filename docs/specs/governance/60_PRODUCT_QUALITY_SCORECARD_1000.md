---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 60 — Product Quality Scorecard / 1000

هدف: هر خروجی MinaDent به‌صورت سختگیرانه نمره بگیرد.

## امتیازدهی

| محور | امتیاز |
|---|---:|
| Governance compliance | 100 |
| Real domain/data connection | 100 |
| UI/UX consistency and RTL | 100 |
| Security/RBAC/Audit | 100 |
| Offline/sync/backup readiness | 100 |
| Testing/evidence quality | 100 |
| Performance/scale | 100 |
| Maintainability/modularity | 100 |
| Research/benchmark alignment | 100 |
| Release/rollback safety | 100 |

## حد قبول

```text
>= 900: PASS_CANDIDATE
800-899: PARTIAL_NEEDS_FIX
< 800: FAIL
Any critical blocker: STOP_BLOCKER regardless of score
```

## Critical blockers

```text
secret leak
wrong project
fake data presented as real
dead route/action
schema/package/native change without approval
missing STATUS/RESUME
no evidence
```

## استفاده

هر Replit batch باید scorecard خودش را پر کند و evidence بدهد.

## قانون توقف مشترک
اگر هر بخش این سند با evidence قابل اثبات نشد، خروجی مجاز فقط این است:

```text
STOP_BLOCKER
NO_CODE
NO_BUILD
NO_SCHEMA
NO_CONNECTOR
NO_PATCH
```
