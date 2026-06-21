# 141 — API/RPC, CI/CD, and Branch Protection Import

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Purpose
Useful rules from v23/v24 are imported as future repo governance. These do not authorize immediate GitHub/EAS setup until repo-init gate is approved.

## RPC naming convention
| Prefix | Meaning | Example |
|---|---|---|
| rpc_get_ | read operation | rpc_get_patient_by_file_number |
| rpc_create_ | create operation | rpc_create_appointment |
| rpc_update_ | update operation | rpc_update_appointment_status |
| rpc_delete_ | soft delete operation | rpc_delete_patient |
| rpc_calc_ | calculation | rpc_calc_doctor_share |
| rpc_report_ | reporting | rpc_report_daily_revenue |

## CI requirements for future repo
- TypeScript strict check.
- ESLint.
- circular import check.
- unit tests when tests exist.
- secret scan.
- package/version audit.
- build commands only when approved by build matrix.

## Branch protection future target
- No direct push to main.
- PR required.
- Required checks pass.
- No force push.
- Release/production build manual human trigger only.

## Current status
This file is governance-only. It is not permission to initialize CI, GitHub branch protection, or EAS build before Phase 0/1 approval.
