# Supabase (Cloud)

اسکیمای ابری مینادنت: جداسازی کلینیک با RLS، فقط soft-delete، و `audit_log` فقط-افزودنی.

## اعمال اسکیما

سه راه:

1. **SQL Editor در داشبورد Supabase** (ساده‌ترین): محتوای `migrations/0001_init.sql` را اجرا کنید.
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
| `audit_log` | ممیزی تغییرناپذیر (insert-only) |

RLS از طریق تابع `is_clinic_member(clinic_id)` اعمال می‌شود: هر کاربر فقط دادهٔ کلینیک‌های خودش را می‌بیند/می‌نویسد. حذف فیزیکی مجاز نیست (به‌جز cascade مدیریتی)؛ حذف منطقی با `deleted_at`.
