# 76 — Expo Go vs Development Build Decision Matrix

**Version:** V1.4.1  
**Status:** ACTIVE_DECISION_MATRIX  
**Purpose:** Prevent wrong runtime path selection.

## Default Decision
For MinaDent Zero Rebuild, use **Expo Go SDK 54-compatible** initialization if the user wants immediate testing on current Android/iPhone Expo Go.

## Matrix
| Runtime Path | When Allowed | Pros | Risks | Required Approval |
|---|---|---|---|---|
| Expo Go SDK 54 | Default while user's phone Expo Go is SDK54 | Fast cable/device testing, no custom build first | SDK limited to Expo Go-supported native modules | Approved by current evidence |
| Development Build SDK 55/56 | Only if a required feature cannot be done on SDK54 or Expo Go | Full native module control, current SDK features | Requires EAS/dev build, iOS path may need Apple Developer/TestFlight | Explicit staged approval |
| Web/PWA only | For UI/design review, not mobile runtime proof | Fast visual iteration | Not proof for Android/iOS native behavior | Allowed only as supplemental |
| Production EAS Build | Release or critical runtime verification | Real installable build | Cost/time; should not be used after every small change | Explicit approval + full gates |

## Decision Rules
```text
RULE-EXPO-001: Expo Go phone testing requires SDK compatible with installed Expo Go.
RULE-EXPO-002: Replit must not use latest SDK unless compatibility is confirmed.
RULE-EXPO-003: Development build is a separate phase, not a hidden workaround.
RULE-EXPO-004: iOS physical device constraints override optimistic assumptions.
RULE-EXPO-005: Every SDK change requires ADR + rollback path + runtime evidence.
```

## Required Questions Before Any SDK Choice
1. Is the target test device Expo Go or custom development build?
2. Which Expo Go version is installed on both Android and iPhone?
3. Is any required native module unsupported by Expo Go?
4. Is Apple Developer/TestFlight path available if SDK > 54?
5. Is the build worth the cost now, or can source-gated work continue?

## Current MinaDent Answer
```text
Android Expo Go: SDK/version 54 by user evidence.
iPhone Expo Go: SDK/version 54 by user evidence.
Default SDK target: SDK 54-compatible.
SDK 55/56/latest: STOP until approved development-build path exists.
```
