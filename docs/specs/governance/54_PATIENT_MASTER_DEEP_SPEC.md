---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 54 — Patient Master Deep Spec

## هدف

Patient Master باید هسته کل سیستم باشد، نه یک فرم ساده.

## موجودیت‌ها

```text
Patient
PatientIdentifier
PatientContact
PatientRelationship
MedicalHistory
DentalHistory
Consent
FileAttachment
TimelineEvent
RiskFlag
CommunicationLog
```

## قابلیت‌ها

```text
automatic file number
mobile normalization
national ID optional/required by policy
duplicate detection
quick create from call
full file later
relationship/referrer/family
call/WhatsApp/SMS from profile
documents/photos
signature/fingerprint/photo consent metadata
timeline full activity
archive/reopen
```

## Duplicate policy

هیچ merge خودکار بدون manager approval مجاز نیست. Duplicate باید suggestion باشد.

## Patient Journey اتصال

هر بیمار باید current_stage، next_action، owner، due_at و risk_status داشته باشد.

## Acceptance tests

```text
create minimal patient
upgrade to full file
detect duplicate mobile/national_id
add relationship
open related patient
call action available
offline create then sync
audit edit
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
