# 201 — Ultimate AI Handoff Package Structure — V1.15

## Goal
Define exactly where each part of MinaDent's master knowledge belongs when used with ChatGPT Projects, Replit, Claude, Cursor, Codex or any AI Builder.

## Layer A — Always-on short instructions
Place the smallest, strongest rules in the AI Project/Custom Instructions area.

Must include:
- You are an executor/architect under MinaDent V1.15.
- No demo, no fake, no placeholder persistence, no shell-only completion.
- No phase skipping.
- Source of truth is the governance pack, STATUS, RESUME, and evidence.
- Ask exact blocker questions only when critical data is missing.
- Feature complete requires Screen + Local DB + Sync Queue + Migration + RLS/server rule + Test Evidence.
- Persian/RTL/Jalali UI; Gregorian DB; no doctor name in SMS unless owner later changes policy.
- Expo Go SDK54 compatibility guard remains active until changed by approval.
- Every batch must update STATUS/RESUME/evidence/ZIP/manifest if it changes project truth.

Recommended files for always-on reading:
- `173_UNIVERSAL_FORBIDDEN_ACTIONS_REGISTRY.md`
- `174_ALWAYS_REPEAT_PHASE_HEADER_AND_GATE_TEMPLATE.md`
- `175_PHASE_RECURRING_CHECKLIST_NO_AI_DRIFT.md`
- `178_AI_CONTROL_SYSTEM_NO_OUT_OF_CONTROL.md`
- `200_FINAL_COMPLETENESS_AUDIT_VERDICT_AND_BOUNDARIES.md`
- `201_ULTIMATE_AI_HANDOFF_PACKAGE_STRUCTURE.md`

## Layer B — Knowledge / File attachments
Upload the ZIP or selected docs into the AI knowledge/files area to reduce prompt tokens.

Core file set:
- README_START_HERE.md
- STATUS.md
- RESUME_STATE.md
- PROJECT_FILE_INDEX.md
- 00_MINADENT_CONSTITUTION.md
- 01_MASTER_PRODUCT_BLUEPRINT.md
- 03_FOUNDATION_ARCHITECTURE.md
- 04_DESIGN_SYSTEM_CONTRACT.md
- 05_DATA_SYNC_BACKUP_CONTRACT.md
- 06_SECURITY_RBAC_AUDIT_CONTRACT.md
- 80_ZERO_ERROR_REAL_CODE_DELIVERY_SYSTEM.md
- 102_ZERO_ERROR_PHASE_1_FOUNDATION_DELIVERY_GATE.md
- 173_UNIVERSAL_FORBIDDEN_ACTIONS_REGISTRY.md
- 174_ALWAYS_REPEAT_PHASE_HEADER_AND_GATE_TEMPLATE.md
- 175_PHASE_RECURRING_CHECKLIST_NO_AI_DRIFT.md
- 196_MINADENT_FINAL_MASTER_VISION_TEXT_LOCK_V1_14.txt
- 200_FINAL_COMPLETENESS_AUDIT_VERDICT_AND_BOUNDARIES.md
- 202_MASTER_REQUIREMENT_COVERAGE_MATRIX_ZERO_TO_100.md
- 203_PER_PHASE_RESEARCH_AND_USER_CONFIRMATION_PROTOCOL.md
- 204_MODULE_DETAIL_BLUEPRINT_TEMPLATE_FOR_AI_BUILDERS.md
- 205_PHASE1_FOUNDATION_TO_FIRST_CODE_READINESS_GATE.md
- 206_FINAL_OPEN_ITEMS_AND_OWNER_DECISION_REGISTER.md

## Layer C — Batch prompt
Each Replit/Cursor/Claude Code session should receive only the current batch prompt, not the entire giant master text.

Batch prompt must include:
- current phase and batch ID;
- allowed files;
- forbidden files;
- exact commands;
- stop conditions;
- required evidence;
- rollback point;
- resume point;
- required STATUS/RESUME/manifest update.

## Layer D — Evidence bundle
Every meaningful change must produce:
- raw terminal output;
- test output;
- screenshots or runtime video if UI;
- list of changed files;
- hash/manifest;
- known limits;
- next resume point.

## Token economy rule
Never paste the entire master all-in-one into every implementation prompt. Use:
1. Always-on short rules.
2. Relevant attached files.
3. Current batch packet.
4. Exact evidence request.

## Direct execution prohibition
Legacy prompts, HTML previews, scaffold ZIPs and old code packages must not be executed directly. They must be converted into safe batch packets first.
