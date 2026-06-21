# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 66 — Requirement Extraction from v54 Inputs

### Imported governance requirements
- REQ-GOV-001: هر session باید source of truth، STATUS، RESUME و blockerها را بخواند.
- REQ-GOV-002: هیچ feature بدون Screen + LocalDB + SyncQueue + Migration + RLS + TestEvidence کامل نیست.
- REQ-GOV-003: هیچ `VERIFIED_REAL` بدون terminal/device/artifact evidence مجاز نیست.
- REQ-GOV-004: هیچ phase skipping مجاز نیست.
- REQ-GOV-005: هر batch باید BATCH_ID/STATUS/SCOPE/FILES/SQL/RUN/TESTS/EVIDENCE/LIMITS/RESUME داشته باشد.

### Imported localization requirements
- REQ-LOC-001: UI برای کاربر کلینیک ۱۰۰٪ فارسی باشد.
- REQ-LOC-002: RTL root و همه فرم‌ها/جدول‌ها/print/export RTL-safe باشند.
- REQ-LOC-003: Jalali فقط UI؛ DB فقط Gregorian/ISO.
- REQ-LOC-004: Toman برای کاربر، digits فارسی در UI، normalize به Latin قبل persistence.
- REQ-LOC-005: نام پزشک در SMS بیمار ممنوع.

### Imported security/RBAC requirements
- REQ-SEC-001: service_role در client ممنوع دائمی.
- REQ-SEC-002: deny-by-default برای role/action.
- REQ-SEC-003: hard delete برای clinical/financial ممنوع؛ soft delete + audit.
- REQ-SEC-004: manager-only برای تغییرات حساس مالی/قیمت/حذف/override.
- REQ-SEC-005: PII redaction در logs/analytics/crash.

### Imported scheduling requirements
- REQ-SCH-001: doctor و unit در appointment ضروری باشند مگر intake/lead خاص با status جدا.
- REQ-SCH-002: appointment lifecycle شامل pending/scheduled/confirmed/arrived/in_progress/completed/no_show/cancelled/rescheduled باشد.
- REQ-SCH-003: doctor/unit overlap در data layer و UI باید کنترل شود.
- REQ-SCH-004: تقویم Jalali، جمعه/تعطیل قرمز، past/future قابل جستجو.
- REQ-SCH-005: online booking بدون نام پزشک و با manual approval.
- REQ-SCH-006: duration override per appointment بدون تغییر catalog default.

### Imported patient requirements
- REQ-PAT-001: file_number شناسه اصلی بیمار و auto-generated per clinic باشد.
- REQ-PAT-002: search باید name/phone/file/national code و Persian normalization داشته باشد.
- REQ-PAT-003: duplicate detection قبل submit و هنگام submit.
- REQ-PAT-004: medical history و flags در journey قابل استفاده باشند.
- REQ-PAT-005: archive/restore به جای delete.

### Imported finance/lab requirements
- REQ-FIN-001: doctor share فقط server/Edge و با audit.
- REQ-FIN-002: discount >50% فقط manager.
- REQ-FIN-003: cheque/installment/debt bucket 30/60/90.
- REQ-FIN-004: lab cost به treatment/doctor share لینک شود.
- REQ-LAB-001: order lifecycle ordered/received/in_progress/ready/delivered/cancelled.
- REQ-LAB-002: delayed lab alert در dashboard.

### Imported testing/performance requirements
- REQ-TST-001: TypeScript, lint, secret scan, governance check قبل از هر merge.
- REQ-TST-002: mobile E2E و web E2E در فازهای مربوط.
- REQ-PERF-001: patient search برای 200K+ با index/virtualization/cursor pagination.
- REQ-PERF-002: Dashboard نباید full table scan کند.

### Imported AI requirements
- REQ-AI-001: AI فقط advisory و با confirmation برای actions.
- REQ-AI-002: X-Ray AI تشخیص قطعی نیست؛ doctor final decision.
- REQ-AI-003: Voice commands بدون confirmation/action audit ممنوع.
- REQ-AI-004: هر AI action باید role, scope, audit, rollback داشته باشد.
