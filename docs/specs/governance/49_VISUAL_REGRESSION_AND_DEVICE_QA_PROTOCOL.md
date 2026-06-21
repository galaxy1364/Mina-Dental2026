---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 49 — Visual Regression & Device QA Protocol

## دستگاه‌های هدف

```text
Android real device
iPhone real device
Web/PWA browser
Tablet/iPad future
```

## QA بصری اجباری

```text
RTL alignment
safe area / notch
bottom dock overlap
keyboard behavior
input focus
Persian digits
Jalali dates
long Persian text
empty state
loading state
error state
dark/light theme if enabled
```

## Screenshot evidence

برای هر صفحه مهم باید screenshot evidence گرفته شود:

```text
dashboard
patient list
patient create
patient profile
appointment calendar
appointment create
finance
lab
settings
AI assistant
```

## رد خودکار

```text
mojibake
text clipped
dock covers content
keyboard closes unexpectedly
button inaccessible
LTR layout
icons inconsistent
dead action
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
