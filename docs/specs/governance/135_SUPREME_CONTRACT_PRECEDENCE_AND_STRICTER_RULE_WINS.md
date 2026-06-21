# 135 — Supreme Contract Precedence and Stricter Rule Wins

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Purpose
This file prevents document chaos when many legacy contracts are uploaded.

## Current precedence order
1. Platform/system safety rules.
2. Latest explicit user instruction in current project, if not unsafe.
3. Latest MinaDent Zero Rebuild ZIP governance pack: **V1.9**.
4. STATUS.md and RESUME_STATE.md inside the latest ZIP.
5. Real clinic data locked in V1.7 and later patches.
6. Expo Go SDK54 runtime ADR and compatibility guard.
7. Legacy documents only after audit/dedup/import.
8. Chat messages and memory only as supporting context, not source of truth.

## Stricter-rule rule
If two non-conflicting rules exist, the stricter rule wins. If two rules conflict, the current source-of-truth hierarchy decides. If conflict remains unresolved, return:

`STOP_BLOCKER_CONTRACT_PRECEDENCE_CONFLICT`

## Examples
- Old contract says SDK 53, current phone evidence says Expo Go SDK54: use SDK54-compatible path or development build ADR.
- Old contract says Abolfazl Farahani active, latest clinic data says only Dr. Mehdi and Dr. Mina active: use latest V1.7 clinic data and keep others addable/manual.
- Old guide gives full code for phase 2 before Phase 1 evidence: do not execute; convert to future rewritten batch only.

## Mandatory executor behavior
Before using any uploaded contract, executor must declare:
- Source file name.
- Whether it is current canonical, historical, superseded, or input-only.
- Which exact clauses are imported.
- Which exact clauses are rejected or deferred.
