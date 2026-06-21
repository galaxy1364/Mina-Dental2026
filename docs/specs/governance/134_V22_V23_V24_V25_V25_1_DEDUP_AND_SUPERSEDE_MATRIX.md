# 134 — V22/V23/V24/V25/V25.1 Deduplication and Supersede Matrix

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Rule
No legacy contract replaces the active MinaDent Zero Rebuild governance pack automatically. Every clause must be classified as **Already Covered**, **Accept and Strengthen**, **Rewrite**, **Reject**, or **Future Backlog**.

## Dedup matrix
| Topic | Legacy source strength | Existing MinaDent V1.8/V1.7 status | Action |
|---|---|---|---|
| No demo / no fake / no placeholder | v22–v25.1 all repeat this | Already covered strongly | Keep, do not duplicate |
| Persian-first/RTL/Jalali UI/Gregorian DB | repeated in v22–v54 | Already covered | Keep as canonical universal rule |
| Expo SDK stack | old docs mention SDK 51/53/53+ | V1.4.1 locks Expo Go 54 constraint | Rewrite through SDK54 ADR only |
| Phase order | v16/v25/v54 have similar order | V1.8 has SDLC import, V1.7 has real clinic data | Merge only stricter gates |
| RLS/Edge/server business logic | strong in v54/v25 | Covered, but useful for backend/RLS | Strengthen backend guardrails |
| Quantitative performance | v25 hardening/v25.1 strong | partly covered | Import as tagged baselines |
| SLO/SLA distinction | v25 hardening strong | not explicit enough | Import |
| DR/BCP/restore drill | v25 hardening/v25.1 strong | partly covered | Import and require evidence |
| RACI/waiver/sign-off | v25.1 strong | missing enough detail | Import |
| CI/CD and branch protection | v23 strong | partly covered | Import as future repo governance, not immediate execution |
| Replit executor protocol | v24 strong | already covered | Merge output template details only |
| Code snippets and SQL | Phase Guide/v54 provide examples | Not safe for direct merge | Quarantine and rewrite |
| Doctor/clinic defaults | v54 conflicts with latest user input | V1.7 current truth | Reject conflicting old defaults |
| Appointment hours 08–24 | old v54 says 08–24 | latest user wants editable/24h/holiday override | Rewrite as configurable operations policy |

## Supersede logic
- Legacy v25.1 supersedes v22/v23/v24/v25 **inside its own lineage**.
- MinaDent Zero Rebuild V1.9 supersedes previous ZIP versions **for current project execution**.
- Latest user-provided real clinic data in V1.7 supersedes all older clinic defaults.
- Expo Go SDK 54 constraint supersedes old SDK 51/53 recommendations unless a development-build ADR is approved.
