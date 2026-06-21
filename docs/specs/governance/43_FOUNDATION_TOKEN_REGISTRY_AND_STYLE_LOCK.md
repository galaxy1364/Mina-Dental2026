---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 43 — Foundation Token Registry & Style Lock

هدف: جلوگیری از پراکندگی رنگ، آیکن، spacing، motion و شکل صفحات.

## Registry مرکزی اجباری

همه UI باید از registry مرکزی بیاید:

```text
Module Identity Registry
Color Tokens
Typography Tokens
Spacing Tokens
Radius Tokens
Shadow/Glass Tokens
Motion Tokens
Icon Registry
Status Color Registry
Risk Severity Registry
RTL Layout Tokens
```

## قانون آیکن

آیکن emoji دائمی ممنوع است. آیکن باید semantic، قابل تعویض، accessibility-aware و متعلق به Module Registry باشد.

## قانون طراحی بانکی مدرن

الهام کیفی از اپ‌های بانکی مدرن مجاز است:

```text
glass/layered cards
compact actionable panels
safe motion
high contrast
command center
quick action rail
bottom dock
deep sheets
```

کپی برند/لوگو/رنگ اختصاصی یا trade dress ممنوع است.

## Drift Detection

هر فایل UI جدید باید ثابت کند از token/registry استفاده کرده است. استفاده مستقیم از رنگ/spacing پراکنده FAIL است.

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
