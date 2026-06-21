# MinaDent Zero Rebuild — V1.11 Batch4 V16–V21 Prompt Audit

**Status:** `PHASE_0N_V16_V21_PROMPT_AUDIT_AND_PHASE1_PIPELINE_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / read-only audit / no code / no schema / no build / no connector  
**Source batch:** v16 Master Execution Contract, v17 Master Build Prompt, v18 Phase1 Execution Task, v19 Repo Audit Prompt, v20 Recovery Prompt TXT/DOCX/bundle, v21 Phase1 Build Prompt TXT/bundle.


## Canonical pipeline imported from v16–v21

V1.11 قفل می‌کند که مسیر درست از فایل‌های جدید این نیست که Replit مستقیماً Phase 1 را بسازد. مسیر استاندارد باید سه‌دروازه‌ای باشد:

```text
PHASE_0N_READONLY_REPO_AUDIT
→ PHASE_0O_RECOVERY_PLAN_IF_AUDIT_FINDS_BLOCKERS
→ PHASE_1_FOUNDATION_KERNEL_IMPLEMENTATION_PACKET
```

## Gate A — Phase 0N Read-only Repo Audit
**Allowed:** inspect files, tree, configs, package, routes, imports, env usage, Supabase client, SQLite, sync, RTL, theme, states, tests.  
**Forbidden:** code changes, package install/change, schema, build, feature implementation.

Required output:
- Executive verdict
- Repository snapshot
- What was inspected
- Static checks possible
- Runtime checks possible
- Architecture health
- Findings by area
- Root-cause groups
- Phase 1 blockers
- Minimal safe recovery plan
- What must not change
- Honest status matrix
- Known unknowns
- Resume point

## Gate B — Recovery Plan / Recovery Pass
Only if Phase 0N proves blockers exist. Recovery is limited to:
- dependency correction if already allowed
- import/path correction
- route registration
- startup stabilization
- env/config normalization
- central client wiring
- central storage/db/sync foundation
- error/loading/offline foundations
- RTL/theme/font initialization
- freezing dead/broken code that blocks startup

Recovery cannot build Patients/Scheduling/Finance/Lab/Inventory.

## Gate C — Phase 1 Foundation Implementation
Only after A/B PASS or approved partial. Phase 1 implements:
- App shell + Expo Router shell
- Typed config/env loader
- Single Supabase client foundation
- Auth/session shell
- Role model foundation
- SQLite local database foundation
- Durable sync queue foundation
- Global RTL + Persian font + theme tokens
- Loading/error/empty/offline/retry/saved locally/pending sync states
- Diagnostics/logger
- Foundation diagnostics screen
- Phone/Expo Go54 preview path

## Rejection conditions
- Audit prompt starts coding → INVALID
- Recovery prompt builds business modules → INVALID
- Phase 1 prompt adds Patient CRUD → INVALID
- Any result claims VERIFIED REAL without evidence → INVALID
- Any implementation starts before owner-approved packet → INVALID
