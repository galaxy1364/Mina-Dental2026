# MinaDent V1.6 — Data Model Completeness Checklist Before Schema

## Purpose
Prevent premature schema work. Schema must come only after domain completeness is clear.

## Required before first schema migration

### Clinic and users
- clinic
- branch/multi-clinic future slot
- users/staff
- roles/permissions
- active/inactive status
- audit actor fields

### Patient
- file number policy
- first/last/full name
- mobile normalization
- national code policy
- gender/birthdate/address optionality
- relationships/referrer
- archive/deactivate
- duplicate warnings
- medical history

### Scheduling
- doctors
- units
- appointment types
- durations
- work hours
- holidays/closures
- free/busy slots
- booking statuses
- cancel/reschedule/no-show
- arrival/waiting/in-treatment/completed
- follow-up/recall

### Clinical
- encounter
- tooth chart
- treatment plan
- treatment execution
- prescription
- imaging/files
- consent

### Finance
- invoice
- payment
- debt
- installment
- cheque
- discount
- doctor share
- lab cost
- refunds/adjustments

### Lab/implant/inventory
- lab order
- lab status
- implant fixture/abutment rules
- inventory item
- stock movement
- treatment-linked consumption

### System
- sync queue
- conflict records
- audit log
- backup records
- notification log
- SMS/message log

## STOP_BLOCKER examples
- Missing appointment conflict status.
- Missing doctor/unit relationship.
- Missing patient file number policy.
- Missing soft delete/audit for finance.
- Missing sync conflict strategy.
- Missing role permissions.
- Missing Persian/Latin digit normalization rule.
