# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 74 — Phase 0G Repo Init Readonly-to-Create Gate

### Current status
No repo creation is allowed until this gate is PASS.

### Gate checklist
| # | Gate | Required evidence | Status |
|---|---|---|---|
| 1 | V1.4 ZIP placed in new root | file list + SHA256 | PENDING |
| 2 | No existing wrong project mixed | empty/new repo evidence | PENDING |
| 3 | Stack ADR finalized | ADR-STACK-001_FINAL.md | PENDING |
| 4 | Project identity decided | name/slug/package/projectId plan | PENDING |
| 5 | Clinic master data conflicts handled | `68` updated or blocker accepted | PENDING |
| 6 | Secrets policy ready | `.env.example`, `.gitignore`, no real secrets | PENDING |
| 7 | Replit role limited | Executor-only prompt loaded | PENDING |
| 8 | Cost/build matrix read | no build permission | PENDING |
| 9 | External connector disabled | MCP/connectors off | PENDING |
| 10 | Legacy direct-copy blocked | denylist acknowledged | PENDING |

### PASS output required
```text
STATUS: PHASE_0G_REPO_INIT_READY_FOR_OWNER_APPROVAL
COMMANDS_PROPOSED: <not executed>
RISK: <list>
APPROVAL_REQUIRED: YES
```

### If any fail
```text
STOP_BLOCKER_PHASE_0G_REPO_INIT_NOT_READY
```
