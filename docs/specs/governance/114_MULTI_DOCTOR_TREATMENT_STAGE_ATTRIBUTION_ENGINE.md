# MinaDent V1.7 — Multi-Doctor Treatment Stage Attribution Engine

## Purpose
Prevent a major dental-clinic accounting/clinical mistake: assuming one patient or one case has only one doctor.

## Real clinic problem
A patient case may involve multiple doctors over time:
- First visit by one doctor
- Surgery by another
- Prosthetic/crown by another
- Implant fixture/abutment handled differently
- Follow-up by another
- Lab-related stages connected to one or more doctors

## Required attribution levels
MinaDent must support doctor/staff ownership at these levels:
1. Patient primary doctor (optional/default)
2. Appointment doctor
3. Encounter doctor
4. Treatment plan author
5. Treatment item doctor
6. Treatment stage doctor
7. Tooth/surface procedure doctor
8. Lab order responsible doctor/stage
9. Charge/invoice item attribution
10. Share formula applied to each attributed item
11. Manual override by manager with reason

## Treatment-stage examples
- Implant consultation
- Implant surgery
- Fixture/abutment tracking
- Prosthetic impression
- Crown/prosthesis delivery
- RCT session 1
- RCT session 2
- Restoration
- Extraction
- Surgery follow-up
- Pediatric procedure
- Composite phase

## Required UI behavior
When adding or completing treatment, user must be able to select:
- Doctor/provider for this item/stage
- Tooth number
- Surface(s)
- Procedure/service
- Lab link if needed
- Price/discount
- Status
- Next step/follow-up

## Required reports
- Treatment item breakdown by doctor
- Case breakdown by stages
- Patient timeline across doctors
- Lab costs per doctor/stage
- Doctor share based on actual attributed items

## Guardrails
- Never calculate doctor share only from patient primary doctor.
- Never hide a doctor change in a patient case.
- Every doctor attribution change requires audit.
- If attribution is missing for a chargeable item, financial closeout must warn/block according to role.
