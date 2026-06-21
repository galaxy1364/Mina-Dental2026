# 82 — Foundation-First Mobile Preview Protocol for Expo Go SDK 54
Version: V1.5
Status: LOCKED BLOCKER/CONSTRAINT

## Purpose
The first implementation must not start with business modules. It must start with a unified, Persian-first, RTL, banking-grade, phone-visible Production App Shell that can be previewed on the user's real phone under the current Expo Go SDK 54 constraint.

## Source constraint
User-provided runtime evidence: latest available Expo Go on both Android and iPhone is SDK/version 54. No newer update is available on the user's devices.

## Repo-init decision
Until this constraint is changed by evidence:

```text
IF target = Expo Go preview on user phone
THEN repo must be SDK 54-compatible.

IF Replit proposes latest SDK / SDK 55 / SDK 56
THEN STOP_BLOCKER_SDK_RUNTIME_MISMATCH.

IF higher SDK is chosen
THEN a separate development build / EAS / TestFlight / Apple Developer path must be approved before repo init.
```

## Foundation preview must show
Phase 1 UI preview must include:

1. Root RTL and Persian typography.
2. Vazirmatn or approved Persian font loading path.
3. Banking-grade top command/search/header area.
4. Bottom dock skeleton with canonical module identities.
5. Smart chip rail.
6. Dashboard shell with actionable cards, not fake data claims.
7. Screen/sheet/navigation pattern.
8. Empty/loading/error/offline/pending states.
9. Expo Go 54 device preview evidence.

## What is not allowed in Foundation Preview
- No fake patient data marked as real.
- No dead buttons.
- No old full-screen wizard.
- No English user-facing labels.
- No route that cannot be opened.
- No design outside tokens.
- No SDK mismatch.

## Evidence required
```text
npx expo --version
package.json SDK evidence
Expo Go device screenshot/video
TypeScript output
Lint output
Secret scan output
RTL screenshot
STATUS/RESUME update
ZIP/hash update
```
