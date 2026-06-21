# MinaDent V1.7 — Real Clinic Master Data Lock

## Purpose
This document converts the user's latest real clinic information into a controlled master-data lock. This data is not source code yet. It is the canonical input for future schema/seed/workflow planning.

## Source
User-provided clinic details in chat on 2026-06-21. This document supersedes conflicting older v54/legacy assumptions where they differ.

## Clinic identity
- Product: MinaDent Zero Rebuild.
- Clinic: private dental clinic, Persian-first / Iranian workflow.
- Services: all common dental services except orthodontics, unless later explicitly enabled.
- Target capacity: at least 200,000 patient files.
- Existing file-number scale: around 4,000–5,000 existing patient files; production sequence must continue from the real latest number, not restart from 1.

## Active people now
| Person | Current role(s) | Notes |
|---|---|---|
| Dr. Mehdi / user | Manager/owner + active doctor | Owner, manager, clinical provider. Has full manager permissions. |
| Dr. Mina Mazandarani | Active doctor | Current doctor. Compensation rule locked separately. |
| Akram Eidi / Akram Eydi / اکرم عیدی | Secretary | Operational secretary. Salary tracking required. |

## Expandability requirement
The app must support adding, deactivating, and editing:
- Doctors
- Secretaries
- Assistants
- Future staff types
- Doctor compensation rules
- Salary rules
- Active/inactive status
- Role and permission assignments
- Per-staff audit trail

## Units
- Current units: 2 units.
- Unit Blue / آبی is explicitly mentioned.
- Another unit exists and must be supported as editable/addable.
- Units must be addable/deactivatable without schema rewrite.
- Unit schedule and availability must be configurable.

## Calendar and hours
- Working hours are not fixed permanently.
- Holiday and clinic closure/opening must be configurable.
- Iranian official holidays must be visually red in the Jalali calendar.
- Official holiday does not necessarily mean closed; manager can override open/closed.
- Private clinic holidays must be definable.
- Past dates must remain viewable/reportable/searchable.
- Booking in the past must be blocked except audited manager-only historical workflows.
- Past days/times must appear dimmer/darker in UI.

## Labs
The system must support:
- Fixed lab
- Smart/intelligent lab workflow
- Mobile/removable lab workflow
- Add/edit/deactivate labs
- Lab service price list
- Lab due dates
- Lab cost attribution per treatment item
- Lab delay alerts
- Lab cost participation in doctor-share formulas

## Inventory
The system must support:
- Inventory items
- Current stock
- Minimum threshold
- Near-low threshold
- Low-stock alert
- Near-low warning alert
- Treatment-linked consumption in future phases
- Manager-level adjustment with audit

## Patient identity rules
Mandatory patient identifiers:
- File number
- Mobile
- National code

Uniqueness rules:
- File number: unique, no duplicate.
- National code: unique, no duplicate.
- Mobile: can be shared by family/related patients, but must show duplicate warning and relationship workflow.

Relationship rule:
- If mobile or family relation is shared, enable relationship selection.
- Relationship should sync both directions where clinically/operationally useful.
- Relationship data must be audit-safe and searchable.

## Locked status
This document is canonical for real clinic master data as of V1.7.
No implementation may use conflicting older data without a reconciliation entry.
