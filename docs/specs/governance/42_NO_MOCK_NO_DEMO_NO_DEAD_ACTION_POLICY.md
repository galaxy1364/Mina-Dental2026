---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 42 — No Mock / No Demo / No Dead Action Policy

## قانون اصلی

MinaDent محصول واقعی کلینیک است. بنابراین هر دکمه، کارت، chip، tab، dock item، notification، AI command یا menu item باید یکی از این وضعیت‌ها را داشته باشد:

```text
CONNECTED_REAL_ACTION
CONNECTED_ROUTE_STUB_WITH_CONTRACT
DISABLED_WITH_EXPLANATION
HIDDEN_UNTIL_IMPLEMENTED
```

## ممنوع

```text
نمایش داده ساختگی بدون برچسب
دکمه‌ای که فقط alert می‌دهد
route غیرواقعی
آیتم داک بدون صفحه
صفحه بدون data/action contract
```

## قانون UI

اگر یک بخش هنوز backend ندارد، UI آن نباید وانمود کند داده واقعی دارد. باید با state مشخص نشان داده شود:

```text
آماده اتصال
نیازمند migration
نیازمند permission
نیازمند runtime evidence
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
