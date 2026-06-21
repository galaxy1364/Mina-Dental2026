# 203 — Per-Phase Research and User Confirmation Protocol — V1.15

## Purpose
Prevent the AI from assuming that the current document is enough for all future design and technology details. The master pack defines the direction; each phase still requires up-to-date research and owner confirmation.

## Mandatory pre-phase research loop
Before coding any phase, the AI must:
1. Read source-of-truth files for the phase.
2. Search/verify up-to-date platform docs and relevant competitors if current facts matter.
3. Produce an options list with practical tradeoffs.
4. Mark each option as: MUST, RECOMMENDED, OPTIONAL, FUTURE, REJECTED.
5. Ask the owner to approve/tick only the choices that affect UI, workflow, business rule, cost, data, security or integration.
6. Update governance if the owner approves new scope.

## Required research categories per phase
### Design/Foundation
- Apple HIG / iOS visual patterns.
- Material Design 3 / Android behavior.
- Expo/React Native compatibility.
- Banking-inspired UX patterns from allowed references: structural inspiration only.
- Accessibility and RTL best practices.

### Dashboard
- Dental PMS dashboard concepts.
- Command center patterns.
- Role-based widgets.
- Operational alerts and work queues.
- Performance-safe aggregation.

### Scheduling
- Resource scheduling: doctor, unit, service, duration, conflicts.
- Jalali calendar UI and Tehran timezone handling.
- Waitlist/smart-fill/no-show lifecycle.
- Online booking constraints and approval flows.

### Patients
- Patient identity, duplicate policy, relation linking, archive/restore.
- Clinical/financial privacy by role.
- Large-list performance.

### Clinical/Dental Chart
- Tooth/surface notation, endo/prosthetic/implant workflows.
- Consent, risk warning and clinical safety prompts.
- 3D/iPad/Pencil feasibility split.

### Finance
- Iranian cheque/installment/payment reality.
- Doctor share formulas and auditability.
- Discount approval/settlement/revenue leakage.

### Lab/Inventory
- Lab lifecycle, SLA, shade/tooth/material, cost and rework.
- Inventory threshold, expiry, treatment consumption.

### CRM/Communication
- SMS provider availability/credential proof.
- WhatsApp/business messenger restrictions.
- Consent, opt-out, delivery log.

### AI
- Provider selection, privacy, logging, human-in-the-loop.
- No diagnosis/autonomous clinical decisions.
- Persian command parsing with preview and audit.

## If web/research is unavailable
Return:
`STOP_BLOCKER_RESEARCH_UNAVAILABLE`
Do not pretend deep research was performed.

## Owner confirmation format
The AI must present decisions in short tickable form:
- [ ] Add now
- [ ] Keep as future hook
- [ ] Reject
- [ ] Needs more examples

## No endless questioning rule
Ask only questions that materially affect irreversible design, schema, security, legal, financial or implementation direction. Everything else should be proposed as safe defaults and documented.
