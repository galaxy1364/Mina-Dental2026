---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 53 — Appointment Engine Deep Spec

## هدف

نوبت‌دهی MinaDent باید از یک calendar ساده بالاتر باشد: موتور ظرفیت، یونیت، پزشک، تماس ورودی، conflict، follow-up و timeline.

## موجودیت‌ها

```text
Appointment
Schedule
Slot
DoctorAvailability
UnitAvailability
AppointmentType
Holiday/Closure
Waitlist
Reminder
NoShowEvent
RescheduleEvent
```

## قابلیت‌های الزامی

```text
search by mobile/file/name before booking
doctor mandatory
unit mandatory
duration selectable/custom
Jalali month/week/day/year
past visible but dim
official/private holiday override
conflict detection
free slot suggestion
waitlist
arrival status
no-show
reschedule history
follow-up scheduling
financial alert at booking without blocking
```

## State machine

```text
draft → scheduled → confirmed → arrived → waiting → in_treatment → completed
scheduled → cancelled
scheduled → rescheduled
scheduled → no_show
```

## معیار جهانی/استاندارد

Scheduling باید با مفاهیم Schedule/Slot/Appointment سازگار باشد تا آینده با online booking/API قابل توسعه بماند.

## Acceptance tests

```text
book with doctor+unit
reject conflict
allow debtor booking with warning
mark arrived
mark no-show
reschedule with audit
offline booking then sync
holiday override
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
