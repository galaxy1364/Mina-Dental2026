# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 64 — Official Verification Queue

این فایل مشخص می‌کند چه چیزهایی قبل از اجرا باید از منبع رسمی/کلید واقعی/سند بازار/دستگاه واقعی verify شوند.

| ID | موضوع | وضعیت | Evidence لازم | اجرای فعلی |
|---|---|---|---|---|
| VER-001 | Expo SDK و Expo Router | PENDING | `npx expo-doctor`, `package.json`, official docs | قبل از repo init |
| VER-002 | Supabase RLS policy behavior | PENDING | migration local/remote + deny tests | قبل از schema cloud |
| VER-003 | SQLite driver + WAL + FTS | PENDING | local device test + query evidence | Foundation phase |
| VER-004 | SMS gateway Kavenegar/Melipayamak | PENDING | account/API docs/test SMS/consent | CRM phase |
| VER-005 | WhatsApp Business API | PENDING | official account, template approval | Future connector |
| VER-006 | Bale/Eitaa APIs | PENDING | official bot docs, rate limits | Future connector |
| VER-007 | ZarinPal/IDPay/Paystar/Nextpay | PENDING | sandbox test, callback, idempotency | Finance future |
| VER-008 | Shaparak/Shetab direct | BLOCKED | legal/contract evidence | Not MVP |
| VER-009 | Salamat/Prescription e-system | BLOCKED | official API access | Reject mock |
| VER-010 | Insurance claim APIs | BLOCKED | payer API docs/contract | Future |
| VER-011 | X-Ray AI | BLOCKED_GUARDRAILS | legal/medical disclaimer + doctor confirmation + audit | Future AI |
| VER-012 | Voice auto-actions | BLOCKED_GUARDRAILS | confirmation UX + role permission + audit | Future AI |
| VER-013 | 3D/AR dental | FUTURE | device performance + clinical value | R&D |
| VER-014 | PWA/Windows desktop | FUTURE | offline/security/storage strategy | Later |
| VER-015 | Sentry/PostHog analytics | PENDING | PII redaction proof | Monitoring phase |
| VER-016 | OWASP/NIST/WCAG/FHIR alignment | ONGOING | versioned citations in ADR | Governance |

### Rule
هر item با وضعیت PENDING/BLOCKED نباید کد production بگیرد. فقط `verification packet` یا `research packet` مجاز است.
