# 91 — First Phase Execution Blueprint & Open Backlog
Version: V1.5
Status: READY FOR FUTURE EXECUTION PLANNING ONLY

## Purpose
Define what the first practical implementation should be once governance/read-only audit is accepted.

## Phase 1 should not build business modules
First code phase must only create the clean runtime-compatible project and foundation shell path.

## Phase 1A — Repo identity and SDK guard
Allowed: create repo/project only after approving SDK path.
Deliverable: package/app identity, strict TypeScript, Expo config, env template, no secrets, no business modules.

## Phase 1B — Production App Shell preview
Deliverable: phone-visible RTL shell with:

- loading screen;
- root layout;
- RTL/Persian/font;
- top command/search;
- dashboard shell;
- smart cards using mock-labeled design placeholders only, not fake operational data;
- dock skeleton;
- module identity registry;
- bottom sheet pattern;
- offline/sync/status indicators as UI states only.

## Phase 1C — Governance-driven source folders
Deliverable: folders for core, modules, governance, evidence, but no unfinished business logic.

## Open decisions before Phase 1

1. Expo SDK 54-compatible repo or development build path?
2. Exact package name/slug for new Replit project?
3. Should first preview be Android-only first or Android+iPhone together?
4. Which screenshots from Banket/UI references are accepted for structural mapping?
5. Which old v54 requirements must be MVP vs future?

## Default if user does not decide
Default must be safest:

```text
SDK 54-compatible Expo Go path
Android first phone preview
No native module requiring dev build
No business schema
No Supabase write
No payments/SMS/AI
```
