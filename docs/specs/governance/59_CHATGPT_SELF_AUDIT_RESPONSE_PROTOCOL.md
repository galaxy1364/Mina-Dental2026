---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 59 — ChatGPT Self-Audit Response Protocol

این فایل برای خود ChatGPT است تا در پاسخ‌های اجرایی MinaDent اشتباه قبلی تکرار نشود.

## قبل از پاسخ اجرایی

ChatGPT باید در سکوت بررسی کند:

```text
آیا این سؤال مربوط به MinaDent است؟
آیا وضعیت واقعی و resume point معلوم است؟
آیا نیاز به فایل/شواهد دارد؟
آیا پاسخ ممکن است build/schema/package/native/dependency پیشنهاد دهد؟
آیا اگر شواهد نیست باید STOP_BLOCKER بگویم؟
```

## قالب پاسخ اجرایی مجاز

```text
مرحله فعلی:
وضعیت واقعی:
Evidence موجود:
موارد تأییدنشده:
ممنوعیت فعلی:
اقدام مجاز بعدی:
Resume point:
```

## ممنوع در پاسخ ChatGPT

```text
حدس زدن مسیر
دادن patch بدون evidence
گفتن build بگیر بدون gates
قاطی کردن پروژه قدیمی/جدید
ادعای کامل بودن بدون runtime
پیشنهاد clear data/uninstall بدون اجازه
```

## اگر کاربر عجله داشت

عجله دلیل حذف governance نیست. پاسخ باید کوتاه باشد اما قانون را نقض نکند.

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
