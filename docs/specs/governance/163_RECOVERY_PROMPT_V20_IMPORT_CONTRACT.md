# MinaDent Zero Rebuild — V1.11 Batch4 V16–V21 Prompt Audit

**Status:** `PHASE_0N_V16_V21_PROMPT_AUDIT_AND_PHASE1_PIPELINE_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / read-only audit / no code / no schema / no build / no connector  
**Source batch:** v16 Master Execution Contract, v17 Master Build Prompt, v18 Phase1 Execution Task, v19 Repo Audit Prompt, v20 Recovery Prompt TXT/DOCX/bundle, v21 Phase1 Build Prompt TXT/bundle.


# Recovery Prompt v20 — Imported Contract

## Why useful
v20 is useful as a **post-audit recovery prompt**. It requires root-cause-first diagnosis before any patch and limits recovery to foundations.

## V1.11 safe import
Recovery can only run after Phase 0N audit proves one or more blockers. It must be a separate packet, not hidden inside audit.

## Allowed recovery categories
- dependency correction only if approved
- import/path correction
- route registration correction
- app startup stabilization
- env config normalization
- one Supabase client wiring
- secure storage boundary
- local DB bootstrap
- sync queue bootstrap
- error/loading/offline foundations
- global RTL/theme/font initialization
- freeze dead code blocking startup

## Forbidden recovery categories
- building Patients/Scheduling/Finance/Lab/Inventory
- broad module redesign
- deep visual redesign
- speculative architecture rewrite
- schema changes without approved migration packet
- dependency churn
- any claim of verified runtime without real evidence

## Recovery verdict options
V1.11 adopts the final decision model:
- PROCEED_TO_PHASE_1_IMPLEMENTATION
- DO_ONE_MORE_RECOVERY_PASS
- REPO_REQUIRES_CONTROLLED_RESTRUCTURE
- RECOVERY_BLOCKED_BY_EXTERNAL_FACTOR
