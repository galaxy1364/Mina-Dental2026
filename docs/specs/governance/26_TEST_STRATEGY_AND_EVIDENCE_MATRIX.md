# MinaDent Test Strategy & Evidence Matrix V1.2

## 1) Test Layers
| Layer | Required Evidence |
|---|---|
| Static | TypeScript 0 errors, lint, secret scan |
| Governance | allowed/forbidden files, STATUS/RESUME updated |
| Unit | domain rules, state transitions |
| Repository | SQLite CRUD/search/index tests |
| Migration | migration up/down/dry-run evidence |
| RBAC | role permission matrix tests |
| Audit | old/new value and actor evidence |
| Sync | queue, retry, conflict, offline burst |
| UI | RTL, states, no dead actions |
| Runtime | Android USB screenshots/video/logs |
| Performance | 200k seed/query/list scroll/profile |
| Security | secret scan, RLS verification, MCP guard tests |
| Backup | backup/restore under load |
| Release | version/build/update/rollback evidence |

## 2) Evidence Format
```text
EVIDENCE_ID:
DATE:
PHASE:
MODULE:
COMMAND_OR_ACTION:
RAW_OUTPUT:
SCREENSHOT_OR_LOG:
PASS_FAIL:
LIMITATIONS:
NEXT_RESUME_POINT:
```

## 3) No Evidence = No Done
اگر evidence خام وجود ندارد، وضعیت فقط `IMPLEMENTED_NOT_VERIFIED` یا `STOP_BLOCKER` است.
