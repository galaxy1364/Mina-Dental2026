# 75 — Expo Go SDK 54 Runtime Compatibility ADR

**Version:** V1.4.1  
**Date:** 2026-06-21  
**Status:** ACCEPTED_CONSTRAINT / BLOCKER_GUARD  
**Scope:** MinaDent Zero Rebuild runtime strategy before repo initialization.

## Evidence
User-reported runtime evidence: the latest Expo Go available on the user's real Android and iPhone devices is SDK/version 54; no newer update is available on those devices.

Official context to verify before execution:
- Expo stated that Expo Go for SDK 54 would continue to be available on App Store and Play Store during the SDK 55 App Store transition.
- Expo stated that Expo Go for SDK 56 is not available on App Store or Google Play at the time of the SDK 56 upgrade article.
- Expo SDK 54 corresponds to React Native 0.81 and React 19.1.
- Expo documentation recommends incremental SDK upgrades and makes clear that Expo Go/device availability can differ from SDK release availability.

## Decision
If MinaDent's immediate runtime test target is **Expo Go on the user's real phone**, the initial repository must be **Expo SDK 54-compatible**.

Any Replit, ChatGPT, Codex, Claude, v0, or executor that attempts to initialize MinaDent with SDK 55/56/latest without a separate approved runtime plan must stop.

## Hard Rule
```text
IF target_runtime == "Expo Go on user's Android/iPhone"
THEN sdk_target = "Expo SDK 54 compatible"
ELSE IF sdk_target > 54
THEN require Development Build / EAS / TestFlight / Apple Developer path + explicit staged approval
```

## STOP_BLOCKER
```text
STOP_BLOCKER_SDK_RUNTIME_MISMATCH
```

Trigger conditions:
- `npx create-expo-app@latest` would create an SDK not compatible with user's Expo Go.
- `package.json` contains Expo SDK 55/56 while the approved runtime target is Expo Go SDK 54.
- Replit proposes `latest` Expo without reading this ADR.
- Any build/test instruction assumes Expo Go supports a newer SDK without device evidence.

## Allowed Paths
### Path A — Expo Go First
Use SDK 54-compatible project initialization. This is the default path while the user wants fast phone tests through Expo Go.

### Path B — Newer SDK With Development Build
Use SDK 55/56 only after approval, and only with EAS development build or another verified runtime path. This requires its own cost/build/time/device gate.

### Path C — Hybrid Future Upgrade
Start SDK 54 for evidence-based device iteration; later upgrade one SDK at a time with backup, migration gate, and runtime proof.

## Forbidden
- Blind `latest` SDK initialization.
- Claiming SDK 55/56 works on the user's phone without actual device evidence.
- Mixing V54 legacy stack decisions with new Zero Rebuild without ADR.
- Treating web preview as proof of real phone runtime.

## Required Evidence Before Repo Init
```text
1. Device runtime target selected: Expo Go SDK54 OR Development Build.
2. package.json planned SDK version recorded.
3. Expo compatibility checked.
4. STATUS.md and RESUME_STATE.md updated.
5. Replit prompt includes SDK guard.
```

## Resume Point Impact
Current resume point becomes:
```text
PHASE_0G_SDK54_RUNTIME_COMPATIBILITY_LOCKED_BEFORE_REPO_INIT
```
