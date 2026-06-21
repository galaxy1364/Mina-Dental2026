# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## Scheduling, Treatment, Finance, Lab, Reports Import

This document imports useful module-level detail from the v61–v65 lineage into the current Zero Rebuild backlog without duplicating already-created V1.7 module docs.

## Scheduling imported checks
- doctor + unit conflict rejection
- wait/arrival/status transitions
- Jalali UI, Gregorian DB
- manager override for archived patient booking
- online booking pending/manual approval
- no doctor name in public online booking/SMS

## Treatment and Implant imported checks
- multi-stage treatment and implant lifecycle
- independent doctor attribution per stage/item
- stage-specific lab/invoice/share trace
- fixture/abutment responsibility rules must be configurable and audited

## Finance imported checks
- practical clinic finance only unless owner requests accounting ledger
- invoice/payment/debt/discount/doctor_share audit
- payment correction logged
- doctor cannot edit finance
- secretary limited
- accountant role optional future

## Cheques imported checks
- sayad number optional but supported
- due date Jalali UI / Gregorian DB
- returned cheque affects debt status
- due list and reminders

## Installments imported checks
- scheduled/due_soon/partial/paid/overdue/cancelled states
- sum must equal plan amount unless manager override
- overdue appears in patient detail and dashboard

## Lab imported checks
- lab order statuses with delayed report
- patient/doctor/lab/treatment links
- lab costs feed finance and doctor share

## Reports imported checks
- today income/payments/open debts/overdue installments/near-due cheques/today appointments/no-shows/new patients/completed treatments/doctor production/lab status/sync/backup
- role-specific visibility

## Backup imported checks
- no backup verified without restore drill
- manager-only backup/restore
- encrypted backup/export
- destructive restore requires multi-step explicit owner approval
