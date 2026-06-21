# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## Core Module Deep Spec Import from v65 Lineage

### Why import
The v61–v65 contracts provide useful module definitions for Patient Master, Scheduling, Treatment/Implant, Finance, Cheques, Installments, Lab, Reports, Backup, Inventory, SMS, Insurance, Export/Print, POS/Gateway and Doctor Workspace.

### V1.10 action
Do not duplicate existing V1.7/V1.8/V1.9 module documents. Instead, import the following stricter requirements into the module registry/checklists:

## Patient Master additions
- Required fields: file number, national code, mobile, first name, last name
- file_number and national_code block duplicates
- mobile duplicate is warning-only
- auto file number = max numeric + 1 per clinic, but current Zero Rebuild sequence must start from latest real clinic number near 4000–5000 after owner confirmation
- relation/referrer must not auto-merge/delete records
- offline create, sync, role deny and Android screenshot required for verification

## Scheduling additions
- statuses: scheduled, confirmed, arrived, waiting, in_progress, completed, no_show, cancelled, rescheduled
- no double booking for doctor and unit
- archived patient booking requires manager override
- online booking stays pending approval and must not show doctor name

## Treatment/Implant additions
- treatment stage can have its own doctor attribution
- implant stages: planning, surgery, healing, impression, lab, crown, completed, followup
- doctor share generated from treatment/stage attribution, not payment collection
- lab/invoice/doctor-share trace evidence required

## Finance/Cheques/Installments additions
- practical finance only, not full accounting ledger unless future approved
- methods: cash, POS, bank transfer, card-to-card, cheque, installment, mixed
- cheque lifecycle: received, pending_due, cleared, returned, extended, spent, cancelled
- installment lifecycle: scheduled, due_soon, paid, partial, overdue, cancelled
- hard delete forbidden; correction requires audit

## Lab additions
- statuses: draft, sent, in_progress, ready, received, remake, delivered, cancelled
- lab order must link patient, doctor, treatment/implant where relevant
- shade/tooth/cost/delay status required for prosthetic work

## Reports/Backup/Inventory additions
- reports must be role-filtered
- backup is not verified without restore test
- inventory requires stock_in/out/adjustment/treatment_consumption and low/expiry alert
