# 83 — Iranian Banking-Grade UI/UX Extraction Contract
Version: V1.5
Status: LOCKED DESIGN GOVERNANCE

## Purpose
MinaDent must visually and behaviorally reach the trust, clarity, density, smoothness, and confidence of high-quality Iranian mobile banking apps such as Banqet/Bank Mehr Iran, while remaining a unique dental operating system and never copying brand assets.

## Extractable patterns from banking-grade apps
Allowed extraction:

- clean high-trust header;
- account/summary cards translated into clinic KPI/action cards;
- prominent secure action buttons;
- bottom dock/navigation consistency;
- fast task entry points;
- transaction/timeline metaphor translated into patient journey timeline;
- trust cues: status, verification, sync, backup, audit;
- simple yet comprehensive flows;
- compact, touch-friendly cards;
- premium motion without clutter.

Not allowed:

- copying logos;
- copying exact brand colors;
- copying proprietary UI screens pixel-for-pixel;
- using Banket/Bank Mehr names inside MinaDent UI;
- using banking flows that conflict with dental workflow.

## MinaDent visual contract
The first visible foundation must include these canonical surfaces:

1. Command Center Home.
2. Patient Journey Timeline Card.
3. Smart Appointment Card.
4. Debtor/Finance Alert Card.
5. Lab Delay Card.
6. Follow-up/Recall Card.
7. Sync/Backup Health Card.
8. Role-aware dock.
9. Bottom sheet action model.
10. RTL chip rail.

## Token extraction requirements
Design must be translated into tokens before screens:

```text
color.role
surface.level
radius.scale
spacing.scale
typography.scale
motion.duration
motion.easing
shadow.level
icon.identity
module.semanticColor
status.semanticColor
```

## Visual QA gates
Every UI batch must be scored against:

- Persian readability;
- RTL correctness;
- touch target safety;
- contrast;
- dock overlap prevention;
- token usage;
- no decorative-only elements;
- route/action availability;
- visual consistency across modules;
- phone screenshot evidence.

Minimum UI score before merge: 900/1000.
