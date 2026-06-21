# 129 — Financial Ledger State Machine V16 Alignment
Version: V1.8
Status: LOCKED

## هدف
V16 یک Financial Ledger Contract فشرده و مفید دارد. V1.7 قوانین واقعی مالی کلینیک را دارد. این فایل آن‌ها را merge می‌کند.

## Canonical ledger types
| Type | معنی | State Transition | Permission | Required Audit |
|---|---|---|---|---|
| CHARGE | ایجاد مبلغ درمان | draft -> created -> posted -> void_requested -> voided | manager/doctor/secretary حسب policy | patient_id, treatment_id, tooth/surface, doctor_id, amount |
| DISCOUNT | تخفیف | requested -> approved/rejected -> applied | manager or policy | old_amount, discount_type, value, reason |
| PAYMENT | پرداخت | received -> posted -> corrected | secretary ثبت، manager اصلاح | method, amount, receipt_no, actor |
| DEBT | بدهی | open -> partially_paid -> settled -> overdue -> follow_up | system+manager | due_date, remaining_amount |
| CHEQUE | چک | registered -> due -> collected/returned -> follow_up -> closed | finance/manager | bank, sayyad/serial, due_date, amount, owner |
| INSTALLMENT | قسط | scheduled -> due -> paid/overdue -> settled | finance/manager | installment_no, due_date, amount |
| ADJUSTMENT | اصلاح مالی | requested -> approved -> posted | manager only | before, after, reason |
| DOCTOR_SHARE | سهم پزشک | calculated -> reviewed -> approved -> paid/adjusted | manager/owner | formula_id, doctor_id, lab_cost, deductions |
| LAB_COST | هزینه لاب | estimated -> confirmed -> posted -> corrected | manager/authorized | lab_id, item, patient, treatment |
| OWNER_NET | نمای مالک | calculated -> reviewed | owner only | revenue, lab, costs, doctor shares |

## Mina-specific formulas
- Mina Mazandarani: `(attributed production - attributed lab cost) / 2`
- Dr. Mehdi / Owner: owner view must separate doctor income from clinic-owner net.
- Other doctors: percentage, fixed wage, per-surgery, mixed, custom formula.

## Multi-doctor attribution rule
Every charge/treatment/stage must allow independent doctor attribution. Patient's primary doctor is not enough.

## Hard guards
- no client-side final share calculation
- no financial edit without audit
- no payment correction without manager approval
- no cheque/installment without lifecycle
- no lab cost mixing into wrong doctor formula
