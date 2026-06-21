---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 55 — Dental Chart / Treatment / Implant / Lab Deep Spec

## Dental chart

```text
FDI/Universal mapping policy
quadrant 1-8
tooth surfaces
status per tooth
procedure history
planned vs completed
doctor per procedure
images linked to tooth/case
```

## Treatment

```text
diagnosis
treatment plan
procedure
tooth/surface
doctor
price
discount
lab needed
finance link
follow-up required
```

## Implant

```text
surgery
fixture brand
abutment
crown
stage tracking
next step suggestion
surgeon share exception
inventory relation
lab relation
```

## Lab

```text
lab order
lab name
work type
shade/color
send date
due date
received date
cost
delay
delivery appointment suggestion
```

## ممنوع

درمان، لابراتوار و ایمپلنت نباید فقط یادداشت آزاد باشند. باید structured data داشته باشند.

## Acceptance tests

```text
record treatment on tooth
create implant workflow
create lab order from treatment
receive lab
calculate lab cost impact
follow-up action created
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
