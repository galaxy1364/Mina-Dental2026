# 138 — Operations Runbook, SLO/SLA, BCP/DR Import

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Purpose
The app cannot claim production-readiness without operations and recovery evidence.

## SLI/SLO/SLA distinction
- SLI: measured signal, e.g. login success rate, queue ACK success, restore success.
- SLO: internal target. MinaDent may define SLO before public commitment.
- SLA: external contractual promise. Do not promise SLA until legally/business-approved.

## Initial SLO candidates
| Domain | SLI | SLO | Evidence |
|---|---|---|---|
| Auth | login/session restore success | >= 99% | E2E/synthetic checks |
| Core API | successful request ratio | >= 99.5% | edge/APM logs |
| Sync Queue | end-to-end ACK success | >= 99%+ | queue telemetry |
| Search | P95 latency | local <=300ms, cloud <=800ms provisional | perf report |
| Backup/Restore | restore drill success | 100% | signed drill report |

## Mandatory runbooks
- Runbook-01 Auth/login/session failure.
- Runbook-02 Missing or invalid config/env.
- Runbook-03 SQLite init/local migration failure.
- Runbook-04 Sync queue backlog/dead-letter spike.
- Runbook-05 Search/query latency or timeout.
- Runbook-06 SMS/notification provider outage.
- Runbook-07 Backup restore/data recovery.
- Runbook-08 Secret exposure/suspicious login/security incident.
- Runbook-09 Release rollback/hotfix.

## DR/BCP minimums
- Backups must be encrypted, scheduled, monitored, logged.
- No backup claim without restore proof.
- Initial baseline: DB RPO <= 24h and RTO <= 8h unless stricter phase target adopted.
- Restore drill cadence must be defined before production claim.
- Every failed restore drill is a release blocker until triaged and fixed.
