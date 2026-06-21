---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 44 — Route, Navigation & Link Integrity Rulebook

## قانون route

هیچ screen نباید orphan باشد. هیچ route نباید dead باشد.

## هر route باید داشته باشد

```text
route path
screen component
module owner
entry points
back behavior
deep link policy
RBAC access
offline behavior
loading/error state
test evidence
```

## هر action باید map شود

```text
action_id
label_fa
source_screen
target_route_or_service
required_role
audit_required
sync_required
confirm_required
```

## Dock/Tab rule

هر dock item باید صفحه مستقل یا sheet مستقل باز کند. همه dockها نباید dashboard را باز کنند.

## Navigation QA

```text
open each dock item
open each card
open each chip
open back
test RTL order
test safe area
test no overlap with bottom dock
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
