---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 47 — AI Assistant Safety & Action Guardrails

## نقش AI در MinaDent

AI باید assistant باشد، نه مالک سیستم. AI می‌تواند پیشنهاد دهد، جستجو کند، خلاصه کند و فرم را آماده کند؛ اما action حساس نیاز به تأیید دارد.

## Action tiers

| Tier | نمونه | وضعیت |
|---|---|---|
| T0 Read | جستجوی بیمار، نمایش بدهکارها | مجاز با RBAC |
| T1 Draft | پیش‌نویس پیامک، پیشنهاد نوبت | مجاز |
| T2 Confirmed Write | ثبت نوبت، task، یادآوری | نیازمند تأیید کاربر مجاز |
| T3 Sensitive | پرداخت، حذف، تغییر تعرفه، ارسال گروهی | فقط manager + confirm + audit |
| T4 Forbidden Auto | حذف دائمی، clear data، service key، schema change | ممنوع |

## AI Command Contract

هر فرمان AI باید parse شود به:

```text
intent
entities
confidence
missing_fields
required_role
risk_level
preview
confirmation_required
audit_record
```

## ممنوع

AI نباید بدون تأیید پیامک ارسال کند، بیمار حذف کند، پرداخت ثبت کند، سهم پزشک نهایی کند، schema تغییر دهد یا فایل export کند.

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
