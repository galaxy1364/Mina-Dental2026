-- MinaDent — seed the clinic and bind a manager user.
-- Run AFTER creating the manager user in Supabase Auth (Authentication -> Users -> Add user),
-- then replace :manager_email with that user's email.
--
-- Usage (Supabase SQL editor):
--   1) create the clinic
--   2) bind the existing auth user as 'manager'
-- Idempotent: safe to re-run.

with c as (
  insert into public.clinics (name)
  select 'مینا دنتال'
  where not exists (select 1 from public.clinics where name = 'مینا دنتال')
  returning id
), clinic as (
  select id from c
  union all
  select id from public.clinics where name = 'مینا دنتال' limit 1
), u as (
  select id, email from auth.users where email = 'MANAGER_EMAIL_HERE'
)
insert into public.clinic_users (clinic_id, user_id, role, display_name)
select (select id from clinic limit 1), u.id, 'manager', 'مدیر کلینیک'
from u
on conflict (clinic_id, user_id) do nothing;
