# MinaDent V1.7 — Advanced Iranian Finance, Cheque & Installment Engine Spec

## Purpose
Define the Iranian/global finance engine required by the real clinic. This is a product/domain contract, not implementation yet.

## Core finance requirement
Patients may pay:
- Full cash/card/POS/bank transfer
- Partial amount now
- Remaining amount later
- Cheque
- Installments
- Mixed payment methods
- Discount amount
- Discount percentage

## Invoice and balance
Every treatment/financial case must support:
- Gross amount
- Discount amount and/or percentage
- Net amount
- Paid amount
- Remaining amount
- Payment method breakdown
- Due date if unpaid
- Settlement status
- Manager-only sensitive edits
- Audit log

## Cheque workflow
If `Cheque active` is selected, open cheque details.
Required cheque data:
- Cheque amount
- Due date (Jalali UI, Gregorian DB)
- Bank name
- Cheque number / serial / sayad identifier if used
- Drawer/name
- Receiver/holder
- Patient/case/invoice link
- Status: received, pending, deposited, passed, bounced/returned, replaced, cancelled, settled
- Reminder dates
- Attach image/file optional
- Notes
- Audit trail

Cheque alerts:
- Due today
- Due tomorrow
- Due this week
- Overdue
- Returned cheque
- Missing cheque info

## Installment workflow
If `Installments active` is selected, open installment builder.
Required installment data:
- Total remaining amount
- Number of installments
- Start date
- Due date per installment
- Amount per installment
- Custom amount override
- Paid/unpaid status
- Reminder schedule
- Late alert, no automatic penalty unless explicitly approved
- Payment attachment/reference
- Manager adjustment with audit

Installment alerts:
- Due today
- Due soon
- Overdue
- Partial payment
- Missed installment

## Discount rules
Current clinic rule:
- Discount is discussed case-by-case.
- Must support both fixed amount and percentage.
- No rigid global formula locked yet.
- Large discount can be gated by manager approval in future policy.

## Financial visibility by role
- Manager: full financial view.
- Secretary: operational balance/collection status only, no sensitive revenue/doctor-share unless permitted.
- Doctor: own allowed production/share view, not clinic-wide full finance.
- Assistant: no sensitive finance by default.

## Reports required
- Daily collection
- Patient debt list
- Cheque due list
- Installment due list
- Outstanding balances
- Doctor production/share
- Lab cost impact
- Owner net view
- Secretary salary payments
- Discount report
- Audit-sensitive edit report

## Zero-error rule
Finance features are not complete until they have:
- Data model
- UI flow
- RBAC
- Audit
- Offline handling
- Sync conflict policy
- Test cases
- Phone runtime evidence
