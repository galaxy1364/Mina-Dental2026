---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 52 — Clinic Workflow Domain Backlog — World-Class MinaDent

## هدف

این فایل backlog سطح محصول است؛ هر آیتم قبل از اجرا باید به Requirement ID تبدیل شود.

## Core workflows

```text
Incoming call → instant patient search → existing/new decision → appointment
Online booking → slot validation → confirmation → reminder
Arrival → came/no-show/late → waiting/in treatment
Treatment → tooth/surface/procedure/doctor/result
Lab → send/shade/due/receive/delay/cost
Finance → invoice/payment/debt/installment/cheque/doctor share
Follow-up → recall/task/SMS/WhatsApp
Case closure → archive/reopen
```

## Enterprise intelligence

```text
risk scoring
next best action
overdue detection
missing next step detection
doctor capacity
chair utilization
lab delay prediction
debt follow-up priority
patient communication history
```

## Daily command center

```text
today appointments
arrived/waiting/no-show
finance alerts
lab due
implant follow-ups
inventory low stock
tasks by owner
backup/sync health
```

## شرط اجرا

هیچ backlog item بدون module, data, screen, RBAC, test و evidence وارد source نمی‌شود.

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
