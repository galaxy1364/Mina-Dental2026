# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 69 — Stack ADR: Expo / Toolchain / Runtime Decision

### ADR status
`PROPOSED_NOT_FINAL` — قبل از repo init باید با evidence جدید قفل شود.

### Problem
legacy/v54 روی Expo SDK 53 و Bun-first قفل شده است، ولی پروژه صفر جدید باید بر اساس محیط واقعی، Expo Doctor، Replit compatibility، EAS و دستگاه هدف قفل شود.

### Decision rule
هیچ stack قفل نمی‌شود مگر این evidence وجود داشته باشد:
- official package versions from generated project
- `npx expo-doctor` PASS
- TypeScript strict PASS
- Android device boot plan
- EAS project identity plan
- dependency/license/security review

### Default proposed stack for Zero Rebuild
| Layer | Candidate | Status |
|---|---|---|
| Framework | Expo + React Native + Expo Router | VERIFY_AT_REPO_INIT |
| Language | TypeScript strict | LOCKED |
| Local DB | expo-sqlite + repository layer | LOCKED_CONCEPT |
| Cloud | Supabase Auth/Postgres/RLS/Storage/Edge | LOCKED_CONCEPT |
| State | TanStack Query server state + Zustand UI state | LOCKED_CONCEPT |
| Forms | React Hook Form + Zod | LOCKED_CONCEPT |
| Persian | Vazirmatn + Jalali UI + normalization | LOCKED |
| Build | EAS Build | VERIFY |
| Testing | Typecheck/Lint/Jest/Detox/Playwright as phase-appropriate | VERIFY |
| Package manager | npm or bun | DECIDE_BY_ENV_EVIDENCE |

### Rejected without ADR
- Mixing multiple router systems.
- AsyncStorage for critical data.
- Raw client-side financial/doctor-share logic.
- Unverified native package additions.
- SDK downgrade/upgrade without Expo Doctor evidence.

### Required output before repo init
`ADR-STACK-001_FINAL.md` with chosen versions, commands, and rollback.


---

## V1.4.1 Addendum — Expo Go SDK54 Constraint

User device evidence now locks the immediate runtime target: Android and iPhone Expo Go installed on the user's devices are SDK/version 54. Therefore, SDK 54-compatible initialization is the default if testing through Expo Go is required.

SDK 55/56/latest can only be selected through a separate approved development-build path. This addendum supersedes any earlier generic `latest SDK` wording.
