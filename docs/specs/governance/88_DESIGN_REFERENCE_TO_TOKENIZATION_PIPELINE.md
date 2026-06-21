# 88 — Design Reference to Tokenization Pipeline
Version: V1.5
Status: LOCKED DESIGN PROCESS

## Purpose
Design references like banking apps, screenshots, and market examples must not be copied. They must be converted into MinaDent tokens, components, layout contracts, and evidence-driven QA.

## Pipeline
```text
Reference → Pattern extraction → Semantic mapping → Token definition → Component contract → Screen contract → Phone prototype → Visual QA → Lock → Reuse globally
```

## Pattern extraction checklist
For each visual reference, extract:

- information hierarchy;
- spacing rhythm;
- card density;
- visual trust cues;
- primary/secondary action placement;
- navigation model;
- sheet/modal behavior;
- motion style;
- icon scale;
- Persian readability;
- contrast and accessibility.

## Semantic mapping examples
Banking balance card → Clinic daily control card.
Transaction timeline → Patient journey timeline.
Payment action row → Appointment/treatment quick actions.
Secure status badge → Sync/backup/audit status.
KYC onboarding flow → Patient intake/consent flow.

## Token lock
No screen may define independent colors, radii, typography, shadows, or icon meanings. Any new token must be added to the registry with reason and usage scope.

## Visual drift blocker
If a screen visually diverges from locked tokens/components:

```text
STOP_BLOCKER_DESIGN_DRIFT
```
