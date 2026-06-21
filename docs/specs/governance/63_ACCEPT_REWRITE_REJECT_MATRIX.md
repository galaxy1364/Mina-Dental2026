# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 63 — Accept / Rewrite / Reject Matrix

### Legend
- **ACCEPT:** به‌عنوان قانون/الگو قابل استفاده است.
- **REWRITE:** ایده خوب است اما باید از صفر مطابق foundation بازنویسی شود.
- **REJECT:** برای اجرای فعلی ممنوع است.
- **FUTURE:** ثبت در backlog آینده؛ MVP blocker نیست.

| Category | Legacy content | Decision | Reason | Target file |
|---|---|---|---|---|
| No demo / Evidence-first | قوانین v54 | ACCEPT | با zero rebuild هم‌راستا | Constitution / AI protocol |
| Status labels | VERIFIED_REAL و… | ACCEPT+REWRITE | باید با V1.4 labels sync شود | STATUS protocol |
| Phase gate | Ph0→Ph10 | REWRITE | ترتیب خوب است اما باید با new roadmap ادغام شود | Roadmap / Phase Gate |
| Persian/RTL/Jalali | قواعد v54 | ACCEPT | حیاتی برای ایران | RTL/Jalali protocol |
| RLS + deny default | RLS/role matrix | ACCEPT+HARDEN | باید با Supabase/RBAC جدید sync شود | RBAC/RLS contract |
| Doctor share | Edge-only formulas | ACCEPT_WITH_RECONCILIATION | فرمول‌ها مفیدند ولی master data باید تایید شود | Finance Deep Spec |
| Dashboard KPI | KPI live/realtime | REWRITE | domain/data/sync نیاز دارد | Dashboard module blueprint |
| PatientList code | TSX snippets | REWRITE | UI قدیمی/unsafe direct copy | Patient blueprint |
| Sync State Machine | PENDING/CONFLICT/DEAD_LETTER | ACCEPT+HARDEN | الگوی مفید | Sync contract |
| Conflict resolver strategies | LOCAL/SERVER/MANUAL | REWRITE | مالی/clinical باید دقیق‌تر باشد | Offline conflict detail |
| Test suite | Detox/Playwright/Jest | ACCEPT_AS_STRATEGY | toolchain باید confirm شود | Test strategy |
| PWA/Windows | PWA/desktop snippets | FUTURE | بعد از mobile core | Platform backlog |
| Push/SMS | notifications | REWRITE | consent/log/opt-out لازم | CRM/Notification spec |
| SaaS plans | multi-tenant plan | FUTURE | ابتدا single-clinic production | Backlog |
| Insurance | provider/claim | FUTURE_VERIFY | ایران API/قرارداد لازم | Verification queue |
| WhatsApp/Bale/Eitaa | send-message | FUTURE_VERIFY | API/consent لازم | Connector queue |
| X-Ray AI | Claude Vision | FUTURE_GUARDED | خطر medical diagnosis | AI safety backlog |
| Digital Twin | patient scoring | FUTURE_GUARDED | bias/privacy/action guard لازم | AI module spec |
| Voice commands | auto-action | REWRITE_WITH_CONFIRMATION | action بدون تایید ممنوع | AI guardrails |
| GraphQL/Codegen | auto module generation | FUTURE/R&D | service_role و codegen خطرناک | R&D backlog |
| AR/Quantum/Blockchain | apex world | REJECT_FOR_MVP/FUTURE | ارزش پژوهشی، نه core | R&D backlog |
| Payment gateway | ZarinPal/IDPay | FUTURE_VERIFY | نیاز official docs, idempotency, audit | Finance verification |
| Salamat mock API | mock | REJECT_UNTIL_OFFICIAL | mock در مسیر critical ممنوع | Denylist |
| DB indexes/partitioning | performance SQL | REWRITE | schema نهایی باید وجود داشته باشد | Performance ADR |

### قانون نهایی
هیچ `REWRITE` نباید به executor با عبارت “exact content below” داده شود. همه rewriteها باید از مسیر Module Blueprint → Data Contract → Screen Contract → Test Plan → Implementation Packet عبور کنند.
