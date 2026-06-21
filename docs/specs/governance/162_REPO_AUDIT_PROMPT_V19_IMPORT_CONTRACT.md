# MinaDent Zero Rebuild — V1.11 Batch4 V16–V21 Prompt Audit

**Status:** `PHASE_0N_V16_V21_PROMPT_AUDIT_AND_PHASE1_PIPELINE_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / read-only audit / no code / no schema / no build / no connector  
**Source batch:** v16 Master Execution Contract, v17 Master Build Prompt, v18 Phase1 Execution Task, v19 Repo Audit Prompt, v20 Recovery Prompt TXT/DOCX/bundle, v21 Phase1 Build Prompt TXT/bundle.


# Repo Audit Prompt v19 — Imported Contract

## Why useful
v19 is valuable because it explicitly says repo audit is **inspection only** and forbids broad implementation, styling passes, screen creation, dependency churn, schema rewrites, or feature expansion before audit and safe plan.

## Canonical V1.11 rewrite
Use v19 only as `PHASE_0N_READONLY_REPO_AUDIT_PROMPT`. It must not create code.

## Required audited areas
- repository structure and architecture health
- app shell and Expo Router health
- TypeScript/import/route integrity
- dependency/version risk
- design-system foundation
- global RTL/Persian readiness
- font/icon/assets
- auth shell and role model
- expo-sqlite and expo-secure-store boundaries
- Supabase/env/migrations/RLS signals
- sync queue and durability
- loading/error/offline states
- buildability on Android/iPhone/Web
- fake/demo/placeholder risk
- immediate clinic-usability risk

## V1.11 additions
- Must include current V1.10/V1.11 governance identity.
- Must verify SDK54 compatibility or mark BLOCKER.
- Must not infer old project path from legacy files.
- Must report whether this is new Zero Rebuild repo or legacy repo.
- Must produce no files except read-only audit report, unless explicitly instructed.

## Mandatory final line
`NEXT SAFE STEP: <one precise next action>`
