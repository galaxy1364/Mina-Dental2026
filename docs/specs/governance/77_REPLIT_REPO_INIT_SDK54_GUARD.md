# 77 — Replit Repo Init SDK54 Guard

**Version:** V1.4.1  
**Status:** REQUIRED_BEFORE_ANY_REPO_INIT  
**Applies to:** Replit, ChatGPT, Codex, Claude, Cursor, and any AI executor.

## Purpose
Prevent MinaDent from being initialized with an SDK that cannot run on the user's current real-phone Expo Go.

## Mandatory Pre-Init Audit
Before creating or modifying the repository, executor must output:
```text
BATCH_ID: PHASE_0G_REPO_INIT_SDK_GUARD
STATUS: READONLY_AUDIT_ONLY
CHECK_1: I read 75_EXPO_GO_SDK54_RUNTIME_COMPATIBILITY_ADR.md
CHECK_2: I read 76_EXPO_GO_VS_DEVELOPMENT_BUILD_DECISION_MATRIX.md
CHECK_3: I read STATUS.md and RESUME_STATE.md
CHECK_4: I will not use Expo latest blindly
CHECK_5: I will not run create-expo-app until SDK path is approved
```

## Forbidden Commands Until Approval
```text
npx create-expo-app@latest
npm create expo@latest
bun create expo
npx expo install --fix
npx expo prebuild
eas build
expo run:android
expo run:ios
```

## Allowed Before Approval
```text
Read files
List planned commands without running them
Check official docs manually
Produce repo-init plan
Produce package/version proposal
Return STOP_BLOCKER if uncertain
```

## Approved Init Pattern — Only After User Approval
The exact init command must be decided only after official compatibility verification. Replit must not invent the SDK command.

Minimum expected plan:
```text
1. Create clean repo.
2. Initialize SDK 54-compatible Expo project.
3. Pin exact versions in package.json.
4. Run typecheck/expo-doctor only after install.
5. Do not add unsupported native modules.
6. Update STATUS/RESUME.
```

## STOP Conditions
```text
STOP_BLOCKER_SDK_RUNTIME_MISMATCH
STOP_BLOCKER_REPLIT_USED_LATEST
STOP_BLOCKER_RUNTIME_TARGET_UNCLEAR
STOP_BLOCKER_NO_DEVICE_EVIDENCE
```

## Executor Output Contract
Every Replit answer for repo init must include:
```text
SDK_TARGET:
RUNTIME_TARGET:
COMMANDS_PROPOSED_NOT_RUN:
FILES_TO_CREATE:
FORBIDDEN_COMMANDS_CONFIRMED:
EVIDENCE_REQUIRED:
STATUS:
RESUME_POINT:
```
