# MinaDent Zero Rebuild — V1.12
## PHASE_0O_FORBIDDEN_RULES_AND_ALWAYS_ON_EXECUTION_CONTROL

Status: GOVERNANCE_ONLY / READ_ONLY_IMPORT / NO_CODE
Date: 2026-06-21
Rule: این فایل از batch جدید ورودی‌ها استخراج شده و هیچ کد legacy، هیچ schema، هیچ build، هیچ dependency و هیچ prompt خام را مستقیم اجرا نمی‌کند.


# 179 — MinaDent2026 HTML Preview Quarantine and Design Extraction

## Source
MinaDent2026.html was reviewed as design reference only.

## Verdict
این فایل production source نیست. مستقیم به React Native/Expo کپی نمی‌شود. WebView production محسوب نمی‌شود. CSS/JS/HTML خام فقط برای استخراج pattern استفاده می‌شود.

## Useful Design Patterns to Extract
- Persian RTL dark enterprise dashboard feeling.
- sidebar/topbar/cards/tables/calendar patterns for web/tablet future.
- semantic status badges.
- notification panel concept.
- toast/error state patterns.
- timeline visual pattern.
- stat cards and live command center mood.

## What Must Be Rebuilt Properly
- React Native components using design tokens.
- Mobile-first shell with bottom dock, not desktop sidebar as first mobile default.
- Safe area-aware header and sheets.
- Expo Go SDK54-compatible implementation.
- Real actions, state, route, handler, telemetry and future data contracts.

## Forbidden Direct Imports
- raw CSS colors without token mapping.
- raw HTML structure as production app.
- desktop-first sidebar for phone shell.
- inline JS interactions without app state model.
- fake dashboard data/counts.

## Design Token Extraction Queue
- color semantic mapping
- glass/surface tokens
- badge tokens
- spacing/radius tokens
- dark/light/high-contrast adaptation
- status colors for debt/payment/lab/sync/failure

## Resume Use
Use as reference in Phase 1 Design Foundation only after V1.12 placement audit. It must be passed through `88_DESIGN_REFERENCE_TO_TOKENIZATION_PIPELINE.md` and `43_FOUNDATION_TOKEN_REGISTRY_AND_STYLE_LOCK.md` before implementation.
