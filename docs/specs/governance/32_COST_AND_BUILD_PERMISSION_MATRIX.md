# MinaDent Cost & Build Permission Matrix V1.2

## Build Decision Matrix
| Situation | Build Allowed? | Reason |
|---|---|---|
| docs/governance only | No | no runtime evidence needed |
| schema-only draft | No | verify with SQL/read-only first |
| UI shell source ready | Maybe | if screenshot evidence needed |
| native dependency change | Only explicit | high risk/cost |
| crash fix | Maybe | if local gates + reproduction evidence |
| visual acceptance | Only after target UI implemented | avoid wasting builds |
| release candidate | Yes | after all gates |

## Cost-Control Rule
- اول low-cost checks: read-only/source/static/local.
- بعد USB/Expo Go اگر کافی است.
- بعد development/preview build فقط با evidence target.
- production build آخرین مرحله است.

## STOP
```text
STOP_BLOCKER_BUILD_WITHOUT_TEST_TARGET
STOP_BLOCKER_PAID_GUESSING
STOP_BLOCKER_RUNTIME_NOT_REPRODUCIBLE
```
