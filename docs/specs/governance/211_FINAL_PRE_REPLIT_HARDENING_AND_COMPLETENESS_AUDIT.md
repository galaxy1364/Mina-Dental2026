# MinaDent V1.16 — Final Pre-Replit Hardening & Completeness Audit

**Phase:** PHASE_0S_FINAL_PRE_REPLIT_HARDENING  
**Status:** GOVERNANCE ONLY / NO CODE / NO BUILD / NO SCHEMA  
**Purpose:** بستن آخرین گپ‌های سندی قبل از اینکه Replit یا هر AI Executor وارد اجرای مرحله‌ای شود.

---

## 1. حکم صادقانه

بسته مادر تا V1.15 از نظر **vision، requirement، forbidden rules، roadmap، module specs، dashboard vision، real clinic data، AI handoff، evidence gates و update protocol** قابل اتکا شده است.

اما هنوز این موارد **شروع نشده‌اند** و نباید ادعای کامل‌بودن اجرایی شود:

- repo/init code
- schema/migration/RLS
- runtime on phone
- APK/IPA/web build
- Supabase/SQLite real wiring
- actual dashboard selectors
- actual appointment booking engine
- actual patient CRUD
- actual financial ledger
- SMS/payment/provider credentials
- real backup/restore test

بنابراین وضعیت درست:

```text
DOCUMENTATION_READY_FOR_CONTROLLED_EXECUTION = YES
PRODUCTION_APP_READY = NO
PHASE1_CODE_AUTHORIZED = ONLY AFTER READONLY ADOPTION AUDIT + OWNER APPROVAL
```

---

## 2. گپ‌هایی که هنوز باید قبل/حین فازها بسته شوند

### 2.1 گپ‌های قبل از شروع Replit

| گپ | وضعیت | قانون |
|---|---|---|
| محل دقیق اجرای Replit/Repo | نیازمند audit | نباید حدس زده شود |
| نسخه runtime هدف برای Expo Go یا Development Build | نیازمند تأیید | اگر Expo Go محدود است، SDK باید سازگار باشد |
| تصاویر/ویدئوهای طراحی بانکت/کیوبانک/نمونه‌های مورد علاقه | اختیاری ولی مهم | فقط token/pattern استخراج شود، کپی ممنوع |
| نام نهایی برند/لوگو/رنگ رسمی | قابل تغییر بعداً | در فاز 1 placeholder صادقانه مجاز است، ولی نه ادعای final brand |
| spelling نهایی نام پزشکان/لاب‌ها/منشی | بهتر است قبل seed | عدم قطعیت باید در seed draft ثبت شود |
| SMS/payment/storage credentials | بعداً لازم | تا credential و proof نباشد VERIFIED REAL ممنوع |

### 2.2 گپ‌هایی که در خود هر ماژول باید research/tick شوند

هر ماژول قبل از کدنویسی باید یک **Module Research & Requirement Completion Sheet** داشته باشد:

- بهترین الگوهای روز دنیا برای آن ماژول
- الگوهای ایران/کلینیک دندانپزشکی
- دیتامدل لازم
- workflow واقعی
- state machine
- RBAC
- audit
- sync/offline
- empty/loading/error/offline states
- performance budget
- device QA
- accessibility/RTL
- چیزهایی که باید از مالک پرسیده شود

اگر این sheet وجود ندارد، کدنویسی ماژول ممنوع است.

---

## 3. قانون ضد تکرار قبل از Replit

هیچ سند قدیمی، prompt قدیمی، HTML preview، scaffold zip یا فایل legacy نباید خام به Replit داده شود.

Replit فقط این را می‌گیرد:

1. ZIP مادر آخرین نسخه
2. Read-only adoption prompt همان نسخه
3. دستور صریح: هیچ code/build/schema/package تا پایان audit مجاز نیست
4. بعد از گزارش audit، فقط یک Phase 1 packet کوچک و controlled

---

## 4. نتیجه V1.16

V1.16 آخرین hardening قبل از شروع است و هدفش این است که:

- هر صفحه شکل جداگانه و بی‌قاعده پیدا نکند.
- همه چیز از یک Design System و Foundation مشترک بیاید.
- AI قبل از شروع هر فاز مجبور به خواندن ممنوعیات، scope، files allowed/forbidden و evidence شود.
- اگر چیزی کم بود، خود AI research کند و tick-list بدهد، نه اینکه حدس بزند.
