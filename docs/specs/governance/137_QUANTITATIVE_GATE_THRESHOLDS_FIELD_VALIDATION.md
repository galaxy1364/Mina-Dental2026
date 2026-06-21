# 137 — Quantitative Gate Thresholds and Field Validation

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Purpose
Qualitative terms like “fast”, “stable”, “safe”, and “world-class” are forbidden unless translated into measurable gate thresholds.

## Metric tag states
- `LOCKED`: required baseline unless an approved ADR changes it.
- `PROVISIONAL`: target used until measured on user device/field data.
- `FIELD_VALIDATED`: measured with retained evidence on real or representative device/data.

## Initial threshold table
| Area | Target | Tag | Evidence |
|---|---:|---|---|
| Startup fatal error rate | 0 in approved preview/runtime builds | LOCKED | Expo/device runtime evidence |
| Crash-free sessions | >= 99.5% preview target, >= 99.9% production target | PROVISIONAL until telemetry | Sentry/telemetry report |
| Cold boot | P95 <= 4s dev build, <= 6s mid device | PROVISIONAL | 30-sample startup report |
| Warm resume | P95 <= 1.5s | PROVISIONAL | foreground-resume measurement |
| Local patient search | P95 <= 300ms at 100k indexed records | PROVISIONAL | synthetic indexed dataset on device |
| Queue enqueue | P95 <= 80ms | PROVISIONAL | SQLite insert benchmark |
| Offline durability | 0 lost writes after kill/reopen | LOCKED | forced restart scenario |
| Sync retryable success | >= 99% over 24h excluding provider outage | PROVISIONAL | sync telemetry/scenario |
| Conflict handling | 100% conflicts surfaced, 0 silent overwrite | LOCKED | conflict tests |
| Backup success | >= 99% scheduled backup success | LOCKED | backup logs |
| Restore drill | 100% success on required cadence | LOCKED | signed drill report |
| Auth redirect after login | <= 2.5s | PROVISIONAL | E2E log |

## Gate rule
If a metric cannot be measured in a phase, it must be marked `NOT_MEASURED_YET` with reason. It cannot be treated as PASS.
