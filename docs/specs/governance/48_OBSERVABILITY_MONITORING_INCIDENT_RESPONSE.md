---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 48 — Observability, Monitoring & Incident Response

## هدف

بعد از runtime، خطاها نباید پنهان بمانند.

## لاگ‌های لازم

```text
auth events
sync events
migration events
backup events
payment edits
delete/archive attempts
AI actions
connector calls
failed permissions
crashes
performance warnings
```

## Incident types

```text
secret leak
wrong patient data shown
sync conflict unresolved
payment mismatch
backup failure
app crash
SMS wrong recipient
role escalation
database migration failure
```

## Incident response

برای هر incident باید ثبت شود:

```text
incident_id
time
severity
affected data
root cause
containment
fix
evidence
prevention rule update
```

## قانون بعد از incident

بعد از هر incident باید حداقل یکی از فایل‌های governance به‌روزرسانی شود تا همان خطا تکرار نشود.

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
