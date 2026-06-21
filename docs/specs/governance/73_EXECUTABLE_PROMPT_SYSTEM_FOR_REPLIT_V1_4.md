# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 73 — Executable Prompt System for Replit V1.4

### Important
این فایل «پرامپت اجرایی امن» است؛ اما اجرای آن هنوز فقط برای audit/placement است، نه ساخت feature.

### Phase 0F — Legacy Merge Audit Prompt
```text
MINADENT ZERO REBUILD V1.4 — PHASE 0F LEGACY MERGE AUDIT

You are the EXECUTOR ONLY. Do not code. Do not install. Do not build. Do not edit source.

Goal:
Verify that the V1.4 governance pack is present, internally consistent, and includes safe legacy-to-governance conversion files.

Read:
- README_START_HERE.md
- STATUS.md
- RESUME_STATE.md
- 61_LEGACY_INPUT_AUDIT_LEDGER.md
- 62_V54_CONFLICT_REGISTER.md
- 63_ACCEPT_REWRITE_REJECT_MATRIX.md
- 67_RISKY_CODE_DENYLIST_AND_SANITIZATION_RULES.md
- 70_REPLIT_EXECUTION_PACKET_TEMPLATE_V1_4.md

Tasks:
1. List all V1.4 files present.
2. Verify no file instructs direct legacy code copy into source.
3. Verify STOP_BLOCKER rules exist for risky snippets.
4. Verify STATUS says no code/build/schema/connector.
5. Verify RESUME_POINT is PHASE_0G_REPO_INIT_GUARD_PENDING or equivalent.
6. Output PASS/FAIL with exact missing files.

Forbidden:
- No code changes.
- No build.
- No package install.
- No schema.
- No connector.
- No external API.

Response format:
BATCH_ID: BATCH-PH0F-V14-READONLY-AUDIT-001
STATUS: PASS or STOP_BLOCKER
FILES_CHECKED:
MISSING:
CONFLICTS:
EVIDENCE:
NEXT:
RESUME_POINT:
```

### Phase 0G — Repo Init Guard Prompt
```text
MINADENT ZERO REBUILD V1.4 — PHASE 0G REPO INIT GUARD

You are the EXECUTOR ONLY. Do not create project yet unless all gates pass.

Goal:
Prepare a repo-init plan only. No commands unless the Architect explicitly approves after this audit.

Read all governance files and report:
1. Proposed project name/slug/package must be MinaDent-specific.
2. Stack ADR status.
3. Whether legacy/v54 stack conflict is resolved.
4. Whether clinic master data blockers exist.
5. Exact commands proposed for repo creation.
6. Risks and rollback.

Forbidden:
- Do not run create-expo-app.
- Do not install packages.
- Do not create schema.
- Do not build.

Output:
STATUS must be PLAN_ONLY_NOT_EXECUTED.
```
