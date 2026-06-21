# 85 — Stage-by-Stage Lock & Test Roadmap
Version: V1.5
Status: LOCKED ROADMAP

## Purpose
This roadmap translates the user's requirement into exact phase order: every phase must be small enough to test, valuable enough to see, and safe enough to lock before moving on.

## Phase structure
Every phase has:

- objective;
- input dependencies;
- allowed files;
- forbidden files;
- implementation output;
- static tests;
- phone evidence;
- user review point;
- lock artifact;
- rollback plan;
- next phase gate.

## Phase 0 — Governance Complete
Status now: active.
Output: V1.5 governance ZIP, source-of-truth, SDK54 blocker, legacy audit, research pipeline.

## Phase 1 — Repo Init & SDK Runtime Compatibility
Goal: create clean repo compatible with chosen runtime path.
Gate: no business module; only identity, package, Expo config, TypeScript, lint, env template, SDK proof.
Phone evidence: Expo Go 54 compatibility proof or approved dev-build path.

## Phase 2 — Production App Shell / Foundation Preview
Goal: first phone-visible unified MinaDent shell.
Must show: Persian RTL, banking-grade dashboard shell, dock, top command, cards, chip rail, states, sheet model.
No real business data yet.
Phone evidence required.

## Phase 3 — Core Domain Kernel
Goal: local-first technical foundation.
Includes: typed env, auth shell, SQLite init, sync queue skeleton, RBAC skeleton, audit skeleton, state machine, error boundary, PII-safe logging.
Gate: local runtime evidence and no fake persistence.

## Phase 4 — Patient Master MVP
Goal: real patient create/search/profile with local persistence and validation.
Gate: Iranian mobile normalization, file number policy, duplicate warning, RTL forms, real storage, phone test.

## Phase 5 — Smart Scheduling MVP
Goal: doctor/unit/date/time/duration/type, conflict prevention, free slot workflow, Jalali calendar.
Gate: appointment create/edit/cancel/reschedule/no-show and phone preview.

## Phase 6 — Patient Journey Timeline
Goal: the central operational stepper from lead to follow-up/closed.
Gate: each patient has next action, owner, due date, status, audit event.

## Phase 7 — Treatment / Dental Chart / Encounter
Goal: real clinical encounter, tooth/area/procedure/doctor attribution.
Gate: no AI diagnosis; doctor-confirmed clinical record only.

## Phase 8 — Finance / Debt / Installments / Cheques / Doctor Share
Goal: real finance with protected access.
Gate: manager-sensitive actions, audit, share formula evidence.

## Phase 9 — Lab / Implant / Inventory / Imaging
Goal: lab lifecycle, implant stages, file/image attachment, inventory hooks.
Gate: traceability to patient/treatment/finance.

## Phase 10 — CRM / SMS / WhatsApp / Notifications
Goal: safe communication templates and reminders.
Gate: no doctor name in SMS unless explicitly later approved by law/policy decision; delivery logs.

## Phase 11 — Dashboard / Reports / Control Tower
Goal: live operational dashboard based on real data only.
Gate: no fake KPI; role-aware visibility.

## Phase 12 — AI Assistant / Advanced Intelligence
Goal: AI command/search/suggestion with human approval.
Gate: no autonomous clinical/financial destructive action.

## Phase 13 — Build / Release / Backup / Monitoring
Goal: preview/production builds, backup/restore, monitoring, release notes.
Gate: Android/iOS/Web evidence.

## Advancement rule
No phase advances without:

```text
STATIC_PASS + PHONE_OR_RUNTIME_EVIDENCE + USER_REVIEW + STATUS_UPDATE + RESUME_UPDATE + ZIP_UPDATE
```
