# MinaDent V1.7 — Phase Roadmap Updated with Real Clinic Data

## Purpose
Update the staged roadmap using the real clinic requirements received in V1.7.

## Current rule
Still no code, repo init, build, schema, connector, or package install until read-only audit and a phase packet are approved.

## Phase 0 — Governance and input lock
Current phase. Add real clinic data, open decisions, and next-file audit.
Gate:
- V1.7 ZIP generated.
- STATUS/RESUME updated.
- No code generated.

## Phase 1 — Production App Shell / Foundation Preview
Purpose: visible, meaningful foundation on the user's phone using Expo Go SDK54-compatible path.
Must include:
- Persian RTL root
- Font/loading states
- Banking-grade layout inspiration
- Top command/search area
- Bottom dock
- Smart cards
- Chip rail
- Sheet model
- Empty/error/offline states
- Placeholder only as structural skeleton? No: any placeholder must be explicitly non-data and not fake persistence.
- Phone preview evidence from user.

No business module implementation yet.

## Phase 2 — Identity, staff, clinic settings, master data
Must include:
- Staff/roles model
- Active doctors: Dr. Mehdi, Dr. Mina
- Secretary: Akram
- Addable doctors/secretaries/assistants
- Units
- Labs
- Calendar settings
- Service catalog setup
- RBAC/audit from the beginning

## Phase 3 — Patient Master + relationship engine
Must include:
- File number sequence continuing from real latest number
- National code uniqueness
- Mobile normalization and duplicate warning
- Relationship engine
- Search by file/mobile/national code/name
- Offline-first local storage and sync queue

## Phase 4 — Smart scheduling and Jalali calendar
Must include:
- Past-date blocking for new appointments
- Past days dimmed and accessible
- Holidays red and overrideable
- Doctor/unit conflict checks
- Durations and appointment types
- Incoming call quick-create flow

## Phase 5 — Finance engine MVP
Must include:
- Invoice/charge items
- Partial payments
- Cheque active flow
- Installment active flow
- Discounts amount/percent
- Debt alerts
- Role-based financial visibility

## Phase 6 — Treatment attribution and service catalog
Must include:
- Treatment item/stage doctor attribution
- Services except orthodontics
- Lab-linked treatment costs
- Multi-doctor case support

## Phase 7 — Lab + inventory
Must include:
- Fixed/mobile lab workflow
- Lab price/service list
- Lab due/delay alerts
- Inventory low/near-low alerts

## Phase 8 — Advanced dental chart + consent + print
Must include:
- Tooth/surface chart
- Treatment plan
- Signature/fingerprint/consent
- Receipt/prescription/print/export

## Phase 9 — Reports and compensation engine
Must include:
- Dr. Mina formula
- Dr. Mehdi/owner reports
- Other doctor formula engine
- Salary/expense reports

## Phase 10+ — AI, 3D, iPad Pencil, advanced imaging, online booking, integrations
These are future controlled phases requiring guardrails and runtime proof.
