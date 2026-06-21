# 189 — Foundation2026 Handoff Boundary and Old Path Quarantine

Status: LEGACY_HANDOFF_IMPORTED_AS_LESSONS_ONLY  
Source: Foundation2026 master project state/handoff 2026-06-06  
Direct current-state authority: DENIED for Zero Rebuild

## What is useful

The handoff provides valuable lessons:
- Foundation preview must stay on an independent route.
- Preview/demo must never replace active tabs/dashboard/patients/appointments/admin routes.
- Active route preservation must be checked after every UI patch.
- Expo Go/Metro phone preview can be used for visual acceptance.
- Local gates must run before any Replit sync/build.
- Evidence pollution guard is required.
- Small reversible patches are preferred over file replacement.

## What is not current truth

Old handoff values cannot become current Zero Rebuild truth:
- old Windows path
- old Expo projectId
- old Replit sync status
- old Foundation24 line count
- old routes as current implementation proof
- old runtime evidence as current proof
- old package/build baseline

## Canonical Zero Rebuild rule

Treat the handoff as:
`LESSON_SOURCE / HISTORICAL_CONTEXT / QUARANTINED_EXECUTION_INPUT`

Do not:
- copy old route paths blindly
- reuse old projectId
- claim old PASS as current PASS
- sync to Replit based on old resume state
- replace current source with old Foundation preview

## Active-route protection rule

Any future Foundation/Dashboard preview must not touch production tabs unless the exact Phase packet authorizes it.

STOP if touched without scope:
- `app/(tabs)/index.tsx`
- `app/(tabs)/appointments.tsx`
- `app/(tabs)/patients.tsx`
- `app/(tabs)/admin.tsx`

## STOP_BLOCKER

`STOP_BLOCKER_OLD_FOUNDATION_HANDOFF_MIXED_WITH_ZERO_REBUILD`
