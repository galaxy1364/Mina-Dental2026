---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 41 — Real Code Only Implementation Standard

هدف: هیچ feature نمایشی، placeholder یا demo به‌عنوان پیشرفت واقعی حساب نشود.

## تعریف کد واقعی

کد واقعی یعنی:

```text
1. به domain model وصل است
2. route واقعی دارد
3. state واقعی دارد
4. loading/error/empty/success دارد
5. offline behavior روشن دارد
6. audit/RBAC impact روشن دارد
7. تست و evidence دارد
8. STATUS/RESUME آپدیت می‌شود
```

## ممنوع

```text
mock screen
fake live data
console-only feature
button without route/action
temporary TODO feature
hardcoded patient/payment/appointment
random color/style outside registry
UI-only business rule
schema-less storage
unverified connector
```

## استثنا

Prototype فقط در مسیر جدا و با برچسب واضح مجاز است:

```text
PROTOTYPE_ONLY
NOT_SOURCE_OF_TRUTH
NOT_PRODUCTION
NO_RUNTIME_CLAIM
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
