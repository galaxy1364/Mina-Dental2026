# MinaDent Zero Rebuild — V1.11 Batch4 V16–V21 Prompt Audit

**Status:** `PHASE_0N_V16_V21_PROMPT_AUDIT_AND_PHASE1_PIPELINE_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / read-only audit / no code / no schema / no build / no connector  
**Source batch:** v16 Master Execution Contract, v17 Master Build Prompt, v18 Phase1 Execution Task, v19 Repo Audit Prompt, v20 Recovery Prompt TXT/DOCX/bundle, v21 Phase1 Build Prompt TXT/bundle.


# AI Builder Prompt Quarantine and Rewrite Rules

## Problem
v16–v21 are useful, but they contain direct execution language such as “Now execute...” and “Build Phase 1...”. In MinaDent Zero Rebuild, direct execution is not allowed unless converted to a frozen packet.

## Quarantine rule
Any legacy prompt must be classified as one of:

| Class | Meaning | Allowed use |
|---|---|---|
| SOURCE_REQUIREMENT | Contains valid requirement | import to governance |
| AUDIT_TEMPLATE | Safe read-only audit | can become read-only packet |
| RECOVERY_TEMPLATE | Useful after audit blocker | can become recovery packet |
| BUILD_TEMPLATE | Useful for implementation | only after owner-approved Phase packet |
| DIRECT_EXECUTION_RISK | Executes too early | quarantine and rewrite |
| DUPLICATE | Already covered | do not re-add |

## Rewrite requirements
Before any legacy prompt is sent to Replit:
- Replace “execute now” with phase-specific gate.
- Add current V1.11 status and resume point.
- Add exact allowed/forbidden files.
- Add no-build/no-schema/no-package unless explicitly allowed.
- Add evidence contract.
- Add stop conditions.
- Add “Executor has zero architectural authority.”
- Add SDK54/Expo Go guard.
- Add ZIP/manifest/update requirement.

## Absolute ban
Legacy prompt text must never be pasted raw into Replit if it can:
- start code generation without audit
- install packages without approval
- modify package/config/native files
- build old project path
- mix old SDK/baseline
- claim runtime pass without phone evidence
