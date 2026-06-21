# MinaDent Backend / Supabase / RLS Permission Contract V1.2

**Rule:** هیچ table در public/exposed schema بدون RLS، policy، index و verification SQL مجاز نیست.

## 1) Role Model
```text
manager
secretary
doctor
assistant
lab_partner_optional
patient_portal_optional
system_service_server_only
```

## 2) Permission Principles
- manager: full clinic-scoped access except irreversible destructive actions need double confirmation.
- secretary: patient/scheduling/CRM/lab operational access; sensitive finance/tariff/delete restricted.
- doctor: own clinical patients/appointments/treatments; finance only scoped/limited if manager grants.
- assistant: inventory/lab/basic operational actions only.
- patient portal: only own data/actions.

## 3) RLS Policy Template
```sql
-- each table must include clinic_id or equivalent tenant boundary
-- SELECT policy by clinic + role
-- INSERT policy by clinic + allowed role
-- UPDATE policy by clinic + allowed role + field restrictions app-layer/server-layer
-- DELETE: default none; soft delete through archived_at/status
```

## 4) Verification SQL Requirements
هر migration backend باید evidence بدهد:

```text
rls_enabled=true
policy_count_expected
column_count_expected
constraints_expected
indexes_expected
trigger_expected
delete_policy_absent_or_justified
service_role_not_in_client
```

## 5) Performance Rule
RLS columns مثل clinic_id/user_id/doctor_id باید index داشته باشند؛ RLS کند روی داده بزرگ ممنوع است.
