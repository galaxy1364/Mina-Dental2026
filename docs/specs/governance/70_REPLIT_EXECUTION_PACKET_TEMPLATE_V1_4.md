# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 70 — Replit Execution Packet Template V1.4

### Purpose
این template تنها قالب مجاز برای دادن کار اجرایی به Replit است. قبل از implementation باید read-only audit و phase gate پاس شود.

```text
MINADENT ZERO REBUILD — EXECUTION PACKET V1.4
ROLE: EXECUTOR ONLY. NO ARCHITECTURAL AUTHORITY.

BATCH_ID: BATCH-<PHASE>-<MODULE>-<SEQ>
PHASE: <exact phase from Roadmap>
RESUME_POINT: <from RESUME_STATE.md>
STATUS_BEFORE: <from STATUS.md>

READ FIRST, IN THIS ORDER:
1. README_START_HERE.md
2. 00_MINADENT_CONSTITUTION.md
3. 38_SOURCE_OF_TRUTH_HIERARCHY_AND_CONTEXT_RESOLUTION.md
4. 39_PROJECT_IDENTITY_AND_PATH_GUARD.md
5. 59_CHATGPT_SELF_AUDIT_RESPONSE_PROTOCOL.md
6. 61_LEGACY_INPUT_AUDIT_LEDGER.md
7. 62_V54_CONFLICT_REGISTER.md
8. Current module blueprint
9. STATUS.md
10. RESUME_STATE.md

STRICTLY FORBIDDEN:
- No code outside allowed files.
- No build/install/schema/native/package/connector unless explicitly listed.
- No direct legacy copy.
- No mock/demo/placeholder/dead action.
- No secret/service_role/client leak.
- No UI without domain/data/action contract.

SCOPE:
<one small, testable task>

ALLOWED FILES:
- <list exact paths>

FORBIDDEN FILES:
- package.json unless allowed
- app.json unless allowed
- supabase/migrations unless allowed
- native android/ios unless allowed
- any unrelated module

IMPLEMENTATION REQUIREMENTS:
- Real code only.
- Persian/RTL only for user UI.
- Data contract preserved.
- RBAC/audit/sync implications stated.
- Tests stated and run.

COMMANDS ALLOWED:
- <exact commands only>

EVIDENCE REQUIRED:
- TypeScript output
- Lint output
- Secret scan output
- Governance check output
- Runtime screenshot/video if runtime phase
- File diff summary
- SHA256 manifest

STOP CONDITIONS:
- Any unclear source of truth
- Any dependency/build/schema need not pre-approved
- Any test failure
- Any risky legacy snippet
- Any mismatch with STATUS/RESUME

RESPONSE FORMAT:
BATCH_ID:
STATUS:
SCOPE:
FILES_CHANGED:
FORBIDDEN_TOUCHED:
COMMANDS_RUN:
TESTS:
EVIDENCE:
LIMITS:
NEXT:
RESUME_POINT:
```
