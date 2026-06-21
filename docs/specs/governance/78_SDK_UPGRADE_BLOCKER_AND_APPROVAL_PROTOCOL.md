# 78 — SDK Upgrade Blocker and Approval Protocol

**Version:** V1.4.1  
**Status:** ACTIVE_BLOCKER_PROTOCOL

## Principle
MinaDent must not upgrade SDK just because a tool says latest is available. SDK upgrade is a product/runtime decision, not a convenience update.

## Upgrade Is Blocked Unless All Are True
```text
1. Current SDK limitation is documented with evidence.
2. Required feature cannot be implemented safely on current SDK.
3. Official Expo documentation confirms upgrade path.
4. Development build / EAS / iOS route is available.
5. Rollback path exists.
6. User explicitly approves the upgrade phase.
7. STATUS.md and RESUME_STATE.md are updated before the work.
```

## Upgrade Process
```text
Step 1: Open SDK Upgrade ADR.
Step 2: Verify official Expo release notes and compatibility.
Step 3: Create migration plan.
Step 4: Run source-only package diff proposal.
Step 5: Get user approval.
Step 6: Apply package changes.
Step 7: Run local gates.
Step 8: Run target runtime evidence.
Step 9: Update ZIP governance pack.
```

## Forbidden
- Silent SDK upgrades.
- Silent React Native upgrades.
- `expo install --fix` without diff review.
- Native config changes hidden inside unrelated batches.
- Claiming compatibility from web preview.

## Runtime Evidence Required
```text
Android real device evidence
+ iPhone real device evidence OR approved substitute path
+ package.json diff
+ expo-doctor result
+ error log if failed
+ rollback record
```

## Current MinaDent Locked Rule
```text
SDK 54 is the safe default for current Expo Go phone testing.
SDK > 54 is future-only until development-build path is approved.
```
