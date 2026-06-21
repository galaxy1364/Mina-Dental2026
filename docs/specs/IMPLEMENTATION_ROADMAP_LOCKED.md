# MinaDent 2026 — Implementation Roadmap & Master Source of Truth (LOCKED)

**Status:** LOCKED · **Version:** 1.0 · **Date:** 1405/03 (2026-06)
**Authority:** User directives (chat) · Banking foundation (Bank Mehr / Qbank /
Banket) · Competitor extraction (مینادنت شرکتی, برنامه لبخند) · Global best
practice. This file is the **base prompt / source of truth**: every stage is
built on top of it, in order, with a user approval gate (تایید) between stages.

> Companion locked docs (all in `docs/specs/`): `BANKING_DESIGN_EXTRACTED.md`
> (visual foundation), `DESIGN_SYSTEM_LOCKED.md`, `MASTER_SPECIFICATION_LOCKED.md`,
> `ARCHITECTURE_BLUEPRINT.md`, `INFRASTRUCTURE_FOUNDATION.md`,
> `COMPETITOR_AUDIT.md`, `DEVELOPMENT_PROCESS_LOCKED.md`, `TEST_PLAN.md`.
> Constraint: **Expo SDK 54 is LOCKED** (see `AGENTS.md`).

---

## 0. Operating rules (locked)

1. **Foundation = Iranian banking apps.** Page model, color, gradients, dock,
   animation language, card/list/sheet patterns come from Bank Mehr / Qbank /
   Banket (encoded in `BANKING_DESIGN_EXTRACTED.md` + `src/design/tokens.ts`).
2. **Match-then-surpass.** For every module we (a) reproduce 100% of what
   مینادنت/لبخند do, then (b) add the "World-Best-Practice Upgrades" listed for
   that module so MinaDent is ahead of the market.
3. **Real code only, stage by stage.** Each stage ships complete, typed, tested,
   lint-clean, RTL-correct, CI-green code — then waits for user تایید before the
   next stage. No stubs, no placeholders.
4. **RTL & Jalali always.** `direction:'rtl'` context; `jalaali-js` engine; Persian
   digits; official Iranian holidays.
5. **Never lose data.** Soft-delete (`deleted_at`), transactional migrations,
   audit trail, offline queue, encrypted-at-rest target.
6. **Lock & store.** This roadmap is mirrored to a Devin Knowledge note so it is
   the standing base for all future sessions.

---

## 1. Design foundation (locked) — see `BANKING_DESIGN_EXTRACTED.md`

- Lime `#C2E812` action/accent (dark `onPrimary` text), `primaryDark #5E7A00`
  readable lime, `primarySoft #EEF8C0` tint, near-black `ink`/`wallet` gradient
  card, gold `#E2B100`, light canvas. Radius 20–24, pill buttons, soft + float
  shadows. Vazirmatn, Persian digits, RTL.
- Patterns: dark wallet/balance card · soft-icon section grid · lime-pill active
  dock · white list rows (icon right / chevron left) · pill CTA · segmented form
  tabs · right-anchored chip filter bar · transaction rows with status pills.
- Animation language (to implement progressively): shared-element/press scale,
  skeleton shimmer, number count-up on balances, sheet spring transitions,
  haptics on key actions, pull-to-refresh, list stagger.

---

## 2. Full feature inventory (extracted from مینادنت شرکتی + برنامه لبخند)

Legend — **Status**: ✅ built · 🟡 partial · ⬜ planned.

### 2.1 Patient master / CRM
- ✅ Patient list + search, ✅ create/edit, ✅ profile + journey timeline.
- ⬜ Customizable fields (field-builder), ⬜ national-code/phone/card/biometric
  search, ⬜ patient card (unique ID), ⬜ medical history & alerts (allergies,
  meds, systemic), ⬜ documents/attachments, ⬜ consent forms & e-signature,
  ⬜ loyalty/club + birthday/welcome automation, ⬜ recall/follow-up.
- **Upgrades:** fuzzy/phonetic Persian search, dedup detection, FlashList
  virtualization for 200k rows @60fps, offline full-text index.

### 2.2 Dental chart & clinical
- ⬜ FDI/Palmer tooth chart (permanent + deciduous), per-surface conditions,
  ⬜ treatment plan vs done, ⬜ perio/endo (canal lengths), ⬜ imaging attach
  (OPG/RVG/PSP/intraoral), ⬜ clinical notes per visit.
- **Upgrades:** interactive 3D/2.5D chart w/ stylus, treatment-plan phasing &
  cost estimate, AI image annotation (later), versioned clinical history.

### 2.3 Scheduling
- ✅ appointments CRUD, ✅ monthly Jalali calendar + holidays, 🟡 status flow.
- ⬜ day/week timeline (multi-doctor/chair), ⬜ drag-resize, ⬜ conflict/
  double-book prevention, ⬜ waiting-room/live status, ⬜ reminders (SMS/push),
  ⬜ recall scheduling, ⬜ receipt/print.
- **Upgrades:** AI slot optimization, no-show risk, gap-fill suggestions.

### 2.4 Financial — payments + **دفتر معین/accounting** (now INCLUDED, see §3)
- ✅ payment record (in/out), ✅ patient balance, 🟡 clinic totals.
- ⬜ cash/card/check/transfer/installments/advance/refund, ⬜ invoices &
  receipts, ⬜ doctor commission & tariffs, ⬜ insurance (tariff/percent/capped +
  deductible + claims), ⬜ expenses & income, ⬜ POS + **OCR receipt scan**,
  ⬜ **double-entry ledger** (روزنامه/کل/معین), ⬜ financial reports & dashboards.
- **Upgrades:** AR aging, production-vs-collection, overhead %, auto bank
  reconciliation, forecasting.

### 2.5 Laboratory & implants
- ✅ labs, ✅ lab cases (fixed), ✅ implants registry, 🟡 status tracking.
- ⬜ mobile-lab cloud tracking, ⬜ lab tariffs & payments to lab, ⬜ Iranian
  implant/brand/lab DB, ⬜ due-date alerts on calendar (done) + reminders.
- **Upgrades:** dynamic ETA tracking, per-lab SLA analytics.

### 2.6 Inventory
- ⬜ products/materials, stock movement, min/max & expiry alerts, purchases,
  suppliers, usage→treatment linkage, Iranian product DB.
- **Upgrades:** forecast & auto-reorder, barcode scan, batch/lot + expiry FEFO.

### 2.7 Staff / users / security
- ✅ staff CRUD + roles, ✅ auth/login, 🟡 RBAC enforcement, ✅ audit log core.
- ⬜ granular RBAC per module/action, ⬜ MFA (biometric/OTP), ⬜ attendance &
  payroll/commission, ⬜ file freeze (financial/treatment), ⬜ session timeout.
- **Upgrades:** full audit trail UI, anomaly alerts, device binding.

### 2.8 Reporting / analytics / notifications
- ⬜ manager dashboard (live KPIs), ⬜ income by service/doctor, ⬜ analytical
  charts, ⬜ manager notification on every staff action, ⬜ SMS alerts.
- **Upgrades:** drill-down, predictive KPIs, exportable PDF/Excel.

### 2.9 Platform / infra (cross-cutting)
- ✅ SQLite offline + schema migrations (transactional), 🟡 Supabase sync,
  ⬜ encrypted-at-rest, ⬜ backup/restore (data+images), ⬜ PWA/web, ⬜ peripheral
  integrations (POS/RVG/fingerprint/caller-ID/printer — native, later phases),
  ⬜ AI assistant "Mona", ⬜ theme switch (light/dark) + accent customization.

---

## 3. دفتر معین / Clinic accounting (NEW — included per latest user directive)

> Supersedes the earlier "Excluded" note in `MASTER_SPECIFICATION_LOCKED.md §4.1.3`.

Iranian statutory model (ماده ۶ قانون تجارت): **دفتر روزنامه** (journal) →
**دفتر کل** (general ledger) → **دفتر معین** (subsidiary ledger, analytical).
Implement true **double-entry** (هر سند: بدهکار = بستانکار), balanced, auditable,
offline-first.

**Chart of accounts (سرفصل‌ها) — dental-tailored, kol → moein → tafsili:**
- دارایی: صندوق، بانک‌ها (هر حساب tafsili)، حساب‌های دریافتنی (به تفکیک بیمار)،
  پیش‌پرداخت، موجودی کالا/ملزومات، اموال و تجهیزات، استهلاک انباشته.
- بدهی: حساب‌های پرداختنی (به تفکیک لابراتوار/تأمین‌کننده)، پیش‌دریافت از بیمار،
  چک‌های پرداختنی، مالیات/بیمه پرداختنی، تسهیلات.
- سرمایه / حقوق صاحبان.
- درآمد: درآمد خدمات (به تفکیک نوع درمان)، وصولی بیمه، وصولی نقدی بیمار، سایر.
- هزینه/بهای تمام‌شده: حق‌العمل پزشک، هزینه لابراتوار، ملزومات مصرفی، اجزای
  ایمپلنت، حقوق و دستمزد، اجاره، آب/برق/گاز، بازاریابی، استهلاک، سایر.

**Core capabilities:** journal entries (manual + auto from payments/expenses/lab),
ledger postings, moein per account with running balance, trial balance
(تراز آزمایشی), AR aging, production-vs-collection, overhead %, period close,
export. Every financial action emits a balanced journal voucher (سند).

---

## 4. Staged build plan (each stage → تایید گیت → next)

> "Stage 0" (foundation) is already merged on PR #4. Stages are ordered by global
> engineering practice: platform → core entities → money → clinical → intelligence.

- **Stage 0 — Foundation (DONE, PR #4):** RTL root-cause fix, Jalali engine +
  holidays, banking design tokens & components (button/dock/tiles/cards/chips),
  SQLite + transactional migrations, auth, base modules (patients, appts, labs,
  lab cases, implants, payments, staff), tab-bar super-app shell.
- **Stage 1 — Banking UI rollout & motion:** apply list-row / section-group /
  form / sheet patterns + skeletons + core animations (count-up, shimmer, press,
  spring) across all existing screens; light/dark theme + accent. *(visual)*
- **Stage 2 — Patient master pro:** medical history & alerts, documents,
  customizable fields, advanced search (national-code/phone/card), patient card,
  FlashList 200k perf, recall/follow-up.
- **Stage 3 — Scheduling pro:** day/week multi-doctor timeline, drag-resize,
  conflict prevention, live waiting-room status, reminders, receipt/print.
- **Stage 4 — Financial pro + دفتر معین:** payment methods (cash/card/check/
  installment/advance/refund), invoices/receipts, commission & tariffs,
  insurance, expenses, POS + OCR, **double-entry ledger + reports** (§3).
- **Stage 5 — Lab/implant/inventory pro:** mobile-lab tracking, lab tariffs &
  payments to lab, Iranian product/implant DB, full inventory (expiry/min-max/
  suppliers/usage linkage/barcode).
- **Stage 6 — Clinical chart:** FDI/Palmer chart + surfaces, treatment plan vs
  done, perio/endo, imaging attach, clinical notes; then 3D/stylus.
- **Stage 7 — Security & RBAC:** granular RBAC, MFA/biometric, session timeout,
  file freeze, full audit-trail UI, encrypted-at-rest, backup/restore.
- **Stage 8 — Analytics & notifications:** manager dashboard KPIs, reports,
  manager-notify-on-staff-action, SMS/push.
- **Stage 9 — Sync & platform:** robust Supabase sync + conflict resolution,
  PWA/web target, peripheral integrations.
- **Stage 10 — AI "Mona":** assistant, OCR, predictive scheduling/inventory.

Each stage delivers: code + tests + RTL/device check + PR + green CI + updated
docs, then **STOP for تایید**.

---

## 5. World-best-practice backlog (continuously mined)

Maintained per module in §2 "Upgrades". As each stage starts, refresh with
current global references (Open Dental/Dentrix/Eaglesoft feature sets, ADA HPI
overhead benchmarks, FDI charting standards, OWASP MASVS, WCAG 2.2, Apple HIG /
Material 3 motion) and append any newly-available capability we lack, so each
delivered section is state-of-the-art, not just parity.

---

## 6. Change log
- v1.0 — Initial locked roadmap. Banking foundation locked; full competitor
  feature inventory mapped to current code; دفتر معین added (overrides prior
  exclusion); 11-stage plan with approval gates established as the base.
