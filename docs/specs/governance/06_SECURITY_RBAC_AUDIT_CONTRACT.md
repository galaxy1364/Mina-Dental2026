# Security, RBAC & Audit Contract — امنیت، نقش‌ها و ممیزی

وضعیت: اجباری  
هدف: MinaDent باید clinic-grade و audit-ready باشد.

---

## 1. نقش‌ها

- Manager
- Doctor
- Secretary
- Assistant
- Accountant در آینده
- System/Admin در سطح backend فقط با محدودیت

## 2. Permission Matrix اولیه

| Action | Manager | Doctor | Secretary | Assistant |
|---|---|---|---|---|
| ایجاد بیمار | Yes | Limited | Yes | Limited |
| ویرایش اطلاعات حساس بیمار | Yes | Limited | Limited | No |
| آرشیو بیمار | Yes | No/Request | Request | No |
| ایجاد نوبت | Yes | Yes | Yes | Limited |
| لغو/جابجایی نوبت | Yes | Limited | Yes | Limited |
| ثبت درمان | Yes | Yes | No | Limited assist |
| ثبت پرداخت | Yes | No | Limited | No |
| مشاهده درآمد کل | Yes | No | No | No |
| تغییر تعرفه | Yes | No | No | No |
| تغییر نقش کاربر | Yes | No | No | No |
| حذف/restore | Yes with audit | No | No | No |
| backup/restore | Yes | No | No | No |
| connector management | Yes | No | No | No |

## 3. Audit Event

حداقل فیلدها:

- id
- actor_user_id
- actor_role
- action
- entity_type
- entity_id
- before_json
- after_json
- reason
- device_id
- ip_or_session
- created_at
- sync_status

## 4. Sensitive Actions

این عملیات باید تأیید/دلیل/ممیزی داشته باشد:

- حذف/غیرفعال‌سازی
- ویرایش مالی
- تغییر قیمت
- تغییر سهم پزشک
- تغییر نقش
- restore backup
- sync conflict resolution
- تغییر وضعیت چک/قسط
- تغییر درمان ثبت‌شده
- تغییر پرونده بعد از بستن case

## 5. Secrets

ممنوع:

- secret در repo
- service_role در client
- چاپ مقدار secret در log/chat
- commit کردن .env
- ارسال کلید واقعی در screenshot

مجاز:

- env presence check بدون چاپ مقدار
- secret scan
- server-side secret فقط در backend امن
- provider key با least privilege

## 6. AI Security

AI فقط وقتی مجاز است:

- permission را چک کند
- intent را تشخیص دهد
- action preview بدهد
- user confirm بگیرد برای action حساس
- audit event ثبت کند
- data minimization رعایت کند
- هیچ داده‌ای را بدون نیاز بیرون نفرستد

AI ممنوع است:

- تصمیم مالی بدون تأیید
- حذف/ویرایش حساس بدون تأیید
- ساخت داده fake
- دورزدن permission
- direct DB write
- استفاده از connector بدون allowlist

## 7. Device/Session

- session restore باید تست شود
- logout واقعی
- role refresh
- offline permission cache با expiry
- device id
- lock در آینده

## 8. Stop Conditions

- اگر RLS نامشخص است: `STOP_BLOCKER_RLS_UNVERIFIED`
- اگر secret پیدا شد: `STOP_BLOCKER_SECRET_LEAK`
- اگر permission action نامشخص است: `STOP_BLOCKER_PERMISSION_UNDEFINED`
- اگر audit برای action حساس نیست: `STOP_BLOCKER_AUDIT_REQUIRED`
