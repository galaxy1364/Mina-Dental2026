# MinaDent — Visual Direction Decision (V1.17 lock)

Status: LOCKED · Date: 2026-06-21 · Supersedes: lime banking palette (V0 foundation)

## Decision

The owner-approved **V0 dashboard** direction is now the **primary, locked visual
foundation** for MinaDent, per the V1.17 governance pack
(`docs/specs/governance/219`, `220`, `221`, `222`).

This **supersedes** the earlier lime (`#C2E812`) Iranian-banking palette. The
banking apps (Bank Mehr / Qbank / Banket) remain the **structural** reference —
card geometry, floating dock, right-anchored chip rails, white→glass list rows,
KPI grids — but the **color/mood** is now the dark teal-glass system.

## Locked palette (encoded in `src/design/tokens.ts`)

| Token | Value | Role |
|---|---|---|
| `background` | `#08171B` | deep petrol / clinic black-green canvas |
| `surface` | `#102A30` | translucent glass card |
| `surfaceAlt` | `#16363D` | elevated glass |
| `primary` | `#22D3C5` | luminous turquoise action fill (dark `onPrimary` text) |
| `onPrimary` | `#04181B` | deep ink for text/icons on teal |
| `primaryDark` | `#5BEADD` | bright teal — readable text/icon on dark |
| `secondary` | `#9A8CF7` | clinical violet accent |
| `success/warning/danger/info` | `#34D399`/`#FBBF24`/`#FB6E73`/`#38BDF8` | semantic |
| `gold` | `#F2C14E` | premium / birthday accents |
| `border` | `#1E3A41` | low-contrast glass border |
| text | `#EAF6F4` / `#9BB2BA` / `#647C84` | primary / secondary / muted |

Gradients: `brand` = luminous teal (dark text); `wallet` = petrol-glass balance
card (white text). `shadow.glow` = restrained teal glow for primary/active.

## Conversion rules (from governance 220)

- Convert the V0 reference into MinaDent **Expo/React Native** tokens & components.
  No CSS/HTML/Next.js copy. The V0 ZIP stays quarantined as visual reference only.
- Every visible string Persian + RTL; numbers Persian digits.
- Every action wired to a real data/action contract; honest empty/loading/error/
  offline/sync states — no decorative dead UI.
- Floating, role-aware, customizable bottom dock; dashboard cards connect to the
  clinic engine (not static mock counts).

## Reversibility / no-regression

The change is a pure token swap plus shared-component restyle; all screens read
tokens, so the foundation flips coherently. The prior lime values are preserved
in git history (commit `9456028`) should a light/lime theme variant be requested
later (would be added as an alternate theme, not a revert).
