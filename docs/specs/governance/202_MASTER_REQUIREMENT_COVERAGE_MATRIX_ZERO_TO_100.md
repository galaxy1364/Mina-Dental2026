# 202 — Master Requirement Coverage Matrix Zero-to-100 — V1.15

## Status legend
- DOCUMENTED: captured in governance.
- NEEDS PHASE RESEARCH: must be researched/benchmarked at execution time.
- NEEDS OWNER CHOICE: owner must pick among options.
- NEEDS CODE: not implemented yet.
- NEEDS DEVICE EVIDENCE: UI/runtime must be proven on device.

| Domain | Coverage in master pack | Remaining execution requirement |
|---|---|---|
| Product Identity | DOCUMENTED | Convert to app metadata and brand settings after owner confirms final display name. |
| Banking-grade Design | DOCUMENTED | Extract into tokens/components; owner approves visual samples; no direct brand copy. |
| iOS/Android/Web Behavior | DOCUMENTED | Platform-native implementation and QA matrix per platform. |
| Dashboard Command Center | DOCUMENTED | Build from Smart Brain selectors; no fake counts; runtime test. |
| Smart Persian Calendar | DOCUMENTED | Implement Jalali UI / Gregorian DB / color indicators / badge counts / day panel. |
| Smart Appointment Engine | DOCUMENTED | Implement call-intake search, quick patient create, scheduling conflict logic. |
| Online Booking | DOCUMENTED + OPEN POLICY | Owner chooses doctor-name visibility policy; server-side capacity rules. |
| Universal Search | DOCUMENTED | Build indexed local + cloud search with normalized Persian/phone/code/file. |
| Patient Master | DOCUMENTED | Schema, local DB, duplicate checks, relation linking, archive/restore, runtime test. |
| Patient Journey Timeline | DOCUMENTED | Universal activity timeline with event sourcing/audit and role filtering. |
| Dental Chart | DOCUMENTED | Phased implementation: 2D structured chart first, 3D/iPad/Pencil as future advanced phase. |
| Treatment Engine | DOCUMENTED | Structured procedure/tooth/surface/doctor/finance/lab/appointment linking. |
| Implant Engine | DOCUMENTED | Fixture/abutment/crown/stage/lab/finance/doctor-share exceptions. |
| Finance Engine | DOCUMENTED | Payments, partials, cheque, installment, discount, debt, settlement, audit. |
| Doctor Share Engine | DOCUMENTED | Server-side/RPC/Edge logic, explainable formula, override audit. |
| Lab Management | DOCUMENTED | Fixed/mobile labs, SLA, costs, status, rework, delivery appointment. |
| Inventory | DOCUMENTED | Stock, threshold, expiry, treatment-linked consumption, alerts. |
| CRM/Communication | DOCUMENTED | SMS/WhatsApp/Bale/Eitaa hooks; real provider credentials and delivery proof needed. |
| Reports/Analytics | DOCUMENTED | KPIs, daily closeout, doctor, finance, debt, lab, inventory, no-show, export. |
| AI Assistant | DOCUMENTED | Must use preview/confirmation/RBAC/audit; no autonomous sensitive action. |
| RBAC/Audit | DOCUMENTED | Deny-by-default, RLS, old/new, reason, approval queue, role runtime tests. |
| Sync/Backup | DOCUMENTED | SQLite queue, conflict resolution, cloud/local backup, restore test evidence. |
| Performance | DOCUMENTED | 200k patient design: virtualization, indexes, pagination, budgets, load tests. |
| Legal/Consent/Print | DOCUMENTED | Final official assets and local legal review needed before legal claims. |
| Multi-clinic/branch | DOCUMENTED | Feature-flagged architecture; MVP clinic-scoped first. |
| Forever Updates | DOCUMENTED | Every new decision patches ZIP/STATUS/RESUME/manifest. |

## Conclusion
No major requirement category is knowingly absent at the governance level. The remaining work is implementation, per-phase research, owner selection of visual/options, and evidence collection.
