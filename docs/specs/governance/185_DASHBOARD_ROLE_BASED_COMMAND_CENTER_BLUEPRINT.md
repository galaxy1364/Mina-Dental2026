# 185 — Dashboard Role-based Command Center Blueprint

Status: BLUEPRINT_LOCKED_NOT_IMPLEMENTED  
Purpose: convert dashboard scope into phase-ready command center contracts.

## Screen structure

1. Top Bar
   - clinic name
   - Jalali date
   - online/offline/sync indicator
   - notification bell
   - Persian command/search

2. Critical Strip
   - sync
   - backup
   - critical alerts
   - overdue patients
   - overdue finance

3. Today Command Cards
   - appointments
   - present patients
   - late patients
   - no-show
   - revenue
   - debt
   - lab
   - cheques/installments

4. Live Timeline
   - day slots
   - doctor/unit
   - free gap
   - conflict
   - delay

5. Smart Work Queues
   - reception
   - doctor
   - finance
   - lab
   - CRM
   - approvals

6. Module Grid
   - patients
   - scheduling
   - treatment
   - dental chart
   - finance
   - lab
   - insurance
   - CRM/SMS
   - reports
   - inventory
   - settings
   - backup/sync/security

7. Daily Huddle / End-of-day Closeout
   - start day risk summary
   - all appointments must have status
   - all payments reconciled
   - sync/backup checked
   - no-shows followed up

## Role-specific command center

| Role | Must show | Must hide by default |
|---|---|---|
| Manager | all KPIs, risk, approvals, doctor/unit performance, finance summary | none except privacy rules |
| Secretary | appointments, patient lookup, intake, duplicate warnings, follow-ups | full revenue, all doctor shares, sensitive finance |
| Doctor | own patients, next patient, chart, treatment, clinical risk, own allowed share | other doctors' share, clinic-wide finance |
| Assistant | chair prep, patient inside unit, tools/materials, imaging/forms | finance and sensitive management |
| Finance | payments, debt, cheques, installments, cash closeout, discrepancy | clinical notes unless allowed |
| Lab | sent/received/overdue/rework cases, delivery, cost fields if allowed | full patient finance/clinical unrelated |
| CRM | leads, campaigns, recall, conversion, communication tasks | sensitive medical/finance unless permitted |
| Admin/System | sync, backup, security, audit, device, migration/health | clinical content unless manager |

## Contract IDs

Every dashboard card must map to:
- `DASH_CARD_ID`
- `SOURCE_SELECTOR_ID`
- `ACTION_ROUTE_ID`
- `RBAC_RULE_ID`
- `AUDIT_EVENT_ID`
- `SYNC_IMPACT_ID`
- `TEST_ID`
- `EVIDENCE_ID`

## Phase placement

Dashboard visual shell belongs after Foundation Kernel/Design Foundation/Smart Operating Brain contracts are ready. Full live dashboard implementation must not precede patient/scheduling/finance/lab selectors unless the card is honestly CONTRACT_BACKED or DISABLED.
