# MinaDent Domain State Machines V1.2

**Rule:** هیچ workflow نباید فقط با متن/چیپ نمایشی ساخته شود. هر workflow باید state، transition، owner، evidence و audit داشته باشد.

## 1) Patient Journey State Machine
```text
lead_new
lead_contacted
file_minimal_created
file_completed
appointment_scheduled
appointment_confirmed
patient_arrived
patient_waiting
visit_started
diagnosis_recorded
treatment_plan_created
consent_required
consent_completed
treatment_in_progress
lab_required
lab_sent
lab_received
finance_pending
partial_paid
installment_active
cheque_pending
followup_required
recall_scheduled
case_closed
archived
reopened
```

### Transition Rules
- هیچ بیمار نباید بدون current_stage، owner_role، due_at، risk_level و next_action بماند.
- برگشت از archived فقط با reason و audit مجاز است.
- هر transition مالی/درمانی حساس باید role-gated باشد.

## 2) Appointment State Machine
```text
draft
slot_selected
patient_selected
scheduled
confirmed
reminded
arrived
late
waiting
in_treatment
completed
cancelled
rescheduled
no_show
followup_created
```

### Rules
- doctor_id و unit_id اجباری است.
- overlap conflict بدون override manager ممنوع است.
- holiday/closed day باید warning/blocked داشته باشد.
- no_show باید به CRM/follow-up وصل شود.

## 3) Clinical/Treatment State Machine
```text
exam_started
condition_recorded
diagnosis_recorded
plan_drafted
plan_accepted
consent_pending
consent_signed
treatment_started
treatment_completed
post_op_instruction_sent
followup_needed
clinical_closed
```

## 4) Lab State Machine
```text
lab_not_required
lab_order_draft
lab_sent
lab_in_progress
lab_ready
lab_received
lab_delivered_to_patient
lab_returned_for_correction
lab_closed
```

## 5) Finance State Machine
```text
not_billed
invoice_draft
invoice_issued
unpaid
partial_paid
installment_plan_active
cheque_pending
overdue
settled
refunded
writeoff_requested
writeoff_approved
```

## 6) Sync State Machine
```text
local_clean
local_dirty
queued
syncing
synced
conflict_detected
conflict_resolved
failed_retryable
failed_blocked
```

## 7) AI Action State Machine
```text
suggested
requires_confirmation
approved
executing
completed
rejected
blocked_by_policy
failed_with_evidence
```

**AI never directly performs destructive or sensitive actions without role-scoped confirmation and audit.**
