# 186 — Dashboard HTML Preview V6.7/V7.2 Quarantine and Extraction

Status: QUARANTINE_DESIGN_REFERENCE_ONLY  
HTML direct import: FORBIDDEN  
WebView production: FORBIDDEN  
React Native copy-paste: FORBIDDEN  
Schema/package/native/build changes: FORBIDDEN  

## Files audited from V7.2 zip

| File | Size | SHA256 |
|---|---:|---|
| `MinaDent_Foundation2026_Dashboard_CommandCenter_V7_2.html` | 57830 | `4ba5a66c109b3a31…` |
| `FINAL_15_WORLD_CLASS_REMAINING_EXTENSIONS_V7_2.json` | 11622 | `8fbda7722b379df9…` |
| `FINAL_15_EXTENSION_STAGE_PLAN_V7_2.json` | 2025 | `791a1321a138b5ba…` |
| `FINAL_15_REMAINING_AFTER_V7_2_TRACKER.json` | 941 | `5fce8bd2803037d9…` |
| `REPLIT_FINAL_15_EXTENSION_EXECUTION_PROMPT_V7_2.txt` | 669 | `cc6555c20360d0e9…` |
| `CHANGELOG_AND_REPLIT_CONTRACT_V7_2.txt` | 528 | `dbb81b9a2629eee9…` |
| `PRE_DELIVERY_QA_VERDICT_V7_2.txt` | 275 | `a4fb70a8e8c9127f…` |
| `MANIFEST.json` | 1442 | `c25d3ed69f0a2340…` |

## Extractable value

The V6.7/V7.2 HTML previews contain useful contracts:
- safe-area-aware mobile shell
- fixed RTL bottom dock
- low-scroll viewport
- command bar/search
- system health bar
- smart journey timeline
- full-height bottom sheets
- data-action/data-route/data-contract attributes
- role-aware dashboard tabs
- module paged grid
- no-dead-action discipline

## Not extractable directly

Do not directly import:
- CSS
- HTML structure
- embedded JS state
- fake counts
- preview patient names
- desktop/mobile hardcoded width assumptions
- emojis/placeholders
- WebView wrapper

## Allowed extraction pipeline

1. Read HTML as design reference only.
2. Convert visual patterns to design tokens:
   - spacing
   - radius
   - safe area
   - dock height
   - sheet behavior
   - semantic colors
   - low-scroll density
3. Convert data attributes to route/action contract registry.
4. Convert fake visible data into selector contracts or disabled states.
5. Rebuild as React Native/Expo components only after Phase packet approval.
6. Test on Expo Go SDK54 or approved development build.

## STOP_BLOCKER

If any executor tries to import the HTML as production:
`STOP_BLOCKER_HTML_PREVIEW_DIRECT_IMPORT`

If any executor claims V6.7/V7.2 is runtime/prod:
`STOP_BLOCKER_PREVIEW_CLAIMED_AS_PRODUCTION`

If any visible card/action lacks route/hook:
`STOP_BLOCKER_DASHBOARD_DEAD_ACTION`
