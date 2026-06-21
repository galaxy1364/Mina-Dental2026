# Design System Contract — قرارداد طراحی واحد

وضعیت: اجباری  
هدف: جلوگیری از اینکه هر صفحه یک شکل ساخته شود.

---

## 1. هویت بصری

MinaDent باید حس اپ بانکی مدرن و پزشکی Enterprise داشته باشد:

- Persian-first
- RTL-native
- Mobile-first
- Premium
- Clean
- Fast
- Glass/soft cards در حد استاندارد و نه سنگین
- Micro-interactions
- Compact but readable
- Clinic-grade trust

الهام مجاز: اپ‌های بانکی مدرن، Banqet/Bank Mehr/Cube Bank style، iOS-level motion.  
کپی مستقیم مجاز نیست؛ باید MinaDent identity ساخته شود.

## 2. قانون صفحه

هر صفحه باید این ساختار را داشته باشد:

1. Header
2. Smart status/chip rail
3. Primary content
4. Contextual actions
5. Empty/loading/error/success states
6. Bottom dock safe padding
7. Sheet/fullscreen detail برای drill-down

## 3. RTL Rules

- متن‌ها راست‌چین
- ترتیب chips از راست به چپ
- stepper از راست به چپ
- اعداد فارسی/انگلیسی با normalization
- inputها writingDirection: rtl مگر موبایل/کد
- تقویم شنبه تا جمعه
- جمعه قرمز
- تعطیلات رسمی/خصوصی قابل override

## 4. Components پایه

هیچ صفحه‌ای نباید component اختصاصی خام بسازد مگر وارد design system شود.

Components:

- AppScreen
- AppHeader
- SmartChipRail
- StatCard
- TimelineCard
- JourneyStepper
- ActionButton
- PermissionButton
- RtlTextField
- RtlSelect
- RtlDatePicker
- RtlTimePicker
- BottomSheet
- FullscreenDetail
- EmptyState
- LoadingState
- ErrorState
- SuccessBanner
- AuditBadge
- SyncBadge
- PatientCard
- AppointmentCard
- FinanceCard
- LabCard
- InventoryCard

## 5. Motion Contract

Motion فقط وقتی مجاز است که performance را خراب نکند:

- page transition نرم
- bottom sheet gesture
- chip scroll
- card press feedback
- success/error feedback
- no excessive animation
- no blocking animation

## 6. Color Semantics

رنگ‌ها معنی دارند:

- سبز: انجام شده/پرداخت/حضور
- زرد/کهربایی: هشدار/در انتظار
- قرمز: بدهی/خطر/لغو/تأخیر
- آبی: درمان/اطلاعات
- بنفش: جلسه/خاص
- خاکستری: تعطیل/غیرفعال
- طلایی: تولد/مناسبت

رنگ بدون معنی ممنوع است.

## 7. Dashboard Contract

داشبورد باید command center باشد، نه صفحه کارت تزئینی.

باید نمایش دهد:

- بیماران امروز
- نوبت‌های امروز
- در انتظار
- تأخیر
- بدهکارها
- چک/قسط سررسید
- follow-up
- ظرفیت پزشک
- ظرفیت یونیت
- sync health
- backup health
- alert center
- patient journey

هر کارت باید قابل کلیک و وصل به فیلتر واقعی باشد.

## 8. Form Contract

هر فرم باید:

- validation زنده
- خطای فارسی
- duplicate warning پیش از submit
- disabled state
- loading state
- success path
- audit action
- بدون keyboard collapse bug
- موبایل ایران 09 و 11 رقم
- submit guard

## 9. Calendar Contract

تقویم باید:

- شمسی
- سریع
- week/day/month/year
- doctor/unit view
- dots/counts
- day panel
- time travel
- past dim but searchable
- holiday override
- slot engine

## 10. ممنوعیت طراحی

- صفحه ساده اداری خام
- placeholder دائمی
- آیکن متنی عجیب
- فاصله‌های ناسازگار
- tab/chip LTR در محیط فارسی
- دکمه‌های قبلی/بعدی زائد برای railهایی که باید swipe باشند
- فضای خالی زیر/روی dock
- کارت‌های خیلی بلند بدون دلیل
- scroll زیر dock
- componentهای مرده
