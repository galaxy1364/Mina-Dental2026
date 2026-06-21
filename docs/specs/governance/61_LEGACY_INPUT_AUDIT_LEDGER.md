# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 61 — Legacy Input Audit Ledger

### ورودی‌های ممیزی‌شده
| ID | فایل legacy/v54 | نقش در V1.4 | حکم |
|---|---|---|---|
| LEG-001 | MinaDent v54 Master Execution Contract 2026.docx | منبع قوانین سخت‌گیرانه، status labels، phase gate، RLS، no-demo، Persian/RTL | ACCEPT_AS_GOVERNANCE_SOURCE / REWRITE_FOR_ZERO |
| LEG-002 | MinaDent MASTER INDEX Complete FA.docx | نقشه استفاده از فایل‌ها، session start، evidence flow | ACCEPT_AS_INDEX_SOURCE / REWRITE |
| LEG-003 | MinaDent Phase Prompts RealCode FA.docx | الگوی batch، gate، acceptance tests، prompt templates | REWRITE_ONLY / DIRECT_EXECUTION_FORBIDDEN |
| LEG-004 | MinaDent Part3 UI Dashboard EdgeFunctions FA.docx | KPI، Dashboard، PatientList، Booking ideas، EdgeFunction candidates | EXTRACT_REQUIREMENTS / CODE_REWRITE_REQUIRED |
| LEG-005 | MinaDent Part4 Advanced Architecture FA.docx | Sync state machine، conflict، PII guard، performance، Zustand/TanStack separation | ACCEPT_PATTERN / HARDEN_AND_REWRITE |
| LEG-006 | MinaDent Part5 Complete FA.docx | Test suite، E2E، PWA، Push، Backup، Monitoring | ACCEPT_AS_TEST_BACKLOG / VERIFY_TOOLCHAIN |
| LEG-007 | MinaDent Part6 Final UltraSmart FA.docx | SaaS، Insurance، 3D، WhatsApp/Bale/Eitaa، Cron | FUTURE_READY_BACKLOG / VERIFY_API |
| LEG-008 | MinaDent Part7 Apex Technology FA.docx | X-Ray AI، Digital Twin، Voice، WebSocket، Migration، Release | FUTURE_AI_BACKLOG / GUARDRAILS_REQUIRED |
| LEG-009 | MinaDent Part9 Apex World FA.docx | GraphQL، Codegen، AR، PQC، CDN، Smart Contract | R&D_BACKLOG / DIRECT_REJECT_FOR_MVP |
| LEG-010 | MinaDent Part12 Production Execution FA.docx | Payment gateways، Iranian API، DB optimization، runbook | REWRITE_AS_PRODUCTION_BACKLOG / OFFICIAL_VERIFICATION_REQUIRED |

### حکم کلی
- هیچ فایل legacy منبع مستقیم کد نیست.
- هر فایل legacy منبع استخراج requirement و rule است.
- هر موردی که شامل service_role، mock، placeholder، TODO، CLINIC_ID، public URL یا دسترسی server-only باشد، وارد `67_RISKY_CODE_DENYLIST_AND_SANITIZATION_RULES.md` می‌شود.
- هر تضاد با بسته صفر جدید وارد `62_V54_CONFLICT_REGISTER.md` می‌شود.
- هر capability مفید وارد `66_REQUIREMENT_EXTRACTION_FROM_V54.md` و `72_MODULE_BLUEPRINTS_IMPORTED_REQUIREMENTS.md` می‌شود.

### Evidence source names
این ledger بر اساس فایل‌های uploaded legacy/v54 ساخته شده و برای اجرای بعدی باید در root پروژه جدید همراه با ZIP V1.4 commit شود.
