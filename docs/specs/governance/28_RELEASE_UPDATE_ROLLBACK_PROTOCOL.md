# MinaDent Release / Update / Rollback Protocol V1.2

## 1) Release Channels
```text
development: local/USB/internal debugging
preview: owner/runtime acceptance
production: approved release only
```

## 2) Build Permission
Build مجاز نیست مگر:
- local gates PASS.
- feature قابل مشاهده/تست باشد.
- evidence target مشخص باشد.
- rollback plan وجود داشته باشد.
- STATUS/RESUME آماده باشد.

## 3) Update Rules
- Data-preserving update only.
- No uninstall/clear data unless owner explicitly approves and backup exists.
- Code update مسیر جدا از schema/data migration دارد.
- OTA update فقط برای تغییرات مجاز OTA؛ native/dependency/schema sensitive changes با build/release protocol.

## 4) Rollback
```text
ROLLBACK_TRIGGER:
backup_required:
migration_reversible:
version_to_restore:
data_loss_risk:
owner_approval_required:
```

## 5) Release Evidence
```text
version/build number
commit/hash
local gates
runtime screenshots
migration evidence
backup evidence
known limitations
release notes
rollback instructions
```
