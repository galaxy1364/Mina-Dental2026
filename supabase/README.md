# Supabase (Cloud)

اسکیمای ابری مینادنت: جداسازی کلینیک با RLS، فقط soft-delete، و `audit_log` فقط-افزودنی.

> وضعیت: اسکیما (`0001_init.sql` + `0002_phase23.sql`) و seed روی پروژهٔ Supabase اعمال شده و RLS فعال است. کلینیک با شناسهٔ ثابت `afc3cf13-9d00-4076-b0c9-25829bb59848` ساخته و کاربر مدیر به آن متصل شده است.

## اعمال اسکیما

سه راه:

1. **SQL Editor در داشبورد Supabase** (ساده‌ترین): به ترتیب محتوای `migrations/0001_init.sql` سپس `migrations/0002_phase23.sql` را اجرا کنید.
2. **Supabase CLI:**
   ```bash
   supabase db push   # یا: psql "$DATABASE_URL" -f supabase/migrations/0001_init.sql
   ```
3. **psql با connection string:**
   ```bash
   psql "postgresql://...:5432/postgres" -f supabase/migrations/0001_init.sql
   ```

## ساخت کاربر مدیر و seed

1. در داشبورد: Authentication → Users → Add user (ایمیل + رمز عبور؛ Email confirm را روشن نگه دارید یا کاربر را تأیید کنید).
2. در `seed.sql` مقدار `MANAGER_EMAIL_HERE` را با ایمیل همان کاربر جایگزین و اجرا کنید.
3. حالا با همان ایمیل/رمز در اپ وارد شوید.

## جداول

| جدول | نقش |
| --- | --- |
| `clinics` | کلینیک‌ها |
| `clinic_users` | عضویت کاربر در کلینیک + نقش (manager/secretary/doctor) |
| `patients` | بیماران (یکتا: clinic_id + file_number) |
| `appointments` | نوبت‌ها |
| `staff` | کادر درمان/پرسنل + سهم‌بندی |
| `labs` | لابراتوارها (ثابت/متحرک) |
| `lab_cases` | سفارش‌های لابراتوار |
| `payments` | دفتر مالی (بدهکاری/دریافت) |
| `implants` | ثبت ایمپلنت |
| `audit_log` | ممیزی تغییرناپذیر (insert-only) |

RLS از طریق تابع `is_clinic_member(clinic_id)` اعمال می‌شود: هر کاربر فقط دادهٔ کلینیک‌های خودش را می‌بیند/می‌نویسد. حذف فیزیکی مجاز نیست (به‌جز cascade مدیریتی)؛ حذف منطقی با `deleted_at`.
