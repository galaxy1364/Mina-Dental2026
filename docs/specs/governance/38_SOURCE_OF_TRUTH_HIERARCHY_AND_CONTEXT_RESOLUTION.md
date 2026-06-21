---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 38 — Source of Truth Hierarchy & Context Resolution

هدف: چت، حافظه، حدس، فایل قدیمی و خروجی AI نباید با هم قاطی شوند.

## سلسله‌مراتب منبع حقیقت

1. فایل‌های root governance همین بسته
2. STATUS.md
3. RESUME_STATE.md
4. Evidence Ledger
5. Requirement Traceability Matrix
6. Module Registry
7. Design/Data/Security Contracts
8. آخرین Execution Packet تأییدشده
9. حافظه ChatGPT فقط به‌عنوان کمک، نه منبع نهایی
10. پیام کاربر فقط وقتی معتبر است که به فایل‌های بالا route و ثبت شود

## قانون تعارض

اگر دو منبع با هم تعارض دارند:

```text
STOP_BLOCKER_CONTEXT_CONFLICT
```

تا وقتی conflict resolution در ADR و Change Control ثبت نشود، اجرای کد ممنوع است.

## قانون چت

چت فعلی source of truth نیست. هر تصمیم جدید باید در یکی از فایل‌های governance ثبت شود.

## قانون حافظه

حافظه فقط context کمکی است. حافظه نمی‌تواند جای Evidence، فایل پروژه یا STATUS را بگیرد.

## قانون فایل ورودی کاربر

هر فایل جدید کاربر ابتدا وارد مسیر زیر می‌شود:

```text
INPUT_RECEIVED → READ_ONLY_AUDIT → REQUIREMENT_EXTRACTION → ROUTING_MATRIX → APPROVAL → GOVERNANCE_UPDATE
```

کپی مستقیم به source code ممنوع است.

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
