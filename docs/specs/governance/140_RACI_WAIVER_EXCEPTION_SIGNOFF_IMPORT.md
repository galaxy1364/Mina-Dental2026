# 140 — RACI, Waiver, Exception, and Sign-off Import

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Purpose
Every critical area must have owner responsibility and every exception must expire.

## Minimum RACI areas
| Area | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| Architecture and phase scope | Architect AI | Human Owner | Executor | stakeholders |
| DB schema and migrations | Architect AI | Human Owner | Executor | release reviewer |
| RLS/security review | Architect AI | Human Owner | Executor | release reviewer |
| Sync/offline conflict | Architect AI | Human Owner | Executor | support |
| Backup/restore drill | Executor under packet | Human Owner | Architect AI | release reviewer |
| Release approval | Architect AI prepares | Human Owner approves | Executor | stakeholders |
| Incident response | assigned per runbook | Human Owner | Architect AI | affected users |
| Risk acceptance | Architect AI drafts | Human Owner approves | relevant reviewer | stakeholders |

## Waiver rule
No exception is valid unless recorded with:
- waiver ID,
- rule reference,
- exact scope,
- reason,
- introduced risk,
- compensating controls,
- approver,
- expiry date,
- closure state.

## Allowed sign-off states
- Draft
- Under Review
- Approved
- Conditionally Approved
- Rejected
- Superseded

## Blocking rule
Unregistered exceptions are violations. Expired waivers are invalid immediately.
