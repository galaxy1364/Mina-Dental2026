# مینادنت | MinaDent

سامانهٔ مدیریت کلینیک دندان‌پزشکی — **آفلاین‌اول (offline-first)**، فارسی، راست‌به‌چپ، با تقویم جلالی.
ساخته‌شده برای کلینیک مینا دنتال؛ مقیاس‌پذیر تا بیش از ۲۰۰٬۰۰۰ پروندهٔ بیمار.

> MinaDent — an offline-first dental clinic management app. Persian, RTL, Jalali calendar.

## معماری (Stack)

| لایه | فناوری |
| --- | --- |
| اپ | Expo SDK 56 (managed) · React Native · TypeScript (strict) · Expo Router |
| دیتابیس محلی | `expo-sqlite` (WAL) + `drizzle-orm` — منبع حقیقتِ آفلاین |
| ابر | Supabase (Auth · Postgres · RLS · Storage) |
| داده | TanStack Query · Zod |
| بین‌المللی‌سازی | RTL کامل · فونت Vazirmatn · `date-fns-jalali` |

## اصول کلیدی

- **آفلاین‌اول:** همهٔ نوشتن/خواندن‌ها ابتدا روی SQLite؛ اپ بدون اینترنت کامل کار می‌کند.
- **بدون حذف داده:** فقط soft-delete (`deleted_at`)؛ هیچ حذف فیزیکی‌ای انجام نمی‌شود.
- **صفِ همگام‌سازی بادوام:** هر نوشتهٔ آفلاین در `sync_queue` ثبت می‌شود و در برابر بسته‌شدن اپ مقاوم است؛ به‌محض اتصال، به ابر push می‌شود.
- **پیکربندی صریح:** نبودِ کلیدهای ابری به‌صورت شفاف نمایش داده می‌شود (بدون fallback جعلی).

## راه‌اندازی

```bash
npm install
cp .env.example .env   # و مقادیر Supabase را وارد کنید
npm start              # اجرای Metro / Expo
```

اسکریپت‌ها:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm test            # jest (تست‌های واحد)
npm run android     # اجرا روی اندروید
```

## متغیرهای محیطی

| کلید | توضیح |
| --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | آدرس پروژهٔ Supabase |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | کلید عمومی کلاینت (anon/publishable) |
| `EXPO_PUBLIC_APP_ENV` | `development` \| `preview` \| `production` |

## ساختار پوشه‌ها

```
src/
  app/            مسیرهای Expo Router ((auth) و (app))
  core/           هسته: config, db (sqlite+drizzle), sync, supabase, commands, events, audit, rules
  design/         توکن‌ها و کامپوننت‌های پایه (Screen, Text, Button, ...، ۸ وضعیت UI)
  features/       ماژول‌ها (auth, ...)
  lib/            ابزارها (jalali, persian)
  providers/      Providerهای سراسری
```
