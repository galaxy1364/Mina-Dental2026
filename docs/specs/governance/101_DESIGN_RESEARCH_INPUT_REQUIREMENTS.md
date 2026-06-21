# MinaDent V1.6 — Design Research Input Requirements

## Purpose
To achieve the banking-grade Persian UI target, design references must be converted into implementable patterns.

## Required design inputs
1. Screenshots or screen recordings of the banking apps the user likes.
2. Notes on what the user likes: card shape, spacing, motion, colors, icon style, dock, typography, bottom sheets, search bar.
3. Screenshots from dental competitors.
4. Examples of forms and receipts the clinic actually uses.
5. User device screenshots after each preview.

## Extraction categories
- Layout structure.
- Top command/search system.
- Shortcut chip rail.
- Smart card hierarchy.
- Bottom dock behavior.
- Sheet/modal behavior.
- Button shape and elevation.
- Spacing scale.
- Persian type scale.
- RTL behavior.
- Motion/transition pattern.
- Empty/error/loading/offline states.
- Color semantics.

## Design sources of truth
- Apple HIG for iOS behavior.
- Material Design 3 for Android behavior.
- WCAG 2.2 for accessibility.
- MinaDent Design System Contract for brand-specific implementation.

## Hard bans
- Do not copy logos, brand assets, exact proprietary screens, or trademark color identity.
- Do not implement pretty components without route/data/action.
- Do not use random colors outside token registry.
- Do not create per-page unique styling that fragments the app.

## Phase 1 target
A real Production App Shell preview with:
- Persian RTL root.
- Vazirmatn or approved font path.
- Top command/search placeholder connected to navigation/search intent stub.
- Bottom dock with real route targets or disabled future slots explicitly marked.
- Smart dashboard cards with safe local/static seed only if clearly marked as preview seed.
- Sheet model.
- Loading/error/empty/offline visual states.
- Expo Go SDK54 phone preview evidence.
