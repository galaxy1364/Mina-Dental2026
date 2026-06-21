# MinaDent Zero Rebuild — V1.11 Batch4 V16–V21 Prompt Audit

**Status:** `PHASE_0N_V16_V21_PROMPT_AUDIT_AND_PHASE1_PIPELINE_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / read-only audit / no code / no schema / no build / no connector  
**Source batch:** v16 Master Execution Contract, v17 Master Build Prompt, v18 Phase1 Execution Task, v19 Repo Audit Prompt, v20 Recovery Prompt TXT/DOCX/bundle, v21 Phase1 Build Prompt TXT/bundle.


## Purpose
این ledger فایل‌های prompt قدیمی v16 تا v21 و bundleهای تکراری را به‌صورت read-only ممیزی می‌کند. هدف، استخراج طلای واقعی برای MinaDent Zero Rebuild است، نه اجرای مستقیم آن‌ها.

## Input inventory
| Input | Type | Audit verdict | Direct execution |
|---|---|---|---|
| MinaDent_Master_Execution_Contract_v16.txt | master contract | Useful: خروجی اجباری، مدل دامنه، state machine، AI operating rules | NOT_ALLOWED |
| MinaDent_Master_Build_Prompt_v17.txt | build prompt | Useful: دستور ساخت Foundation Kernel و product identity | NOT_ALLOWED |
| MinaDent_Phase1_Execution_Task_Prompt_v18.txt | phase 1 execution task | Useful: mandatory repo inspection + Phase 1 output contract | NOT_ALLOWED |
| MinaDent_Repo_Audit_Prompt_v19.txt | repo audit prompt | Very useful: audit-only contract, STOP after audit, status matrix | SAFE_TO_REWRITE_AS_READONLY_PACKET |
| MinaDent_Recovery_Prompt_v20.txt / .docx | recovery prompt | Useful: root-cause-first recovery and minimal safe recovery scope | SAFE_AFTER_AUDIT_ONLY |
| MinaDent_Phase1_Build_Prompt_v21.txt | controlled implementation prompt | Useful: Phase 1 foundation scope and acceptance synthesis | SAFE_AFTER_PHASE0N_READONLY_AUDIT |
| *_bundle.zip | duplicate bundles | Duplicates TXT/DOCX versions | INVENTORY_ONLY |

## High-value imports
1. **Output Contract discipline**: هر خروجی implementation باید scope, assumptions, current status, files, DB, SQL, RLS, local DB, sync, API/Edge/RPC, UI, validation, states, tests, actual tests, limitations, rollback, resume, final label داشته باشد.
2. **Audit-only prompt pattern**: Repo audit باید فقط inspect/diagnose/report کند و بعد STOP؛ implementation مستقیم از audit prompt ممنوع است.
3. **Root-cause-first recovery**: recovery قبل از build؛ گروه‌بندی مشکل بر اساس dependency/routing/env/runtime/storage/architecture/fake persistence.
4. **Phase 1 foundation kernel**: app shell, router, typed config, single Supabase client, auth/session shell, role model, SQLite, sync queue, RTL/font/theme, UI states, diagnostics.
5. **No overbuild in Phase 1**: Patient/Scheduling/Finance/Lab/Inventory/CRM/AI خارج از scope فاز ۱ است مگر shell-only برای routing safety.
6. **Device/runtime honesty**: بدون evidence، هیچ status واقعی نیست.
7. **State machine compatibility**: appointment, journey, payment, cheque, lab, sync باید در آینده با state-machine رسمی قابل اتصال باشد.

## Quarantined / not imported directly
- Direct commands that ask an AI builder to “execute now” are quarantined until an explicit packet is created.
- Old stack assumptions are superseded by current SDK54/Zero Rebuild ADR.
- Any instruction to build after audit without owner gate is rewritten.
- Any bundle duplicate is not re-added as a separate requirement.
- Any old “single source of truth” claim is downgraded to legacy input; V1.11 ZIP remains current governance source.

## Final audit verdict
`USE_AS_GOVERNANCE_SOURCE = YES`  
`DIRECT_EXECUTION = NO`  
`DIRECT_CODE_COPY = NO`  
`MERGE_AS_PHASE_PIPELINE = YES`  
`NEXT_ALLOWED_STEP = Phase 0N read-only placement audit or next file batch audit`
