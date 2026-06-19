# MinaDent — Iranian Banking Design System (extracted)

Distilled from real Iranian banking super-apps the client supplied as references
(**Bank Mehr / Qbank**, **Banket**, **Blu**). This is the visual foundation
("اسکلت و فوندانسیون") for MinaDent and is encoded in `src/design/tokens.ts`.

## Brand color
- **Signature = lime green** (Qbank / Bank Mehr): `primary #C2E812`.
  - Lime is an **action/accent fill** only (gradient headers, primary buttons,
    active tab pill, selected chips/days). It **always carries dark text**
    (`onPrimary #1A1D10`) — never white-on-lime.
  - `primaryDark #5E7A00` = deep lime, the readable variant for text/icons on
    light surfaces and for pressed states.
  - `primaryLight / primarySoft #EEF8C0` = soft lime tint for chips, status
    pills, "today", soft-selected backgrounds.
- **Ink wallet card** `#16170F` + gradient `wallet: #2A2F1E → #14160E` — the
  premium near-black balance card (Banket). White text is valid here.
- **Canvas** `background #F4F5F1`, `surface #FFFFFF`, `surfaceAlt #F0F1EB`.
- **Semantic**: success `#1FA463`, warning `#E08A00`, danger `#E5484D`,
  info `#2D7FF9`, gold `#E2B100` (طلا / premium).

## Shape & elevation
- Generous rounding: cards `radius.card 20`, hero/wallet `radius.xl 24`,
  buttons & pills `radius.pill`.
- Soft shadows: `shadow.card` (subtle) for list cards, `shadow.float` for the
  wallet card and sheets.

## Typography
- Vazirmatn (regular/medium/bold), Persian digits everywhere, RTL writing
  direction. Bold balance numerals; muted captions.

## Components (banking patterns)
- **Wallet/balance card**: dark gradient, label + large balance + date, an inline
  stat row (today's appointments / patients / open lab cases) on a translucent
  panel; eye toggle and quick actions in the bank apps.
- **Section icon grid ("soft icon")**: white rounded cards grouped under a
  right-aligned section title; each tile is a softly tinted squircle
  (`hue @ 14%`) holding the **hue-colored line glyph** (not a saturated square).
- **Bottom dock**: 5 tabs, white bar, **active = lime pill behind a dark glyph**
  with a dark bold label; inactive = muted gray.
- **List row**: white rounded card — icon (rounded square) on the RIGHT,
  title+subtitle stacked on the right, chevron `‹` on the LEFT; destructive rows
  in red.
- **Primary CTA**: full-width lime pill button with dark text, pinned bottom on
  forms.
- **Form field**: label on the right above the input; placeholder right-aligned;
  validation/help text in red below; segmented top tabs with an underline
  indicator.
- **Chips**: pill filter bar, right-anchored, scrolls toward the left; active =
  lime fill + dark text.
- **Transaction row**: leading status icon in a circle (right), title+subtitle
  right, amount + relative date left, status pill (انجام‌شده/…).

## RTL
- The app realizes RTL via an explicit `direction: 'rtl'` context (set on
  `Screen` and the app root). Inside that context `flexDirection: 'row'` lays
  children **right-to-left**; `row-reverse` is reserved for nav headers
  (back button left / title right). Headers with a *conditional* back button must
  switch to `row` when the back button is absent so the title stays right-anchored.

## Accessibility
- Never white-on-lime. Use `onPrimary` (dark) on lime fills and `primaryDark`
  for lime-family text/icons on light. Target WCAG AA for text.
