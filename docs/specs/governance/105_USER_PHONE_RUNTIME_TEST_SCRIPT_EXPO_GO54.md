# MinaDent V1.6 — User Phone Runtime Test Script for Expo Go SDK 54

## Purpose
The user must see valuable progress on their own phone. This script defines how every phone test should be performed and reported.

## Device constraint
Current user evidence: Expo Go on both Android and iPhone is SDK/version 54 and no newer update is available on device. This is binding until replaced by newer evidence.

## Test setup required
- Confirm app SDK compatibility.
- Confirm correct project path/name/slug.
- Confirm Expo Go 54 path or approved development build path.
- Use USB/cable workflow if requested.
- No uninstall/clear data without explicit permission.

## Phase 1 phone test
User opens app and checks:
1. App loads without crash.
2. Persian text is visible.
3. RTL root correct.
4. Top command/search visible.
5. Bottom dock visible, no overlap.
6. Dashboard cards visible.
7. Chip rail behaves correctly.
8. Bottom sheet opens/closes in fixed location.
9. Loading/error/empty/offline sample states exist but are clearly preview states.
10. No route tap does nothing silently.
11. No keyboard collapse issue in sample input.
12. Screenshot evidence is attached.

## Evidence format
```text
DEVICE:
PLATFORM:
EXPO GO VERSION/SDK:
APP SCREEN:
WHAT WAS TESTED:
PASS/FAIL:
SCREENSHOT:
NOTES:
```

## Status labels
- PHONE_PREVIEW_PASS
- PHONE_PREVIEW_FAIL
- IMPLEMENTED_NOT_VERIFIED
- VERIFIED_REAL_FOR_PHASE_SCOPE
