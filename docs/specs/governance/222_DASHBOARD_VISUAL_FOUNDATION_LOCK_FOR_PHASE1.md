# 222 — Dashboard Visual Foundation Lock for Phase 1

Version: V1.17  
Date: 2026-06-21  
Status: PHASE1_VISUAL_DIRECTION_LOCKED

## Locked visual direction

Phase 1 Foundation must follow the owner-approved V0 dashboard reference as the main visual direction:

- dark luxury clinical dashboard
- teal/turquoise primary action
- glass cards
- premium rounded components
- Persian-first RTL interface
- compact management dashboard
- professional bottom dock
- high-contrast financial/clinical numeric cards
- soft glow, subtle gradients, no noisy decoration

## Must be improved beyond the V0 reference

MinaDent must keep this style but add enterprise-grade missing layers:

- Smart Operating Brain integration
- real dashboard states: empty/loading/error/offline/sync pending/sync failed/permission denied
- RBAC-aware dashboard cards
- audit and owner approval states
- synced/unsynced indicators
- command/search preview and confirmation
- scrollable/customizable bottom dock
- top contextual smart chip rail
- module registry-driven icons
- role-based home: Manager, Doctor, Secretary, Assistant, Finance, Lab/CRM future
- no content hidden behind dock
- responsive mobile/tablet/web contracts

## Phase 1 first screen scope

The first actual code packet must not attempt the full clinic app. It should build the shared foundation shell and dashboard skeleton:

```text
AppShell
ThemeProvider / TokenRegistry
RTL/Persian root
SafeAreaShell
Topbar/SearchCommandBar
SmartChipRail
DashboardKpiGrid
WorkQueuePreview
PatientJourneyPreview
SystemHealthStrip
ScrollableBottomDock
Empty/Loading/Error/Offline State Components
```

## Not allowed in Phase 1

```text
No real finance calculation
No real doctor share calculation
No patient CRUD yet
No appointment booking yet
No lab workflow yet
No schema migration yet
No production SMS/payment/AI connection yet
No direct copy of V0 code
```

Phase 1 is the visual + architectural foundation only, with real contracts and no fake completion claim.
