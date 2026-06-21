# 220 — V0 Dashboard Design Token Extraction

Version: V1.17  
Date: 2026-06-21  
Status: DESIGN_TOKEN_EXTRACTION_LOCKED

## Extracted visual language

The uploaded design establishes a strong owner-approved MinaDent look:

- **Base mood:** deep dark petrol / slate green-black
- **Primary color:** luminous turquoise / teal
- **Secondary accent:** clinical violet/purple
- **Success:** green / mint
- **Warning:** amber/gold
- **Danger:** rose/red
- **Surface:** glass-card, translucent panels, subtle borders
- **Typography:** Persian-first, bold numeric hierarchy, compact labels
- **Geometry:** large rounded cards, soft radius, generous card padding, dense but readable layout
- **Motion direction:** premium, calm, smooth, not cartoonish

## Token mapping for MinaDent Foundation

```text
foundation.background.deep        = dark petrol / clinic black-green
foundation.surface.card           = translucent dark card
foundation.surface.elevated       = glass elevated card
foundation.border.subtle          = low-opacity light border
foundation.brand.primary          = turquoise / teal
foundation.brand.secondary        = clinical violet
foundation.status.success         = mint green
foundation.status.warning         = amber/gold
foundation.status.danger          = red/rose
foundation.status.info            = blue-cyan
foundation.radius.card            = 20-28dp equivalent
foundation.radius.dock            = 24-32dp equivalent
foundation.shadow.glowPrimary     = teal glow, restrained
foundation.text.primary           = high-contrast white/off-white
foundation.text.secondary         = muted blue-gray
foundation.text.numericHero       = bold large Persian digits
```

## Component patterns to adopt

```text
AppShell
DashboardShell
DesktopSidebar
MobileTopbar
FloatingBottomDock
CentralQuickAddButton
KpiStatCard
RevenueTrendCard
TodayAppointmentTimeline
PatientPipelineCard
MiniCalendarCard
QuickActionGrid
ActivityFeed
SearchCommandBar
SemanticStatusChip
ModuleIconButton
```

## Required MinaDent conversion rules

Every extracted component must be rewritten as platform-safe MinaDent Foundation code:

- React Native / Expo component first, Web later through shared token contracts;
- all visible text Persian and RTL;
- no CSS/HTML direct import;
- no mock data in production components;
- every action gets `data/action contract` equivalent in source;
- every visual count requires real selector or honest empty/blocked state;
- bottom dock must be scrollable/role-aware/customizable according to MinaDent rules;
- dashboard cards must connect to Smart Operating Brain, not only static UI.

## Screenshot evidence inventory

```text
dash-desktop.png — size=1440x900 — sha256=0e8ec947648b41ad0ee9a27ab000821f023162d2f48a0be3b00088ce1aba1700
dash-mobile.png — size=390x844 — sha256=15ea00af7d88ff30fcc6594260ad7d38f15368200f88cd73bfe667bbc2c73f46
dock-desktop.png — size=1440x900 — sha256=e4409ff67790a4fd7a5662a93d9ad9b92c96db7d0faf4c3f9b5d87bc50df60aa
dock-mobile.png — size=390x844 — sha256=4c6661796e61a8304b9af6cb29e4c45fcdda5a68079b91d6cd2af3d28f218dba
```
