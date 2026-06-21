# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 62 — V54 → Zero Rebuild Conflict Register

### قوانین حل تعارض
1. **Source of Truth اجرایی فقط فایل‌های V1.4+ در repo جدید است.**
2. فایل legacy هرگز بر فایل zero governance جدید غلبه نمی‌کند.
3. اگر legacy ارزش دارد ولی با وضعیت جدید تضاد دارد، باید با ADR و approval بازنویسی شود.
4. اگر تضاد روی امنیت، secret، schema، payment، AI پزشکی یا داده بیمار است، حکم پیش‌فرض STOP_BLOCKER است.

### تعارض‌های قفل‌شده
| ID | موضوع | legacy/v54 | Zero Rebuild decision | Action |
|---|---|---|---|---|
| CON-001 | Expo SDK | v54 روی Expo SDK 53 قفل شده | پروژه صفر باید با آخرین stack تاییدشده repo جدید/Expo Doctor قفل شود | ADR required before repo init |
| CON-002 | Package manager | legacy گاهی Bun-first است | Windows/Replit compatibility باید اثبات شود؛ npm یا bun با evidence | Stack ADR |
| CON-003 | Clinic master data | legacy نام/نقش/پزشکان را قطعی می‌داند | حافظه/کاربر/فایل باید reconcile شود؛ حدس ممنوع | `68_CLINIC_MASTER_DATA_RECONCILIATION.md` |
| CON-004 | Direct phase prompts | legacy دستور create app/install/build مستقیم دارد | تا Phase 0G و approval، اجرا ممنوع | Rewrite as gated prompt |
| CON-005 | service_role | server-side samples دارد؛ خطر copy to client | client ممنوع مطلق؛ Edge-only با secrets | Denylist + secret scan |
| CON-006 | Mock/placeholder | Salamat/mock/placeholder/CLINIC_ID دیده می‌شود | هر mock production path مردود | Denylist + Rewrite |
| CON-007 | AI diagnosis | X-Ray AI و clinical AI دارد | فقط assistant/advisory، نه diagnosis قطعی؛ doctor confirmation | AI guardrails |
| CON-008 | Payment APIs | ZarinPal/IDPay/Shaparak candidates | فقط بعد از official docs/API key/sandbox evidence | Verification queue |
| CON-009 | Migration SQL | legacy SQL قطعه‌ای و sequence مختلف دارد | migration باید از صفر، sequential، reversible، RLS tested باشد | Migration governance |
| CON-010 | Design | legacy UI ساده/کد تزئینی دارد | UI باید با Design System 2026 و screen contract ساخته شود | Rewrite UI only |
| CON-011 | Future features | AR/Quantum/Blockchain/GraphQL codegen | فقط future/R&D، نه MVP | Backlog split |
| CON-012 | Patient capacity | 100K/200K targets مختلف | target رسمی 200K+ با performance budget | Update performance gates |

### STOP conditions
- اگر Executor بخواهد legacy code را مستقیم paste کند: `STOP_BLOCKER_DIRECT_LEGACY_COPY`.
- اگر Stack را بدون ADR تغییر دهد: `STOP_BLOCKER_STACK_CONFLICT`.
- اگر master data را حدس بزند: `STOP_BLOCKER_MASTER_DATA_CONFLICT`.
- اگر API خارجی را بدون official verification فعال کند: `STOP_BLOCKER_EXTERNAL_API_UNVERIFIED`.
