# 125 — Requirement ID and Traceability Enforcement Imported from V16
Version: V1.8
Status: LOCKED

## قانون
از این نسخه به بعد هیچ feature، prompt، batch، commit، test یا evidence نباید بدون شناسه traceability اجرا شود.

## شناسه‌های اجباری
| ID | معنی |
|---|---|
| REQ-ID | نیازمندی |
| MOD-ID | ماژول |
| ENT-ID | موجودیت داده |
| PERM-ID | سطح دسترسی |
| AUDIT-ID | رویداد audit |
| TEST-ID | تست |
| EVID-ID | evidence |
| DEC-ID | تصمیم/ADR |
| RISK-ID | ریسک |
| BATCH-ID | بسته اجرایی |

## قالب REQ-ID
- REQ-FND-xxx foundation
- REQ-AUTH-xxx auth/RBAC
- REQ-PAT-xxx patients
- REQ-SCH-xxx scheduling
- REQ-JRN-xxx journey/timeline
- REQ-CLN-xxx clinical/chart
- REQ-FIN-xxx finance
- REQ-LAB-xxx lab
- REQ-IMP-xxx implant
- REQ-INV-xxx inventory
- REQ-CRM-xxx CRM/SMS
- REQ-RPT-xxx reports
- REQ-OPS-xxx backup/release/support
- REQ-AI-xxx AI assistant
- REQ-UI-xxx design system

## Enforcement
A Replit/AI output is INVALID if it lacks:
- BATCH-ID
- linked REQ-ID(s)
- file allowlist
- tests linked to TEST-ID(s)
- evidence linked to EVID-ID(s)
- resume point

## STOP codes
- STOP_BLOCKER_REQUIREMENT_ID_MISSING
- STOP_BLOCKER_TRACEABILITY_BROKEN
- STOP_BLOCKER_EVIDENCE_ID_MISSING
- STOP_BLOCKER_UNMAPPED_FEATURE
