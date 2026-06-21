---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 45 — Database Migration & Seed Governance

## قانون migration

Migration بدون contract، rollback، RLS، audit و test ممنوع است.

## هر migration باید داشته باشد

```text
migration_id
reason
affected tables
forward SQL
rollback SQL or irreversible note
RLS impact
audit impact
index impact
sync impact
backup requirement
local SQLite parity
Supabase parity
test query
evidence output
```

## Seed data

Seed مجاز فقط برای:

```text
reference catalog
default roles
default clinic settings
test-only large dataset in dev
```

Seed fake بیمار/مالی/درمان در production ممنوع است.

## Versioning

SQLite و Supabase migration باید version lock داشته باشند. drift بین local/cloud STOP_BLOCKER است.

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
