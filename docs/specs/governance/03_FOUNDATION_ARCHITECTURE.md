# Foundation Architecture — معماری فاندیشن واقعی

وضعیت: قرارداد معماری  
هدف: جلوگیری از صفحه‌سازی پراکنده و ساخت پایه قابل توسعه.

---

## 1. اصل معماری

MinaDent باید لایه‌ای ساخته شود، نه صفحه‌ای.

لایه‌ها:

1. App Shell
2. Design System
3. Navigation System
4. Domain Layer
5. Repository Layer
6. Local Database Layer
7. Sync Layer
8. Audit Layer
9. Permission Layer
10. Workflow Engine
11. Feature Modules
12. Connector Layer
13. AI Command Layer

## 2. App Shell

App Shell باید قبل از featureها ساخته شود:

- Root RTL
- Safe area
- Bottom dock
- Top command/search
- Notification entry
- Role-aware navigation
- Offline/sync status
- Error boundary
- App identity guard
- Theme provider
- Persian typography
- Page template

## 3. Navigation Contract

Routeها نباید تصادفی ساخته شوند. هر route باید:

- ID داشته باشد
- نقش مجاز داشته باشد
- parent module داشته باشد
- empty/loading/error state داشته باشد
- breadcrumb یا back behavior مشخص داشته باشد
- analytics/audit event در صورت حساسیت داشته باشد

نمونه route groups:

- `/dashboard`
- `/patients`
- `/patients/:id`
- `/appointments`
- `/appointments/create`
- `/calendar`
- `/finance`
- `/lab`
- `/inventory`
- `/crm`
- `/reports`
- `/admin`
- `/settings`
- `/audit`
- `/backup`

## 4. Domain Layer

Domain باید مستقل از UI باشد.

Domainهای اولیه:

- Clinic
- User/Staff
- Role/Permission
- Patient
- Doctor
- Unit
- Appointment
- CalendarDay
- TreatmentPlan
- TreatmentRecord
- Invoice
- Payment
- Installment
- Cheque
- LabOrder
- InventoryItem
- Notification
- AuditEvent
- SyncQueueItem

## 5. Repository Layer

هر domain باید repository داشته باشد:

- create
- update
- soft delete/deactivate
- get by ID
- search
- list by filters
- enqueue sync
- write audit

UI حق ندارد مستقیم دیتابیس را دستکاری کند.

## 6. Sync Layer

Sync باید مرکزی باشد:

- local-first write
- sync_queue
- entity_type
- operation
- payload
- status
- retry_count
- last_error
- dedupe_key
- created_at/updated_at
- conflict strategy

## 7. Audit Layer

هر عملیات حساس audit می‌شود:

- ایجاد/ویرایش/حذف بیمار
- تغییر نوبت
- تغییر مالی
- تغییر تعرفه
- تغییر نقش
- تغییر تنظیمات
- backup/restore
- sync failure/retry
- connector action
- AI action

## 8. Permission Layer

هر action باید permission check داشته باشد.  
نمایش UI کافی نیست؛ action layer هم باید guard داشته باشد.

## 9. Workflow Engine

Workflow Engine قلب MinaDent است.

هر workflow باید:

- state
- owner role
- due date
- next action
- severity
- related patient/appointment/treatment/finance
- audit event
- notification rule

داشبورد و patient timeline باید از Workflow Engine تغذیه شوند.

## 10. Feature Module Contract

هر feature module باید این فایل/بخش‌ها را داشته باشد:

- domain types
- repository
- service/use-case
- UI screen
- componentها فقط از Design System
- tests
- requirement IDs
- evidence

## 11. ممنوعیت معماری

- import چرخه‌ای
- logic داخل componentهای UI
- hardcoded status/role/doctor/unit
- state محلی غیرقابل sync برای داده مهم
- direct Supabase write از UI
- direct SQLite write بدون repository/audit
- feature بدون route contract
- route بدون requirement ID
- AI action بدون permission/audit

## 12. Vertical Slice Strategy

هر بخش باید با vertical slice واقعی ساخته شود:

مثال Patient+Scheduling:

- schema/local model
- repository
- sync queue
- permission
- audit
- UI
- validation
- tests
- runtime evidence

نه اینکه اول همه UIها ساخته شوند و بعد دنبال اتصال بگردیم.
