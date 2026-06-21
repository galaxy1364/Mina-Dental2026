# 223 — V0 Source Quarantine and Rewrite Protocol

Version: V1.17  
Date: 2026-06-21  
Status: QUARANTINED_REFERENCE_ONLY

## Quarantined source inventory

```text
.gitignore — 218 bytes
components.json — 428 bytes
dash-desktop.png — 261725 bytes
dash-mobile.png — 101593 bytes
dock-desktop.png — 285643 bytes
dock-mobile.png — 117029 bytes
next.config.mjs — 181 bytes
package.json — 947 bytes
pnpm-lock.yaml — 138304 bytes
postcss.config.mjs — 144 bytes
tsconfig.json — 695 bytes
app/globals.css — 7139 bytes
app/layout.tsx — 1354 bytes
app/page.tsx — 1545 bytes
lib/format.ts — 1979 bytes
lib/mock-data.ts — 3805 bytes
lib/utils.ts — 166 bytes
public/apple-icon.png — 2626 bytes
public/icon-dark-32x32.png — 585 bytes
public/icon-light-32x32.png — 566 bytes
public/icon.svg — 1304 bytes
public/manifest.json — 480 bytes
public/placeholder-logo.png — 568 bytes
public/placeholder-logo.svg — 3208 bytes
public/placeholder-user.jpg — 1635 bytes
public/placeholder.jpg — 1064 bytes
public/placeholder.svg — 3253 bytes
scripts/001_create_staff.sql — 3469 bytes
components/dashboard/activity-feed.tsx — 1723 bytes
components/dashboard/appointments-timeline.tsx — 3682 bytes
components/dashboard/bottom-dock.tsx — 2670 bytes
components/dashboard/dashboard-shell.tsx — 710 bytes
components/dashboard/mini-calendar.tsx — 2100 bytes
components/dashboard/patient-pipeline.tsx — 1889 bytes
components/dashboard/quick-actions.tsx — 1571 bytes
components/dashboard/revenue-chart.tsx — 3278 bytes
components/dashboard/sidebar.tsx — 4477 bytes
components/dashboard/stat-cards.tsx — 4125 bytes
components/dashboard/topbar.tsx — 2840 bytes
components/ui/button.tsx — 3198 bytes
```

## Source risk notes

- `lib/mock-data.ts` is clearly mock/static data and must not enter production.
- `scripts/001_create_staff.sql` is not accepted as MinaDent production schema. It has sample staff and does not match the full locked RBAC/RLS/audit/clinic schema.
- `package.json` uses Next.js 16 / React 19 / Tailwind 4 / shadcn/web stack; this can inspire Web/PWA, but it is not the locked mobile-first Expo foundation for APK/IPA.
- screenshot assets are evidence/reference only.

## Allowed extraction

```text
colors
spacing
radius
shadow/glow mood
card composition
dock composition
sidebar composition
KPI layout
chart panel style
RTL Persian copy style
component naming inspiration
```

## Forbidden extraction

```text
No direct SQL import
No direct package.json import
No direct Next.js route import into Expo
No direct CSS copy into React Native
No mock-data dependency
No sample doctors/staff
No use of generic project identity
No fake stats
No WebView production dashboard
```

## Rewrite requirement

Every useful part must be rewritten into MinaDent Foundation contracts:

```text
DesignToken → Foundation Component → Screen Contract → Data Contract → Runtime Evidence
```
