---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 56 — Finance / CRM / Reporting Deep Spec

## Finance entities

```text
Invoice
InvoiceItem
Payment
Debt
InstallmentPlan
Installment
Cheque
Discount
DoctorShareRule
DoctorShareLedger
LabCost
FinancialAlert
```

## قوانین فعلی کاربر

```text
late penalty auto-calc ممنوع
late debt/check/installment فقط alert/task/follow-up
debtor can book new appointment with warning
SMS sender/name customizable with clinic name
installments equal by default but editable manually
Mina share = (production - lab cost) / 2
Implant exception: fixture/abutment revenue not under Mina formula unless configured
Doctor share customizable
```

## CRM

```text
lead source
communication log
birthday
recall
marketing consent
template messages
no doctor name in SMS by default
```

## Reporting

```text
daily income
doctor production
doctor share
debts
installments due
cheques due
lab costs
chair utilization
no-show
conversion rate
follow-up overdue
```

## Acceptance tests

```text
partial payment
installment plan with manual edits
cheque due alert
doctor share calculation
debtor appointment warning
daily report
CRM reminder
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
