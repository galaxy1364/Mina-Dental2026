---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 51 — Data Import / Legacy Merge Protocol

## هدف

فایل‌ها و اطلاعات قبلی کاربر کمک می‌کنند، اما فقط بعد از ممیزی.

## مراحل legacy merge

```text
1. Receive file
2. Read-only inventory
3. Classify: requirement / code / design / evidence / config
4. Detect project identity
5. Detect stale/invalid parts
6. Extract useful requirements
7. Map to Requirement Matrix
8. Create ADR if decision required
9. Update governance
10. Only then consider implementation
```

## ممنوع

```text
copy-paste direct code
trust old package/schema
trust old build evidence
mix old env
reuse old projectId/package without identity audit
```

## حالت‌های خروجی

```text
MERGE_APPROVED
MERGE_PARTIAL
MERGE_REJECTED
NEEDS_USER_REVIEW
STOP_BLOCKER_LEGACY_CONFLICT
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
