# MinaDent — Engineering Roadmap
> نسخه ۱.۰.۰ — به‌روزشده ۱۴۰۵ | استاندارد: ISO/IEC 25010, WCAG 2.2 AA, HL7 FHIR R4 (subset)
> قفل‌شده: تغییر فقط با تأیید مدیر پروژه مجاز است

---

## معماری کلی (Architecture Overview)

```
┌─────────────────────────────────────────────────────┐
│                MinaDent PWA / Native                │
│  React 18 + Vite + TypeScript + TanStack Query      │
│  Wouter · Framer Motion · Tailwind CSS · Vazirmatn  │
├────────────┬───────────────────────┬────────────────┤
│ Offline DB │   Service Worker      │ Push Notifs    │
│ IndexedDB  │   (Workbox)           │ Web Push API   │
│ Dexie.js   │   Background Sync     │                │
└────────────┴───────────┬───────────┴────────────────┘
                         │ REST / JSON (مرحله فعلی)
                         │ → WebSocket (مرحله ۵)
┌───────────────────────▼─────────────────────────────┐
│          Express API Server (@workspace/api-server) │
│          Fastify (مرحله ۴: ارتقا به Fastify)        │
│  Zod validation · Pino logging · JWT auth (مرحله ۳) │
├─────────────────────────────────────────────────────┤
│          PostgreSQL (Drizzle ORM)                   │
│          Redis cache (مرحله ۴)                      │
└─────────────────────────────────────────────────────┘
```

---

## فاز ۰ — پایه‌گذاری (DONE ✅)

| # | کار | وضعیت |
|---|-----|--------|
| 0.1 | monorepo pnpm + TypeScript | ✅ |
| 0.2 | PostgreSQL schema (8 table-group) | ✅ |
| 0.3 | OpenAPI 50+ endpoint + codegen | ✅ |
| 0.4 | Express API server + Drizzle ORM | ✅ |
| 0.5 | React Vite frontend scaffold | ✅ |
| 0.6 | Vazirmatn font + RTL + Jalali utils | ✅ |
| 0.7 | PWA manifest + installable | ✅ |
| 0.8 | Seed data (staff, labs, patients) | ✅ |

---

## فاز ۱ — UI/UX بنیادی (IN PROGRESS 🔄)

| # | کار | وضعیت |
|---|-----|--------|
| 1.1 | White theme + Bottom Dock | ✅ |
| 1.2 | RTL chips (scroll از راست) | ✅ |
| 1.3 | Splash screen با لوگو اصلی | ✅ |
| 1.4 | Logo fill در کادر مربعی | ✅ |
| 1.5 | Logo بزرگ‌تر در header | ✅ |
| 1.6 | Dashboard کارت‌های قابل کلیک | ✅ |
| 1.7 | خط روند بیماران فعال در Dashboard | ✅ |
| 1.8 | نمایش پزشکان با رنگ مجزا | ✅ |
| 1.9 | CONSTRAINTS.md قفل‌شده | ✅ |
| 1.10 | Staff update (فراهانی، یاری، یازرلو) | ✅ |
| 1.11 | **Calendar فوق‌پیشرفته Jalali + تعطیلات** | ⏳ |
| 1.12 | **صفحه patient-detail کامل + timeline** | ⏳ |
| 1.13 | **dental chart — quadrant صحیح** | ⏳ |
| 1.14 | **نوبت‌گیری modal کامل** | ⏳ |

---

## فاز ۲ — موتور Timeline هوشمند (PLANNED)

**هدف**: چرخه کامل خودکار هر بیمار از اولین تماس تا تسویه

| # | کار | جزئیات |
|---|-----|---------|
| 2.1 | Timeline state machine | مراحل: lead → visit → diagnosis → treatment → lab → payment → complete |
| 2.2 | Event sourcing برای timeline | هر تغییر = یک event ثبت‌شده غیرقابل حذف |
| 2.3 | کارت هوشمند روی صفحه | وقتی زمان نوبت رسید، کارت popup: «بیمار آمد؟» |
| 2.4 | Follow-up scheduler | بعد از هر مرحله، مرحله بعد پیشنهاد + alert |
| 2.5 | Timeline در dashboard | خط روند زنده همه بیماران |
| 2.6 | Timeline در patient-detail | کامل با تاریخچه |
| 2.7 | Notification engine | Web Push برای گوشی کارکنان |
| 2.8 | Stage triggers | قوانین: اگر ۷ روز گذشت و نوبت نگرفت → alert |

**State Machine:**
```
lead → first_call → appointment_set → arrived | no_show
arrived → examined → planned | declined
planned → in_treatment → lab_order | direct_finish
in_treatment → payment → settled | installment
settled → followup → closed
```

---

## فاز ۳ — احراز هویت واقعی (PLANNED)

| # | کار | جزئیات |
|---|-----|---------|
| 3.1 | OTP via SMS (Melipayamak/Kavenegar) | ارسال کد ۶ رقمی به موبایل |
| 3.2 | Whitelist validation | فقط شماره‌های ثبت‌شده می‌توانند وارد شوند |
| 3.3 | JWT access + refresh token | access: 15min، refresh: 30 روز |
| 3.4 | Role-based access control (RBAC) | manager > doctor > secretary > assistant |
| 3.5 | Session management | logout همه دستگاه‌ها |
| 3.6 | Biometric unlock | Face ID / Fingerprint (Capacitor) |

---

## فاز ۴ — تقویم پیشرفته (PLANNED)

| # | کار | جزئیات |
|---|-----|---------|
| 4.1 | تقویم ماهانه Jalali | رنگ‌بندی: نوبت=آبی، ایمپلنت=بنفش، ترمیم=نارنجی |
| 4.2 | تعطیلات رسمی ایران | API: تعطیلات ۱۴۰۵-۱۴۱۰ از منبع معتبر |
| 4.3 | تعطیلات جهانی | مناسبت‌های پزشکی بین‌المللی |
| 4.4 | کلیک روی روز | نمایش همه نوبت‌ها + امکان اضافه |
| 4.5 | Drag & drop رزرو | تغییر زمان با کشیدن |
| 4.6 | نمای هفتگی | ۷ روز با slot‌های ۱۵ دقیقه‌ای |
| 4.7 | تعارض‌یابی | alert اگر یک واحد در یک وقت ۲ نوبت داشت |

---

## فاز ۵ — CRM و بازاریابی (PLANNED)

| # | کار | جزئیات |
|---|-----|---------|
| 5.1 | قالب‌های پیامک | متن پیش‌فرض + قابل ویرایش |
| 5.2 | toggle فعال/غیرفعال iOS-style | هر پیام قابل on/off |
| 5.3 | ارسال SMS (Kavenegar) | نوبت یادآوری، تأخیر، تسویه |
| 5.4 | WhatsApp Business API | ارسال از طریق Meta API |
| 5.5 | Telegram Bot | پیام‌رسانی از طریق Bot API |
| 5.6 | Bale / Rubika / Eitaa | API داخلی برای پیام‌رسان‌های ایرانی |
| 5.7 | کمپین بازاریابی | تولد بیمار، یادآوری چکاپ، تبریک |
| 5.8 | آمار ارسال | تعداد ارسال‌شده، خوانده‌شده، کلیک |
| 5.9 | AI متن‌نویسی | تولید متن تبلیغاتی با OpenAI/Gemini |

---

## فاز ۶ — AI Assistant (PLANNED)

| # | کار | جزئیات |
|---|-----|---------|
| 6.1 | جستجوی طبیعی فارسی | «بیماری که دیروز نوبت داشت» |
| 6.2 | دستیار AI چت | پاسخ به سؤالات عامیانه درباره بیماران |
| 6.3 | پیشنهاد خودکار treatment | بر اساس دیاگنوز قبلی |
| 6.4 | تشخیص تعارض | زمان‌بندی هوشمند |
| 6.5 | گزارش‌دهی با زبان طبیعی | «درآمد این ماه نسبت به ماه قبل چقدر بوده؟» |
| 6.6 | OCR پرونده کاغذی | عکس از دندان‌نگار → دیجیتال |

---

## فاز ۷ — آفلاین-اول + Sync (PLANNED)

| # | کار | جزئیات |
|---|-----|---------|
| 7.1 | Service Worker (Workbox) | cache-first برای assets |
| 7.2 | IndexedDB (Dexie.js) | ذخیره کامل داده محلی |
| 7.3 | Background Sync | هنگامی که اینترنت وصل شد، sync |
| 7.4 | Conflict resolution | اگر دو دستگاه یک رکورد را ویرایش کردند |
| 7.5 | بکاپ ابری خودکار | هر شب ساعت ۲ → S3/Supabase |
| 7.6 | بکاپ لوکال | Export به JSON/CSV با رمزگذاری |
| 7.7 | Restore | بازیابی از بکاپ |

---

## فاز ۸ — بسته‌بندی Native (PLANNED)

| # | کار | جزئیات |
|---|-----|---------|
| 8.1 | Capacitor 6 setup | wrapper برای Android/iOS |
| 8.2 | Android APK | gradle build + keystore |
| 8.3 | iOS IPA | Xcode build (نیاز Mac + Apple Developer) |
| 8.4 | Push Notification Native | FCM برای Android، APNs برای iOS |
| 8.5 | Biometric | Face ID / Fingerprint |
| 8.6 | Local Storage Native | SQLite از طریق Capacitor plugin |
| 8.7 | Camera | عکاسی از دندان‌نگار، مدارک |
| 8.8 | TestFlight + Play Store | انتشار beta |

---

## فاز ۹ — تست و QA (PLANNED)

| # | کار | ابزار |
|---|-----|-------|
| 9.1 | Unit tests API | Vitest + Supertest |
| 9.2 | Component tests | Vitest + Testing Library |
| 9.3 | E2E tests | Playwright |
| 9.4 | Performance audit | Lighthouse CI (target: ≥95) |
| 9.5 | Security scan | OWASP ZAP |
| 9.6 | Accessibility | axe-core (WCAG 2.2 AA) |
| 9.7 | Load test | k6 (500 concurrent users) |
| 9.8 | RTL/Jalali regression | Cypress custom commands |

---

## فاز ۱۰ — استقرار و نگهداری (PLANNED)

| # | کار | جزئیات |
|---|-----|---------|
| 10.1 | Docker Compose | API + DB + Redis |
| 10.2 | CI/CD (GitHub Actions) | test → build → deploy |
| 10.3 | Nginx reverse proxy | SSL termination |
| 10.4 | Monitoring (Grafana+Prometheus) | uptime، latency، errors |
| 10.5 | Log management (Loki) | query logs |
| 10.6 | DB backup cron | هر ۶ ساعت |
| 10.7 | Zero-downtime deploy | rolling update |
| 10.8 | Disaster recovery plan | RTO ≤ ۱ ساعت، RPO ≤ ۶ ساعت |

---

## اطلاعات ثابت کلینیک (مرجع)

| نقش | نام | موبایل |
|-----|-----|--------|
| مدیر | مهدی حسن‌وند | 09191145612 |
| پزشک | دکتر مینا مازندرانی | 09121903896 |
| پزشک | دکتر مهدی مازندرانی | 09121234567 |
| پزشک | دکتر ابوالفضل فراهانی | — |
| پزشک | دکتر یاری | — |
| پزشک | دکتر یازرلو | — |
| منشی | اکرم عیدی | 09105306142 |
| لابراتوار ثابت | نجدکی | — |
| لابراتوار متحرک | هژبری | — |

---

## معیارهای کیفیت (Quality Gates)

- Lighthouse Performance ≥ 90
- Lighthouse Accessibility ≥ 95
- Lighthouse PWA ≥ 100
- API response P95 ≤ 200ms
- Offline load time ≤ 500ms
- Test coverage ≥ 80%
- Zero critical security findings (OWASP Top 10)
- RTL audit: 100% صفحات
- Jalali date: 100% نمایش‌های تاریخ

---

*آخرین به‌روزرسانی: ۱۴۰۵/۰۳/۲۵ | مسئول: مهدی حسن‌وند*
