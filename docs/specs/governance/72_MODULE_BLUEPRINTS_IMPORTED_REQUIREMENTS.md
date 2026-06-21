# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 72 — Module Blueprints from Imported v54 Requirements

### Dashboard / Command Center
**Imported:** KPI revenue, appointment status, no-show rate, fill rate, lab delay, low stock, debt buckets, realtime.  
**Rewrite target:** live operational dashboard with patient journey cards, not just metric cards.  
**Acceptance:** KPIs backed by repositories/materialized views, role-aware visibility, no financial leakage to secretary, offline/sync status visible.

### Patient Master
**Imported:** patient list, search, file number, no-show count, medical history, offline create.  
**Rewrite target:** 200K+ searchable Patient Master with duplicate intelligence, archive, journey timeline.  
**Acceptance:** normalized Persian search, file/mobile/national code matching, duplicate pre-submit and submit-time tests.

### Scheduling
**Imported:** phase prompt with appointment booking, Jalali calendar, slot selection.  
**Rewrite target:** smart scheduling engine with doctor/unit capacity, duration override, free slot suggestions, no-show/reschedule lifecycle.  
**Acceptance:** conflict tests, Jalali UI/Gregorian DB, Friday/holiday handling, online booking pending approval.

### Encounter / Dental Chart / Treatment / Implant
**Imported:** dental chart, treatment, invoice generation, 3D/AR ideas.  
**Rewrite target:** clinical encounter engine with tooth/surface/status/treatment/doctor/lab/finance links.  
**Acceptance:** chart state persisted, treatment creates finance/lab obligations, implant costs separated by rule.

### Finance
**Imported:** invoice, payment, cheque, installment, doctor share formulas, discount rules.  
**Rewrite target:** manager-safe ledger with audit, soft delete, edge-only doctor share, Iranian workflows.  
**Acceptance:** RLS deny tests, audit old/new, doctor share formula tests, discount manager gate.

### Lab
**Imported:** lab lifecycle and delayed alerts.  
**Rewrite target:** lab order connected to treatment/tooth/patient/finance/delivery.  
**Acceptance:** due alert, status transition, cost impact, delivery settlement.

### CRM / Messaging / Notifications
**Imported:** SMS, push, WhatsApp, Bale/Eitaa, reminders.  
**Rewrite target:** consent-based omnichannel CRM with template approval, opt-out, delivery log, audit.  
**Acceptance:** no doctor name in SMS, consent required, delivery log, role-based send.

### AI Assistant
**Imported:** voice, X-Ray analysis, digital twin, no-show prediction.  
**Rewrite target:** safe AI assistant with read-only suggestions first, action confirmation later.  
**Acceptance:** no diagnosis claim, doctor confirmation, audit, role permission, rollback.

### Reports
**Imported:** KPI, doctor share, debt buckets, export.  
**Rewrite target:** role-aware report center with operational/finance/clinical/lab/CRM views.  
**Acceptance:** manager-only sensitive finance, doctor own share only, export audit.

### R&D / Later
GraphQL, codegen, AR, quantum-ready, CDN, smart contracts, SaaS. These remain Future/R&D until core is verified.
