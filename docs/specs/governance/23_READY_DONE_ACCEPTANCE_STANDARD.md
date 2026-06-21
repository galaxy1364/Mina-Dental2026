# MinaDent Definition of Ready / Done / Acceptance V1.2

## Definition of Ready
یک task فقط وقتی آماده اجراست که:

- Requirement ID دارد.
- Phase و module روشن است.
- allowed/forbidden files روشن است.
- Data Contract و Screen Contract وجود دارد.
- RBAC/Audit/Sync/Offline impact بررسی شده است.
- Test Plan و Evidence Plan آماده است.
- Stop Conditions و Rollback روشن است.
- هزینه build یا Replit justification دارد.

## Definition of Done
یک task فقط وقتی Done است که:

- کد واقعی یا سند واقعی تولید شده باشد.
- هیچ mock/fake/placeholder پنهان نداشته باشد.
- TypeScript/Lint/Doctor/Secret/Governance gates طبق scope PASS شده باشند.
- runtime evidence برای UI/flow لازم وجود داشته باشد.
- data evidence برای DB/sync لازم وجود داشته باشد.
- STATUS.md و RESUME_STATE.md آپدیت شده باشند.
- اگر فایل تغییر کرده، overlay ZIP + SHA256 manifest ارائه شده باشد.
- unverified items صادقانه لیست شده باشند.

## Acceptance States
```text
ACCEPTED_VERIFIED
ACCEPTED_SOURCE_ONLY
IMPLEMENTED_NOT_VERIFIED
DOCUMENTATION_LOCKED
STOP_BLOCKER
REJECTED_PATCHWORK
REJECTED_FAKE_OR_DEMO
REJECTED_NO_EVIDENCE
```
