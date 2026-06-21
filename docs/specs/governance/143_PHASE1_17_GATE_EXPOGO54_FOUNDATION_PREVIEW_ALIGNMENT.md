# 143 — Phase 1 17-Gate Alignment with Expo Go 54 Foundation Preview

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Purpose
Legacy v24/v25 documents define a strong Phase 1 gate. MinaDent Zero Rebuild additionally requires first visible mobile foundation preview on the user's phone via Expo Go SDK54-compatible path.

## Phase 1 core evidence set
Phase 1 cannot pass unless all below are true with evidence:
1. App starts without fatal crash on supported dev path.
2. Routing shell stable; all defined routes point to real components.
3. Config loader centralized, typed, visible error on missing required config.
4. Exactly one Supabase client creation point.
5. Auth/session shell route behavior present; no fake login.
6. SQLite init creates mandatory local foundation tables.
7. Sync queue state machine present and durable across restart.
8. App boot audit records startup outcome.
9. Global RTL root enforcement present.
10. Persian font loading safe.
11. Design tokens/theme shell present.
12. Loading/Error/Empty/Offline/Retry components present.
13. Central logger/telemetry shell with PII masking.
14. Permission/role enum shell deny-by-default.
15. Secret scan clean.
16. TypeScript strict/local gates pass.
17. Phone preview evidence on user's target path: Expo Go SDK54-compatible or approved development build.

## Additional MinaDent visual gate
Foundation preview must show a production-shaped app shell, not a blank skeleton:
- Persian top command/search.
- banking-grade cards and surfaces.
- bottom dock with active state.
- chip rail.
- offline/sync indicator placeholder connected to state.
- foundation diagnostics screen.
- no business module fake data.

## Blocker
If repo init chooses SDK 55/56/latest without compatibility plan:
`STOP_BLOCKER_SDK_RUNTIME_MISMATCH`
