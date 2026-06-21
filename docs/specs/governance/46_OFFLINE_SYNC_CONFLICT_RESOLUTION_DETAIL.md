---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 46 — Offline Sync Conflict Resolution Detail

## اصل Offline-first

کاربر باید بتواند بدون اینترنت کار اصلی را انجام دهد، اما sync باید قابل ممیزی باشد.

## هر entity باید sync policy داشته باشد

```text
patients
appointments
treatments
payments
installments
cheques
lab_orders
inventory
files_metadata
audit_logs
```

## Conflict classes

```text
C1: same field edit
C2: deleted remotely but edited locally
C3: appointment overlap created offline
C4: payment changed by manager
C5: role/permission changed while offline
C6: duplicate patient created offline
```

## Conflict rule

مالی، دسترسی، حذف، treatment critical و patient identity conflict نباید silent auto-merge شوند. باید manager review یا deterministic policy داشته باشند.

## Sync evidence

```text
queue before
queue after
local row
remote row
audit row
conflict row if any
timestamp
device id
user id
```

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
