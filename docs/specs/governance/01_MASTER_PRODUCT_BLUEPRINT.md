# MinaDent Master Product Blueprint — نقشه مادر محصول

وضعیت: سند مادر محصول  
هدف: تعریف صفر تا صد قابلیت‌های MinaDent برای جلوگیری از پراکندگی و دوباره‌کاری.

---

## 1. پلتفرم‌ها

- Android APK / AAB
- iOS IPA
- Web Admin در آینده
- Offline-first mobile core
- Cloud sync and backup
- Local backup and restore
- Multi-device readiness

## 2. نقش‌ها

### Manager
- دسترسی کامل
- مدیریت پزشکان، منشی، دستیار، لابراتوار، یونیت
- تغییر تعرفه/قیمت
- تأیید حذف/ویرایش حساس
- گزارش مالی و سهم پزشکان
- مشاهده audit و backup

### Doctor
- مشاهده بیماران مرتبط
- ثبت درمان/تشخیص/پلان
- مشاهده نوبت‌های خود
- ثبت next step
- مشاهده سهم خود در حد مجاز

### Secretary
- ثبت بیمار
- ثبت نوبت
- تماس/SMS/WhatsApp
- مشاهده محدود مالی طبق permission
- بدون دسترسی به سود/درآمد کامل

### Assistant
- کمک به workflow درمان، حضور بیمار، آماده‌سازی، وضعیت یونیت
- دسترسی محدود

## 3. ماژول‌های اصلی

### 3.1 Dashboard Command Center
- وضعیت زنده امروز
- بیماران امروز
- نوبت‌ها
- بیماران حاضر
- تأخیرها
- بدهکارها
- اقساط/چک‌های امروز
- پیگیری‌ها
- ظرفیت پزشک/یونیت
- وضعیت Sync/Backup
- هشدارهای هوشمند
- کارت‌های clickable
- خط روند بیماران فعال

### 3.2 Patient Master
- پرونده بیمار
- شماره پرونده
- موبایل
- کد ملی
- اطلاعات پایه
- سوابق پزشکی
- پرونده خانوادگی/referrer
- آرشیو/فعال
- duplicate detection
- timeline کامل
- ضمیمه عکس/رادیوگرافی/رضایت‌نامه
- امضا/اثر انگشت/عکس تأیید در آینده

### 3.3 Smart Scheduling
- ثبت سریع از تماس
- جستجوی بیمار با موبایل
- بیمار جدید بدون پرونده کامل
- انتخاب پزشک
- انتخاب یونیت
- انتخاب نوع خدمت
- مدت زمان قابل ویرایش
- گام‌های 5/10/15/20/30/45/60/Custom
- conflict check
- ظرفیت پزشک/یونیت
- تقویم شمسی
- تعطیلات/جمعه قرمز
- وضعیت‌های حضور/نیامده/لغو/جابجا/انجام شد
- follow-up
- waiting list
- daily timeline
- doctor view
- unit view

### 3.4 Clinical Workflow
- معاینه
- تشخیص
- Treatment Plan
- Treatment Record
- Tooth/Surface
- Dental chart آینده
- نسخه
- فایل‌های تصویری
- next action
- case close/archive

### 3.5 Finance
- فاکتور
- پرداخت نقد/POS/کارت‌به‌کارت
- بدهی
- تخفیف مبلغی
- اقساط
- چک
- هشدار سررسید
- تسویه
- گزارش روزانه
- Doctor share
- Lab cost deduction
- audit مالی

### 3.6 Laboratory
- لابراتوارها
- سفارش لابراتوار
- قیمت لاب
- وضعیت ارسال/دریافت/تحویل
- تاریخ تحویل
- اتصال به پرونده/درمان/مالی

### 3.7 Inventory
- کالاها
- موجودی
- حداقل موجودی
- هشدار کمبود
- مصرف برای درمان
- گزارش ورود/خروج
- audit

### 3.8 CRM & Communication
- تماس
- SMS
- WhatsApp
- یادآوری نوبت
- یادآوری اقساط/چک
- پیام تولد
- recall
- campaign آینده
- caller ID آینده

### 3.9 Notifications
- اعلان داخلی
- هشدار نقش‌محور
- manager alert
- doctor alert
- sync alert
- backup alert

### 3.10 AI Assistant
- فرمان فارسی
- جستجو
- پیشنهاد next action
- ثبت نوبت با permission و تأیید
- گزارش بدهکارها
- بازکردن پرونده
- هیچ AI fake مجاز نیست
- AI فقط بعد از data/permission/audit واقعی فعال می‌شود

## 4. خط روند قفل‌شده

تعریف «خط روند»:

تماس/ورود درخواست  
→ تشخیص بیمار موجود/جدید  
→ پرونده/ثبت سریع  
→ نوبت  
→ حضور  
→ معاینه  
→ درمان/لابراتوار  
→ مالی  
→ follow-up/recall  
→ بستن/آرشیو پرونده

هر بیمار فعال باید مرحله، صاحب مرحله، موعد، هشدار و next action داشته باشد.

## 5. فازهای کلان

### Phase 0 — Governance & Input Audit
قانون، requirementها، design، architecture، data، connector، execution protocol.

### Phase 1 — Production App Shell
RTL, theme, routes, layout, navigation, auth shell, role shell, offline shell.

### Phase 2 — Core Domain Kernel
Patient, Doctor, Unit, Appointment, Calendar, Audit, Sync Queue.

### Phase 3 — Patient + Scheduling Vertical Slice
ثبت بیمار، جستجو، duplicate، ثبت نوبت، conflict، runtime evidence.

### Phase 4 — Workflow Engine
خط روند واقعی، next action، حضور، انجام/نیامده، follow-up.

### Phase 5 — Finance + Lab + Inventory
اتصال درمان/نوبت/مالی/لاب/موجودی.

### Phase 6 — Notifications + CRM
SMS/WhatsApp/reminders/campaigns.

### Phase 7 — AI + Connectors
AI command، MCP/Connector با policy و audit.

### Phase 8 — Release Hardening
Security, backup, restore, performance, device test, release.

## 6. اصل طراحی محصول

هر صفحه باید از یک template واحد ساخته شود:

- Header فارسی
- Smart chip rail
- Command/search
- Content cards
- Empty/error/loading states
- CTA مشخص
- Bottom dock safe area
- RTL natural flow
- Deep sheet/fullscreen detail
- Audit/permission-aware actions
