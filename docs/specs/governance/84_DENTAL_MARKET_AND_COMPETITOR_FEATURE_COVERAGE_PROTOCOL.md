# 84 — Dental Market & Competitor Feature Coverage Protocol
Version: V1.5
Status: LOCKED BENCHMARK GOVERNANCE

## Purpose
MinaDent must not be weaker than Iranian and global dental-management systems. Competitor features must be extracted, normalized, and either implemented, rejected with reason, or scheduled as future backlog.

## Known Iranian benchmark: Labkhand
Public information indicates Labkhand supports clinic/dental-office management capabilities, including limits/features around clinics, doctors/units, insurance modules, patient records, dental charting, search, electronic signature/fingerprint references in public descriptions, and add-on modules. These must become coverage requirements or explicit reject/future decisions.

## Feature extraction categories
For each competitor/source, extract:

1. Patient record and search.
2. Dental chart and treatment history.
3. Appointment scheduling and capacity.
4. Insurance.
5. Finance/invoice/payment/debt.
6. Lab and inventory.
7. Imaging/files.
8. Consent/signature/fingerprint/photo.
9. SMS/communication/CRM.
10. Reporting and KPI.
11. Multi-doctor/multi-unit/multi-clinic.
12. Backup/security/audit.

## Coverage matrix statuses
```text
MUST_HAVE_MVP
MUST_HAVE_PHASED
REWRITE_FOR_IRAN
FUTURE_ADVANCED
REJECT_NOT_RELEVANT
BLOCKED_NEEDS_OFFICIAL_API
```

## Competitive superiority rule
For every accepted competitor feature, MinaDent must add at least one of:

- stronger audit/RBAC;
- offline-first behavior;
- timeline integration;
- AI-assisted but human-approved workflow;
- better Persian/RTL/Jalali UX;
- stronger reporting;
- phone-first speed;
- safer evidence/test gate.

## No competitor cloning
Competitor features may define coverage, but implementation must follow MinaDent architecture, token system, data contracts, workflow engine, and security rules.
