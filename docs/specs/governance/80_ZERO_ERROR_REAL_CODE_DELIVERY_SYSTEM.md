# 80 — Zero-Error Real-Code Delivery System
Version: V1.5
Status: LOCKED GOVERNANCE
Scope: MinaDent Zero Rebuild

## Purpose
This file converts the user requirement into a mandatory delivery system: every MinaDent implementation step must produce real, testable, source-backed code, visible evidence, and a locked next-step state. No phase may be called valuable unless the user can see or verify the real result at that phase.

## Non-negotiable delivery chain
Every execution batch must follow this chain:

```text
READ_GOVERNANCE → DEEP_THINK → RESEARCH_IF_NEEDED → DEFINE_SCOPE → FILE_ALLOWLIST → DATA_CONTRACT → SCREEN_CONTRACT → REAL_CODE → STATIC_GATES → PHONE_PREVIEW_OR_RUNTIME_EVIDENCE → USER_REVIEW → STATUS/RESUME UPDATE → ZIP/MANIFEST UPDATE
```

If any item is absent:

```text
STOP_BLOCKER_NO_REAL_DELIVERY
```

## Real code definition
A change is real code only if it satisfies all of these:

1. It is connected to an existing route, screen, provider, data contract, or testable shell.
2. It has no fake success state.
3. It has no dead action or decorative button.
4. It has at least one static gate: typecheck/lint/secret scan.
5. It has a runtime or preview evidence plan.
6. It preserves RTL, Persian text, design tokens, navigation integrity, and Expo SDK/runtime compatibility.
7. It updates STATUS and RESUME.

## Meaningful phase rule
A phase is meaningful only if it creates a verifiable step in the product journey. Documentation-only phases are allowed only in Phase 0 and must be explicitly labeled governance-only. Once coding starts, each batch must create a visible, testable, or instrumented product increment.

## User phone preview rule
Because the user needs to see progress immediately, all UI-facing phases must include one of:

- Expo Go SDK 54 compatible preview on the user's Android/iPhone;
- Development build path if SDK/library requires native modules not supported by Expo Go;
- Web/PWA preview only as secondary evidence, never as replacement for phone evidence.

## Forbidden delivery claims
Do not claim:

- complete;
- production-ready;
- verified;
- working;
- ready for next phase;

unless evidence exists. Use only honest states: `NOT_STARTED`, `IMPLEMENTED_NOT_VERIFIED`, `VERIFIED_ON_EXPO_GO54`, `VERIFIED_ON_DEV_BUILD`, `BROKEN`, `STOP_BLOCKER`.
