# MinaDent Zero Rebuild — V1.12
## PHASE_0O_FORBIDDEN_RULES_AND_ALWAYS_ON_EXECUTION_CONTROL

Status: GOVERNANCE_ONLY / READ_ONLY_IMPORT / NO_CODE
Date: 2026-06-21
Rule: این فایل از batch جدید ورودی‌ها استخراج شده و هیچ کد legacy، هیچ schema، هیچ build، هیچ dependency و هیچ prompt خام را مستقیم اجرا نمی‌کند.


# 178 — AI Control System / جلوگیری از خروج پروژه از دست هوش مصنوعی

## Problem
کاربر صریحاً گفت برنامه نباید از دست AI خارج شود. علت شکست‌های قبلی هم همین بود: AIها prompt خام را می‌گرفتند، بدون audit کدنویسی می‌کردند، مسیر جدید می‌ساختند، فایل‌های حساس را لمس می‌کردند یا ادعاهای PASS بدون evidence می‌دادند.

## Control Layers

### Layer 1 — Role Lock
- ChatGPT/Architect: scope, audit, packet, acceptance.
- Replit/Executor: فقط اجرای دقیق packet.
- User/Owner: تصمیم‌های business، build cost، data/schema/security approvals.

### Layer 2 — Source Lock
- Latest ZIP + STATUS + RESUME = source of truth.
- Chat alone is not enough.
- Every decision must be ZIP-updated.

### Layer 3 — Scope Lock
- One batch = one narrow objective.
- No feature sprawl.
- Files allowed/forbidden mandatory.

### Layer 4 — Forbidden Registry
- 173 applies to every phase.
- Violations convert output to INVALID.

### Layer 5 — Evidence Lock
- No VERIFIED_REAL without raw proof.
- No runtime claim without phone/device evidence when UI/runtime matters.

### Layer 6 — Dedupe Lock
- New requirements must merge into canonical docs.
- Duplicates are cross-referenced, not recreated.

### Layer 7 — Cost Lock
- No build without purpose, local gates, and approval.
- No EAS cost thrashing.

### Layer 8 — Human Approval for Sensitive Actions
- finance, doctor share, delete/archive, RLS, schema, staff permission, SMS/CRM, AI actions require approval/audit.

## AI Output Must Answer Every Time
```text
What phase am I in?
What is allowed?
What is forbidden?
What files may change?
What evidence is required?
What STOP condition exists?
What will be updated in ZIP after this?
```

## Invalid Output Examples
- “ساختم، تمام شد” بدون evidence.
- “بهتر است از اول بسازیم” بدون recovery impossibility proof.
- “فعلاً mock می‌گذارم” برای مسیر critical.
- “بعداً sync می‌کنیم” برای write عملیاتی.
- “این دکمه بعداً وصل می‌شود” بدون action contract.

## Safe Output Pattern
- audit first
- scope small
- change gated
- test evidence
- update STATUS/RESUME/ZIP
