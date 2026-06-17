-- MinaDent — Phase 2/3 cloud schema (Supabase / Postgres 15+)
-- Adds staff, labs, lab_cases, payments, implants. Clinic-isolated, RLS-enforced,
-- soft-delete only. Mirrors the local SQLite model and the sync payloads in
-- src/features/*/repository.ts (toCloud). Idempotent: safe to re-run.

-- ---------------------------------------------------------------------------
-- Adjustments to Phase 1 tables
-- ---------------------------------------------------------------------------
-- dob is entered/stored as a Jalali string (yyyy/MM/dd), not a Gregorian date.
alter table public.patients alter column dob type text using dob::text;

-- doctor_id locally references public.staff(id) (a generated uuid), NOT auth.users.
alter table public.appointments drop constraint if exists appointments_doctor_id_fkey;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.staff (
  id                 uuid primary key default gen_random_uuid(),
  clinic_id          uuid not null references public.clinics(id) on delete cascade,
  auth_user_id       uuid references auth.users(id),
  full_name          text not null,
  role               text not null check (role in ('manager','doctor','secretary','assistant')),
  mobile             text,
  national_code      text,
  commission_model   text not null default 'none'
                     check (commission_model in ('none','fixed_50','percentage','advanced')),
  commission_percent integer,
  active             boolean not null default true,
  notes              text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  deleted_at         timestamptz
);
create index if not exists idx_staff_clinic_role on public.staff(clinic_id, role);

create table if not exists public.labs (
  id             uuid primary key default gen_random_uuid(),
  clinic_id      uuid not null references public.clinics(id) on delete cascade,
  name           text not null,
  type           text not null check (type in ('fixed','removable')),
  phone          text,
  address        text,
  contact_person text,
  active         boolean not null default true,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  deleted_at     timestamptz
);
create index if not exists idx_labs_clinic_type on public.labs(clinic_id, type);

create table if not exists public.lab_cases (
  id            uuid primary key default gen_random_uuid(),
  clinic_id     uuid not null references public.clinics(id) on delete cascade,
  patient_id    uuid not null references public.patients(id) on delete cascade,
  lab_id        uuid not null references public.labs(id),
  doctor_id     uuid,
  title         text not null,
  tooth_numbers text,
  status        text not null default 'ordered'
                check (status in ('ordered','in_lab','ready','delivered','returned','cancelled')),
  sent_at       timestamptz,
  due_at        timestamptz,
  delivered_at  timestamptz,
  price         integer,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index if not exists idx_lab_cases_clinic_status on public.lab_cases(clinic_id, status);
create index if not exists idx_lab_cases_patient on public.lab_cases(patient_id);

create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  clinic_id   uuid not null references public.clinics(id) on delete cascade,
  patient_id  uuid not null references public.patients(id) on delete cascade,
  doctor_id   uuid,
  direction   text not null check (direction in ('charge','payment')),
  amount      integer not null,
  method      text check (method in ('cash','card','transfer','other')),
  description text,
  paid_at     timestamptz not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);
create index if not exists idx_payments_clinic_paid on public.payments(clinic_id, paid_at);
create index if not exists idx_payments_patient on public.payments(patient_id);

create table if not exists public.implants (
  id               uuid primary key default gen_random_uuid(),
  clinic_id        uuid not null references public.clinics(id) on delete cascade,
  patient_id       uuid not null references public.patients(id) on delete cascade,
  doctor_id        uuid,
  brand            text not null,
  system           text,
  tooth_number     text,
  fixture_diameter text,
  fixture_length   text,
  placed_at        timestamptz,
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  deleted_at       timestamptz
);
create index if not exists idx_implants_clinic_brand on public.implants(clinic_id, brand);
create index if not exists idx_implants_patient on public.implants(patient_id);

-- ---------------------------------------------------------------------------
-- Row Level Security — clinic members: select/insert/update; NO physical delete.
-- ---------------------------------------------------------------------------
alter table public.staff      enable row level security;
alter table public.labs       enable row level security;
alter table public.lab_cases  enable row level security;
alter table public.payments   enable row level security;
alter table public.implants   enable row level security;

do $$
declare t text;
begin
  foreach t in array array['staff','labs','lab_cases','payments','implants']
  loop
    execute format('drop policy if exists %1$s_select on public.%1$s;', t);
    execute format('create policy %1$s_select on public.%1$s for select using (public.is_clinic_member(clinic_id));', t);
    execute format('drop policy if exists %1$s_insert on public.%1$s;', t);
    execute format('create policy %1$s_insert on public.%1$s for insert with check (public.is_clinic_member(clinic_id));', t);
    execute format('drop policy if exists %1$s_update on public.%1$s;', t);
    execute format('create policy %1$s_update on public.%1$s for update using (public.is_clinic_member(clinic_id)) with check (public.is_clinic_member(clinic_id));', t);
  end loop;
end $$;
