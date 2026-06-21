# Data, Sync & Backup Contract — قرارداد داده، همگام‌سازی و پشتیبان

وضعیت: اجباری قبل از data implementation  
هدف: جلوگیری از mock persistence، sync خراب، از دست رفتن داده و تغییرات بی‌مدرک.

---

## 1. اصل داده

هر داده مهم ابتدا local-first ذخیره می‌شود و سپس sync queue می‌شود.

داده مهم شامل:

- Patient
- Appointment
- Treatment
- Finance
- Payment
- Lab
- Inventory
- Doctor/Unit settings
- Notification state
- Audit
- Backup metadata

## 2. Local Database

Local DB باید:

- SQLite
- WAL mode
- migration version
- no destructive migration
- index برای search
- transaction برای عملیات چندمرحله‌ای
- audit insert
- sync queue insert

## 3. Cloud Database

Cloud باید فقط از طریق repository/sync layer استفاده شود.  
client نباید service_role داشته باشد.  
RLS باید فعال و role-aware باشد.  
هر migration باید rollback/verification داشته باشد.

## 4. Sync Queue

حداقل فیلدها:

- id
- entity_type
- entity_id
- operation
- payload_json
- status
- retry_count
- last_error
- dedupe_key
- created_at
- updated_at
- synced_at
- actor_user_id
- device_id

statusهای مجاز:

- PENDING
- PROCESSING
- SYNCED
- FAILED
- CONFLICT
- BLOCKED

## 5. Conflict Strategy

هر entity باید conflict strategy داشته باشد:

- patient: field-level merge یا manager review
- appointment: time conflict blocks sync
- finance: append-only ledger, no silent overwrite
- treatment: audit required
- settings: last-write only با manager audit، مگر حساس
- lab/inventory: quantity changes append movement

## 6. Backup

Backup باید دو سطح داشته باشد:

### Local Backup
- export encrypted یا حداقل safe local
- timestamp
- device id
- app version
- schema version
- checksum
- restore validation

### Cloud Backup
- scheduled
- status visible
- failure alert
- manager notification
- restore drill

## 7. Restore

Restore بدون validation ممنوع است.

Restore باید:

- نسخه schema را بررسی کند
- checksum را بررسی کند
- preview summary بدهد
- overwrite خطرناک را block کند
- audit event بسازد
- rollback path داشته باشد

## 8. Performance

برای 200,000+ patient:

- search index
- pagination
- lazy load
- no full table scan in UI
- virtualized list
- debounced search
- normalized mobile/name/file number
- background sync

## 9. ممنوعیت داده

- fake persistence
- AsyncStorage برای داده اصلی
- direct DB write از UI
- حذف واقعی بدون soft delete/audit
- sync retry خودکار بدون محدودیت
- پاک کردن queue بدون evidence
- migration بدون backup
- cloud write بدون RLS/permission
- مالی بدون ledger append-only
