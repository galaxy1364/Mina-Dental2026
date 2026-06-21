---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 50 — Replit Output Validation & Overlay ZIP Protocol

## قانون خروجی Replit

هر batch که فایل را تغییر دهد باید overlay ZIP بدهد. گزارش متنی بدون ZIP برای تغییر فایل INVALID است.

## Overlay ZIP باید شامل باشد

```text
only changed allowed files
relative paths
MANIFEST.md
SHA256 for each file
changed file list
forbidden file check
test evidence
STATUS update
RESUME update
rollback notes
```

## ممنوع در ZIP بدون اجازه صریح

```text
package.json
package-lock.json
app.json
eas.json
android/
ios/
.env
schema/migrations
native config
```

## Validation before local extract

```text
preview zip contents
check forbidden files
check manifest
check hash
extract only after approval
run local gates
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
