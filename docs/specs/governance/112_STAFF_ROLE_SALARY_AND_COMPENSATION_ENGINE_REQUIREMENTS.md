# MinaDent V1.7 — Staff Role, Salary & Compensation Engine Requirements

## Purpose
Define a flexible compensation and salary engine suitable for the real clinic and future staff expansion.

## Staff categories
The app must support at minimum:
- Manager/owner
- Doctor
- Secretary
- Assistant
- Future lab/admin/accounting role if needed

## Secretary/assistant salary
Salary is not a hardcoded number. It must be configurable:
- Monthly fixed salary
- Daily/hourly optional future model
- Bonus/penalty optional future model
- Effective date
- Active/inactive
- Salary history
- Payment record
- Manager-only edit
- Audit log for all edits

## Doctor compensation rule types
The engine must support several rule types because doctors may work differently:
1. Percentage-based share
2. Fixed fee per treatment/service
3. Fixed fee per surgery/action
4. Formula-based share
5. Manual override with manager approval
6. Mixed/hybrid rule
7. Treatment-stage-based rule
8. Lab-cost-aware rule
9. Discount-aware rule
10. Special case rule per patient/case

## Locked current rules
### Dr. Mina Mazandarani
Formula:
```text
Mina Share = (Mina attributed treatment revenue - lab costs attributed to Mina treatments) / 2
```
Notes:
- Lab cost must be attached to treatment item/stage.
- Discounts must affect the base according to approved financial policy.
- Manager override must be audited.

### Dr. Mehdi / owner
Formula concept:
```text
Owner/Mehdi Share = attributed production - attributed lab costs - attributed operational costs when applicable
```
Notes:
- Because the owner also owns the clinic, reports must separate:
  - Clinical production by Dr. Mehdi
  - Clinic owner net view
  - Lab costs
  - Staff salary costs
  - Other clinic costs when entered

## Multi-doctor same patient/case rule
A single patient/case can involve multiple doctors:
- Surgery by doctor A
- Prosthetic/crown by doctor B
- Implant stage by doctor C
- Second surgery by doctor D
- Treatment plan edited by another doctor

Therefore doctor attribution cannot be patient-level only. It must exist at:
- Appointment level
- Encounter level
- Treatment item level
- Treatment stage level
- Lab order linkage level
- Invoice/charge item level
- Payment allocation level when needed

## Required outputs
The compensation engine must produce:
- Doctor production report
- Doctor net share report
- Owner/manager financial view
- Per-patient contribution breakdown
- Per-treatment doctor attribution
- Lab cost attribution
- Manual adjustments report
- Audit trail

## Safety rules
- Doctor share calculation must not be trusted if only client-side.
- Future cloud/backend calculation must be protected by RLS/Edge/server rules.
- No hidden automatic calculation without visible explanation to manager.
- Every formula version must be recorded with effective date.
