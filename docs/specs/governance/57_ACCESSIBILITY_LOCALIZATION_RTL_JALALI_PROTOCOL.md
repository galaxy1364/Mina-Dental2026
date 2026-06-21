---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 57 — Accessibility / Localization / RTL / Jalali Protocol

## فارسی‌اول

همه متن‌های visible باید فارسی و RTL باشند. متن انگلیسی فقط برای شناسه فنی یا dev-only.

## Jalali

منبع حقیقت تاریخ در DB نباید متن جلالی باشد. ذخیره با ISO/UTC/DATE/TIMESTAMPTZ؛ نمایش با جلالی.

## اعداد

سیستم باید Persian/English digits را normalize کند.

## Accessibility

```text
contrast
tap target
font scaling
screen reader labels
motion reduction
keyboard behavior
error messages
color not only signal
```

## WCAG alignment

برای Web/PWA باید WCAG 2.2 AA هدف باشد؛ برای موبایل هم همان اصول perceivable/operable/understandable/robust به UI ترجمه شود.

## QA

```text
long Persian names
mixed Persian/English digits
small screens
keyboard open
bottom dock
safe area
dark/light if enabled
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
