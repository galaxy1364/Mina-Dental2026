# MinaDent V1.16 — Unified Foundation / No Random Screen Style Protocol

**Purpose:** جلوگیری از تکرار شکست قبلی که هر صفحه شکل جداگانه، route جدا، component تکراری یا UI چسب‌کاری شده داشته باشد.

---

## 1. قانون مادر طراحی

هیچ صفحه‌ای نباید مستقل و سلیقه‌ای ساخته شود. هر صفحه باید از Foundation مشترک استفاده کند:

```text
Design Tokens → Module Registry → Layout Template → Component Contract → Screen Contract → Data Contract → Runtime Evidence
```

---

## 2. فایل‌ها/موتورهای مشترک اجباری برای تمام صفحات

هر صفحه باید از این قراردادها تبعیت کند:

- AppShell / EnterpriseScreen
- Safe Area Contract
- RTL Root Contract
- Top Bar / Command Bar Contract
- Scrollable Bottom Dock Contract
- Smart Chip Rail Contract
- Full Sheet / Full Page Detail Contract
- Empty/Loading/Error/Offline/Permission states
- Module icon registry
- Semantic color registry
- Typography scale
- Spacing/radius/elevation tokens
- Motion/reduced-motion policy
- Back/close behavior
- Route/deep-link contract
- RBAC visibility contract
- Audit/sync data hooks

---

## 3. ممنوعیات UI قبل از شروع

ممنوع است:

- style inline بی‌قاعده
- رنگ hardcoded خارج از token
- component تکراری برای هر صفحه
- داک متفاوت در صفحات مختلف
- chip rail بدون overflow/dots واقعی
- کارت آماری بدون data contract
- دکمه بدون route/action
- صفحه با متن انگلیسی قابل مشاهده
- تقویم/تاریخ/پول خارج از Persian/Jalali/Toman formatter
- animation سنگین بدون performance budget
- Glass effect روی محتوای مالی/درمانی که خوانایی را خراب کند
- WebView production برای HTML preview

---

## 4. Design Freeze قبل از کدنویسی هر صفحه

قبل از ساخت هر صفحه باید این 12 مورد مشخص شود:

1. هدف صفحه
2. نقش‌های مجاز
3. داده‌های اصلی
4. command/actionهای واقعی
5. مسیرهای navigation
6. chip rail محتوا
7. empty/loading/error/offline states
8. sync/audit badges
9. mobile/iPad/web رفتار
10. performance target
11. accessibility target
12. screenshots/evidence لازم برای PASS

---

## 5. الگوی صفحه استاندارد MinaDent

```text
Top Safe Header
→ Smart Command/Search
→ Context Smart Chips
→ Critical Status Strip
→ Primary Work Cards
→ Timeline/Stepper/Board
→ Module-specific List/Grid
→ Action Sheet / Full Detail
→ Fixed Scrollable Dock
```

هر صفحه می‌تواند شخصیت بصری خود را داشته باشد، اما فقط از همین foundation و tokenها. شخصیت بصری یعنی semantic accent و layout pattern، نه طراحی جزیره‌ای.
