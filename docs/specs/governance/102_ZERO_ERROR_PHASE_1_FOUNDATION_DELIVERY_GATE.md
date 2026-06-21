# MinaDent V1.6 — Zero-Error Phase 1 Foundation Delivery Gate

## Purpose
Phase 1 must not become a shell-only architecture dump. It must produce a visible, testable, real app foundation on the user's phone.

## Phase 1 allowed goal
Build only the Production App Shell / Foundation Preview.

## Phase 1 forbidden
- Patient CRUD.
- Appointment CRUD.
- Finance.
- Lab.
- Real Supabase schema.
- SMS/payment/AI connectors.
- Native build unless explicitly approved.
- Latest SDK init if Expo Go 54 is target.

## Required deliverables
1. Clean repo identity verified.
2. SDK/runtime path locked.
3. TypeScript strict.
4. App root with RTL.
5. Design tokens.
6. Font loading.
7. Safe-area layout.
8. Navigation shell.
9. Top command/search.
10. Bottom dock.
11. Dashboard command center preview.
12. UI states.
13. Offline/sync status placeholder with no fake sync claim.
14. Route/link integrity test.
15. Phone preview on user's device.
16. Evidence screenshots.
17. STATUS/RESUME update.
18. Overlay ZIP with manifest/hash.

## Static gates
- TypeScript zero errors.
- Lint zero blocking errors.
- Secret scan clean.
- Expo doctor compatible with chosen SDK path.
- No service_role.
- No old project name.
- No dead route.
- No hardcoded English user labels.

## Phone runtime gate
User must verify:
- App opens on Expo Go 54 or approved dev path.
- RTL is correct.
- Bottom dock does not overlap content.
- Cards are visible and premium.
- Search/top command area is placed correctly.
- No yellow placeholder/dead area.
- No keyboard collapse bugs in input preview.
- Safe area works.

## Completion label
Without phone evidence: IMPLEMENTED_NOT_VERIFIED.
With phone screenshots and static gates: VERIFIED_REAL_FOR_PHASE_1_PREVIEW.
