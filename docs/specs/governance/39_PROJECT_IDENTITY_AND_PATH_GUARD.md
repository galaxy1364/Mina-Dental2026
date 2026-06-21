---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 39 — Project Identity & Path Guard

هدف: جلوگیری از قاطی‌شدن MinaDent جدید با پروژه‌های قبلی.

## شناسه پروژه جدید

پروژه جدید فقط زمانی معتبر است که root آن شامل این فایل‌ها باشد:

```text
README_START_HERE.md
STATUS.md
RESUME_STATE.md
00_MINADENT_CONSTITUTION.md
SHA256_MANIFEST_V1_3.txt
```

## ممنوعیت مسیرهای قدیمی

این مسیرها نباید مبنای اجرای جدید شوند مگر فقط برای read-only legacy audit:

```text
C:\Users\MOSTAFA.ARAD\Desktop\MinaDent-Contract\artifacts\minadent-app
C:\Users\MOSTAFA.ARAD\Desktop\dental-clinic
هر پروژه Replit حذف‌شده یا قدیمی
```

## Identity Check قبل از هر دستور

هر Executor باید گزارش دهد:

```text
PROJECT_NAME=
PROJECT_ROOT=
PACKAGE_NAME=
APP_SLUG=
EXPO_OWNER=
EXPO_PROJECT_ID=
ANDROID_PACKAGE=
IOS_BUNDLE_ID=
CURRENT_GIT_BRANCH=
```

اگر هرکدام نامشخص یا متناقض بود:

```text
STOP_BLOCKER_PROJECT_IDENTITY_UNVERIFIED
```

## قانون build

هیچ build تا وقتی identity، env، package، owner، slug، projectId، Android package و iOS bundleId روشن و تأییدنشده‌اند مجاز نیست.

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
