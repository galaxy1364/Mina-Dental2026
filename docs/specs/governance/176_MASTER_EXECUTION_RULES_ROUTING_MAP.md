# MinaDent Zero Rebuild — V1.12
## PHASE_0O_FORBIDDEN_RULES_AND_ALWAYS_ON_EXECUTION_CONTROL

Status: GOVERNANCE_ONLY / READ_ONLY_IMPORT / NO_CODE
Date: 2026-06-21
Rule: این فایل از batch جدید ورودی‌ها استخراج شده و هیچ کد legacy، هیچ schema، هیچ build، هیچ dependency و هیچ prompt خام را مستقیم اجرا نمی‌کند.


# 176 — Master Execution Rules Routing Map

## Purpose
این فایل مشخص می‌کند هر نوع قانون از فایل‌های ورودی batch5 باید به کدام سند canonical در بسته مادر برود؛ تا همه‌چیز در جای درست خود باشد و تکرار نشود.

| Rule Type | Canonical Destination | Action |
|---|---|---|
| ممنوعیات مطلق | 173_UNIVERSAL_FORBIDDEN_ACTIONS_REGISTRY.md | Merge as strict rule |
| header تکرارشونده | 174_ALWAYS_REPEAT_PHASE_HEADER_AND_GATE_TEMPLATE.md | Use in all phase packets |
| recurring checklist | 175_PHASE_RECURRING_CHECKLIST_NO_AI_DRIFT.md | Apply every phase |
| roadmap کلی | 177_ROADMAP_DEDUP_AND_STAGE_ALIGNMENT_FROM_BATCH5.md | Dedup against V1.11 |
| smart brain | 178_AI_CONTROL_SYSTEM_NO_OUT_OF_CONTROL.md | Merge as deterministic engine |
| UI/design preview | 179_UI_HTML_PREVIEW_QUARANTINE_AND_DESIGN_EXTRACTION.md | Quarantine as design reference |
| security/RBAC/RLS | Existing security files + 173 | Cross-reference |
| AI prompt rules | Existing executor protocol + 174 | Rewrite, not raw execute |
| code snippets/HTML | Quarantine | No direct copy |
| old stack versions | Stack ADR only | Cannot override SDK54 lock |

## Rule Strength
اگر یک rule جدید سختگیرانه‌تر است، import شود. اگر ضعیف‌تر است، rejected یا superseded شود. اگر تکراری است، فقط cross-reference شود.

## No Duplicate Rule
هیچ فایل جدید نباید دوباره همان قانون را با جمله متفاوت ایجاد کند مگر اینکه function متفاوت داشته باشد: registry، header، checklist، routing، phase map، or audit ledger.
