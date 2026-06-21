# MinaDent Zero Rebuild — V1.11 Batch4 V16–V21 Prompt Audit

**Status:** `PHASE_0N_V16_V21_PROMPT_AUDIT_AND_PHASE1_PIPELINE_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / read-only audit / no code / no schema / no build / no connector  
**Source batch:** v16 Master Execution Contract, v17 Master Build Prompt, v18 Phase1 Execution Task, v19 Repo Audit Prompt, v20 Recovery Prompt TXT/DOCX/bundle, v21 Phase1 Build Prompt TXT/bundle.


# Foundation Kernel Phase 1 Acceptance Synthesis

This file merges v16–v21 with V1.10 governance and current MinaDent Zero Rebuild direction.

## Phase 1 accepted scope
| Foundation area | Required status before Phase 1 gate |
|---|---|
| App shell | real route shell, not business module |
| Expo Router | stable routes, no duplicate app shells |
| Config | typed env loader, visible missing-config failure |
| Supabase | exactly one client creation point |
| Auth/session | shell + hydration path + secure policy |
| Roles | typed role ids, deny-by-default shell |
| SQLite | local_meta, sync_queue, user_session_cache, app_boot_audit, feature_flags/local settings as approved |
| Sync queue | durable, no fake SYNCED before cloud ACK |
| RTL/Persian | root RTL, Persian font strategy, Persian user text |
| Theme | design tokens, semantic colors, spacing, radius, typography |
| UI states | loading/error/empty/offline/retry/saved locally/pending sync/conflict |
| Diagnostics | central logger, startup error surfacing, PII-safe logs |
| Phone preview | Expo Go54 or approved dev build path |
| Evidence | static gates + phone evidence where UI involved |

## Phase 1 forbidden scope
- Patient CRUD
- appointment booking
- treatment record
- finance/payment/debt/check/installment engines
- lab workflows
- inventory
- SMS provider
- AI/voice
- reports/doctor share
- production deployment claims

## Phase 1 status rule
If code exists but phone/runtime evidence is missing:
`IMPLEMENTED BUT NOT VERIFIED`

If screen is present but no logic/persistence:
`SHELL ONLY`

If TypeScript/import/startup fails:
`BROKEN`

No “Done/Ready/Working” as status.
