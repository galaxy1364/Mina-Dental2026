# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 71 — V54 to Zero Requirement Import Protocol

### Goal
تبدیل legacy/v54 به requirementهای پاک، قابل تست و قابل اجرا بدون کپی مستقیم code.

### Import steps
1. Identify source file and section.
2. Extract intent, not code.
3. Mark risk: safe / needs rewrite / blocked / future.
4. Assign Requirement ID.
5. Assign Module ID.
6. Add acceptance criteria.
7. Add evidence criteria.
8. Add data/RBAC/sync/audit impact.
9. Add screen contract impact.
10. Add to STATUS/RESUME if approved.

### Requirement record format
```text
REQ-ID:
SOURCE:
INTENT:
MODULE:
PHASE:
PRIORITY:
DECISION: ACCEPT / REWRITE / REJECT / FUTURE / BLOCKED
DATA_CONTRACT:
SCREEN_CONTRACT:
RBAC_AUDIT_SYNC:
TESTS:
EVIDENCE:
BLOCKERS:
```

### Import blockers
- Missing source file context.
- Conflict with master data.
- External API unverified.
- AI medical/legal risk.
- Payment/security risk.
- Schema not designed.
- UI-only/dead action.

### Output
Every import batch must produce:
- updated Requirement Traceability Matrix
- updated Module Blueprint
- updated Conflict Register
- updated STATUS/RESUME
- SHA256 manifest
