-- MinaDent — Phase 1 cloud schema (Supabase / Postgres 15+)
-- Clinic-isolated, RLS-enforced, soft-delete only (no physical deletes),
-- append-only audit_log. Mirrors the local SQLite model in src/core/db/schema.ts.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.clinics (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  created_at  timestamptz not null default now()
);

-- Membership + role binding between an auth user and a clinic.
create table if not exists public.clinic_users (
  id           uuid primary key default gen_random_uuid(),
  clinic_id    uuid not null references public.clinics(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  role         text not null check (role in ('manager','secretary','doctor')),
  display_name text,
  created_at   timestamptz not null default now(),
  unique (clinic_id, user_id)
);

create table if not exists public.patients (
  id            uuid primary key default gen_random_uuid(),
  clinic_id     uuid not null references public.clinics(id) on delete cascade,
  file_number   integer not null,
  first_name    text not null,
  last_name     text not null,
  national_code text,
  mobile        text,
  dob           date,
  gender        text check (gender in ('male','female','other')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz,
  unique (clinic_id, file_number)
);
create index if not exists idx_patients_clinic_name on public.patients(clinic_id, last_name, first_name);
create index if not exists idx_patients_clinic_mobile on public.patients(clinic_id, mobile);

create table if not exists public.appointments (
  id          uuid primary key default gen_random_uuid(),
  clinic_id   uuid not null references public.clinics(id) on delete cascade,
  patient_id  uuid not null references public.patients(id) on delete cascade,
  doctor_id   uuid references auth.users(id),
  unit        text,
  start_time  timestamptz not null,
  end_time    timestamptz not null,
  status      text not null default 'scheduled'
              check (status in ('scheduled','confirmed','arrived','in_progress','completed','no_show','cancelled')),
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);
create index if not exists idx_appts_clinic_start on public.appointments(clinic_id, start_time);

-- Append-only audit trail.
create table if not exists public.audit_log (
  id          uuid primary key default gen_random_uuid(),
  clinic_id   uuid not null references public.clinics(id) on delete cascade,
  actor_id    uuid references auth.users(id),
  action      text not null,
  entity_type text not null,
  entity_id   text,
  payload     jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists idx_audit_clinic_created on public.audit_log(clinic_id, created_at);

-- ---------------------------------------------------------------------------
-- Helper: is the current user a member of the given clinic?
-- ---------------------------------------------------------------------------
create or replace function public.is_clinic_member(target_clinic uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.clinic_users cu
    where cu.clinic_id = target_clinic and cu.user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.clinics       enable row level security;
alter table public.clinic_users  enable row level security;
alter table public.patients      enable row level security;
alter table public.appointments  enable row level security;
alter table public.audit_log     enable row level security;

-- clinics: members can read their own clinic.
drop policy if exists clinics_select on public.clinics;
create policy clinics_select on public.clinics
  for select using (public.is_clinic_member(id));

-- clinic_users: a user can read membership rows of clinics they belong to.
drop policy if exists clinic_users_select on public.clinic_users;
create policy clinic_users_select on public.clinic_users
  for select using (public.is_clinic_member(clinic_id));

-- patients: full read/write for clinic members; NO delete (soft-delete via update).
drop policy if exists patients_select on public.patients;
create policy patients_select on public.patients
  for select using (public.is_clinic_member(clinic_id));
drop policy if exists patients_insert on public.patients;
create policy patients_insert on public.patients
  for insert with check (public.is_clinic_member(clinic_id));
drop policy if exists patients_update on public.patients;
create policy patients_update on public.patients
  for update using (public.is_clinic_member(clinic_id))
  with check (public.is_clinic_member(clinic_id));

-- appointments: same pattern.
drop policy if exists appts_select on public.appointments;
create policy appts_select on public.appointments
  for select using (public.is_clinic_member(clinic_id));
drop policy if exists appts_insert on public.appointments;
create policy appts_insert on public.appointments
  for insert with check (public.is_clinic_member(clinic_id));
drop policy if exists appts_update on public.appointments;
create policy appts_update on public.appointments
  for update using (public.is_clinic_member(clinic_id))
  with check (public.is_clinic_member(clinic_id));

-- audit_log: members can insert and read; never update/delete (immutable).
drop policy if exists audit_insert on public.audit_log;
create policy audit_insert on public.audit_log
  for insert with check (public.is_clinic_member(clinic_id));
drop policy if exists audit_select on public.audit_log;
create policy audit_select on public.audit_log
  for select using (public.is_clinic_member(clinic_id));
