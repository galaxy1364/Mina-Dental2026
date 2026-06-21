# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## 1. Input Ledger

| Source | Type | Size bytes | SHA256 short | Verdict |
|---|---:|---:|---|---|
| FULL_EXECUTION_HANDOFF_NEXT_CHAT_2026-05-07 | TXT | 23333 | `ef14a11589b8` | LEGACY_HANDOFF_VALUABLE_FOR_ANTI_REGRESSION_AND_OVERLAY_RULES |
| MASTER_EXECUTION_CONTRACT_v63_FINAL_MASTER_FA | TXT | 86334 | `9d9c960214d5` | DUPLICATE_OR_OLDER_REVISION_OF_V65_LINEAGE |
| MASTER_EXECUTION_CONTRACT_v61_FINAL_FA | TXT | 48903 | `2918c6c5abd2` | DUPLICATE_OR_OLDER_REVISION_OF_V65_LINEAGE |
| MASTER_EXECUTION_CONTRACT_v65_SMART_ATOMIC_FINAL_FA | TXT | 130220 | `f3f53ffcfdea` | PRIMARY_LEGACY_CONTRACT_REFERENCE_SUPERSEDED_BY_ZERO_REBUILD_WHEN_CONFLICTS |
| MASTER_EXECUTION_CONTRACT_v64_ATOMIC_FINAL_FA | TXT | 108277 | `e0bbc3a310d4` | DUPLICATE_OR_OLDER_REVISION_OF_V65_LINEAGE |
| MASTER_EXECUTION_CONTRACT_v62_ULTRA_AUDITED_FA | TXT | 67435 | `59e48e147dd6` | DUPLICATE_OR_OLDER_REVISION_OF_V65_LINEAGE |
| FULL_PROJECT_HANDOFF_2026-05-01 | TXT | 26047 | `8525305ea934` | LEGACY_HANDOFF_VALUABLE_FOR_ANTI_REGRESSION_AND_OVERLAY_RULES |
| v53_v52_Hardened_Gap_Closure_Master | DOCX | 62580 | `30638a795479` | FOUNDATIONAL_ZERO_AMBIGUITY_CONTRACT_REFERENCE |
| Runtime_Evidence_Addendum_v57 | TXT | 1262 | `d52de2181517` | EVIDENCE_ADDENDUM_VALUABLE_BUT_OLD_PROJECT_CONTEXT |
| REPLIT_EXECUTOR_LOCK_PACKET_v65_FA | TXT | 8096 | `eddc3e791032` | EXECUTOR_ADOPTION_PROMPT_TEMPLATE_VALUABLE |

## 2. Read-only audit verdict

این batch شامل سه نوع ورودی است:

1. **قراردادهای v61 تا v65:** عمدتاً تکراری و تکاملی هستند. v65 کامل‌ترین نسخه این lineage است، اما به پروژه قدیمی، Expo SDK 51 و Golden Baseline قدیمی وابسته است. بنابراین جایگزین V1.9 نمی‌شود.
2. **handoff/evidence فایل‌های اردیبهشت:** برای ضد‌رگرسیون، overlay، proof hierarchy و درس‌های شکست بسیار مهم‌اند، اما وضعیت پروژه قدیمی هستند و نباید به‌عنوان وضعیت runtime فعلی Zero Rebuild جا زده شوند.
3. **Replit executor lock packet:** برای ساخت prompt پذیرش executor مفید است؛ اما باید از v65 قدیمی به V1.10 Zero Rebuild بازنویسی شود.

## 3. Import decision

```text
USE AS GOVERNANCE SOURCE: YES
DIRECT EXECUTION: NO
DIRECT CODE COPY: NO
OLD PATH/STACK IMPORT: NO
REWRITE INTO ZERO REBUILD CONTRACTS: YES
```

## 4. Primary imported themes

- Golden Baseline / Overlay discipline
- Android runtime screenshot as final RTL proof
- No PASS after failed command
- No paid build guessing
- No Replit patch roulette
- Current old-project blockers must not be confused with Zero Rebuild current state
- Module template completeness
- Atomic executor protocol
- OTA/EAS update guardrails
- Evidence hierarchy and runtime proof taxonomy
