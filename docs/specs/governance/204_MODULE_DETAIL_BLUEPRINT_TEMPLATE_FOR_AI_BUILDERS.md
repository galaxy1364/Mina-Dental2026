# 204 — Module Detail Blueprint Template for AI Builders — V1.15

Every MinaDent module must be specified using this exact blueprint before implementation.

## Module Blueprint Template
### 1. Module identity
- Module name:
- Phase:
- Owner role:
- User roles:
- Requirement IDs:
- Status label:

### 2. Real clinic goal
- What real clinic problem does this solve?
- What happens if the module fails?
- What is the minimum real-use flow?

### 3. Entities and data
- Entities:
- Required fields:
- Optional fields:
- Unique constraints:
- Index/search requirements:
- Archive/restore policy:
- PII/sensitive fields:

### 4. Workflows and state machines
- States:
- Allowed transitions:
- Forbidden transitions:
- Who can transition:
- Events emitted:
- Tasks/notifications generated:
- Audit required:

### 5. UI/UX contract
- Screen(s):
- Navigation/back behavior:
- Top chip rail:
- Bottom dock relation:
- Empty/loading/error/offline states:
- Permission denied state:
- Persian/RTL/Jalali/Toman requirements:
- Accessibility requirements:
- Visual reference extraction:

### 6. Offline/sync contract
- What works offline?
- What is queued?
- What requires remote confirmation?
- Conflict policy:
- Retry/dead-letter policy:

### 7. RBAC/audit/security
- Allowed roles:
- Forbidden roles:
- Manager approval required:
- RLS/server rules:
- Audit old/new/reason:
- Log redaction:

### 8. AI behavior
- Can AI read?
- Can AI suggest?
- Can AI prepare an action?
- What needs human confirmation?
- What is forbidden for AI?

### 9. Tests and evidence
- TypeScript:
- ESLint:
- Unit tests:
- Integration tests:
- Device/Expo Go evidence:
- Offline/online test:
- Role test:
- Performance test:

### 10. Definition of done
A module is not complete unless it has:
- UI screen/component.
- Local persistence where applicable.
- Sync queue where applicable.
- Migration/RLS/server rules where applicable.
- Audit/security.
- Tests.
- Runtime evidence.
- STATUS/RESUME/evidence update.

## Template enforcement
If a future executor begins code without this blueprint, return:
`STOP_BLOCKER_MODULE_BLUEPRINT_MISSING`
