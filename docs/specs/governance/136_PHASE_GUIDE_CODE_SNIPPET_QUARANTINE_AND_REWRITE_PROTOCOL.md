# 136 — Phase Guide Code Snippet Quarantine and Rewrite Protocol

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Problem
The Phase-by-Phase Code Guide contains useful implementation ideas, package scripts, SQL, UI examples, hooks, and module snippets. However, it also contains old stack assumptions, broad file creation, direct execution commands, and partial examples. Direct copy can reintroduce previous failures.

## Quarantine rule
All code snippets from legacy documents are classified as:
- `PATTERN_REFERENCE` — useful idea only.
- `REWRITE_REQUIRED` — may be implemented later after current stack/ADR and tests.
- `REJECTED_DIRECT_COPY` — not allowed to enter current repo as-is.

## Mandatory rewrite before implementation
A snippet may become real code only after:
1. Current SDK/Expo Go54 compatibility review.
2. Current folder structure review.
3. Current design-system/token review.
4. Current offline-first/local DB strategy review.
5. Current schema/RLS contract review.
6. Current test/evidence plan.
7. Allowed files and forbidden files list.
8. Rewritten code by Architect for the current repo.

## High-risk patterns in uploaded Phase Guide
- Direct `bun create expo-app` / repo init commands.
- Old package versions bound to SDK53 assumptions.
- Direct SQL examples before entity-contract freeze.
- `select('*')` module examples without strict DTO/RPC boundaries.
- UI snippets that are useful but not banking-grade / not final design tokens.
- Cloud-first patient creation fallback that may not satisfy local-first write durability.

## Import decision
Do not copy. Convert to:
- implementation backlog,
- required acceptance tests,
- migration backlog,
- UI pattern inspiration,
- denylist/rewriter rules.
