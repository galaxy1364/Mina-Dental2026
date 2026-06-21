# MinaDent V1.7 — Clinic Master Data Seed Draft (Non-Executable)

## Purpose
Prepare a human-readable seed draft from real clinic data. This is not SQL and must not be run.

## Staff seed draft
```yaml
clinic:
  name: MinaDent / Mina Dental Clinic
  language: fa
  direction: rtl
  country: Iran

staff:
  - display_name: دکتر مهدی
    roles: [manager, owner, doctor]
    active: true
    compensation_profile: owner_doctor_net
  - display_name: دکتر مینا مازندرانی
    roles: [doctor]
    active: true
    compensation_profile: mina_50_after_lab
  - display_name: اکرم عیدی
    roles: [secretary]
    active: true
    salary_profile: configurable_monthly_salary
```

## Unit seed draft
```yaml
units:
  - name_fa: یونیت آبی
    color_hint: blue
    active: true
  - name_fa: یونیت دوم
    color_hint: confirm_later
    active: true
```

## Patient numbering seed draft
```yaml
patient_file_sequence:
  minimum_capacity: 200000
  current_existing_range_hint: 4000_to_5000
  start_from: must_confirm_latest_real_number
```

## Treatment catalog seed draft
```yaml
scope:
  include_common_dental_services: true
  exclude_orthodontics_initially: true
  future_activate_orthodontics_possible: true
```

## Finance seed draft
```yaml
finance:
  partial_payment: enabled
  cheque: enabled_when_checked
  installments: enabled_when_checked
  discount_amount: enabled
  discount_percent: enabled
  debt_tracking: enabled
  doctor_share_engine: multi_formula
```

## Calendar seed draft
```yaml
calendar:
  jalali_ui: true
  gregorian_db: true
  friday_red: true
  iran_official_holidays_red: true
  holiday_override: manager
  past_dates_visible: true
  past_booking_default_blocked: true
```

## Warning
This file exists to prevent forgetting real clinic data. It is not a migration, not code, and not a seed script.
