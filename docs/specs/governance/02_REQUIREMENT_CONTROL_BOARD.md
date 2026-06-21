# Requirement Control Board — ماتریس کنترل نیازمندی‌ها

وضعیت: سند زنده و اجباری  
قانون: هر قابلیت باید ID داشته باشد. هیچ قابلیت بدون ID ساخته نمی‌شود.

---

## قالب ثبت نیازمندی

| ID | عنوان | توضیح | فاز | وضعیت | وابستگی | Evidence | Blocker | آخرین آپدیت |
|---|---|---|---|---|---|---|---|---|

وضعیت‌های مجاز:

- NOT_STARTED
- PLANNED
- SOURCE_GATED
- LOCAL_GATES_PASS
- RUNTIME_VERIFIED
- PARTIAL
- BLOCKED
- STOP_BLOCKER
- DEPRECATED

---

## CORE

| ID | عنوان | توضیح | فاز | وضعیت | وابستگی | Evidence | Blocker | آخرین آپدیت |
|---|---|---|---|---|---|---|---|---|
| CORE-001 | App Identity Guard | نام، slug، package، owner، projectId باید قبل از build بررسی شود | 1 | PLANNED | project init | none | none | 2026-06-21 |
| CORE-002 | Persian RTL Root | RTL کامل در root، typography فارسی، writing direction | 1 | PLANNED | design tokens | none | none | 2026-06-21 |
| CORE-003 | Route Contract | مسیرهای ثابت و قابل audit | 1 | PLANNED | app shell | none | none | 2026-06-21 |
| CORE-004 | Error/Loading/Empty States | states استاندارد در همه صفحات | 1 | PLANNED | design system | none | none | 2026-06-21 |
| CORE-005 | Evidence Gate | هیچ Done بدون evidence | 0 | SOURCE_GATED | constitution | this pack | none | 2026-06-21 |

## DASHBOARD

| ID | عنوان | توضیح | فاز | وضعیت | وابستگی | Evidence | Blocker | آخرین آپدیت |
|---|---|---|---|---|---|---|---|---|
| DSH-001 | Live Command Center | داشبورد زنده با KPIها و هشدارها | 3 | PLANNED | sync/domain | none | none | 2026-06-21 |
| DSH-002 | Clickable Cards | هر کارت به صفحه/فیلتر واقعی وصل شود | 3 | PLANNED | route contract | none | none | 2026-06-21 |
| DSH-003 | Patient Journey Cards | کارت خط روند بیمار | 4 | PLANNED | workflow engine | none | none | 2026-06-21 |
| DSH-004 | Sync/Backup Health | نمایش سلامت sync/backup | 3 | PLANNED | sync/backup | none | none | 2026-06-21 |

## PATIENT

| ID | عنوان | توضیح | فاز | وضعیت | وابستگی | Evidence | Blocker | آخرین آپدیت |
|---|---|---|---|---|---|---|---|---|
| PAT-001 | Patient Master | مدل پرونده بیمار | 2 | PLANNED | data contract | none | none | 2026-06-21 |
| PAT-002 | Auto File Number | شماره پرونده خودکار و قابل کنترل | 2 | PLANNED | policy decision | none | FILE_NUMBER_POLICY_PENDING | 2026-06-21 |
| PAT-003 | Duplicate Detection | شماره پرونده/کد ملی/mob زنده قبل از ثبت | 3 | PLANNED | patient repository | none | none | 2026-06-21 |
| PAT-004 | Quick Patient From Call | ثبت سریع بیمار از تماس | 3 | PLANNED | scheduling | none | NEW_PATIENT_POLICY_PENDING | 2026-06-21 |
| PAT-005 | Patient Timeline | timeline کامل یا درمانی | 4 | PLANNED | workflow | none | TIMELINE_SCOPE_PENDING | 2026-06-21 |
| PAT-006 | Archive/Unarchive | آرشیو پرونده با حفظ audit | 3 | PLANNED | patient status | none | none | 2026-06-21 |

## SCHEDULING

| ID | عنوان | توضیح | فاز | وضعیت | وابستگی | Evidence | Blocker | آخرین آپدیت |
|---|---|---|---|---|---|---|---|---|
| SCH-001 | Smart Appointment Engine | ثبت نوبت هوشمند از تماس | 3 | PLANNED | patient search | none | none | 2026-06-21 |
| SCH-002 | Doctor/Unit Required | پزشک و یونیت اجباری | 2 | PLANNED | doctor/unit domain | none | none | 2026-06-21 |
| SCH-003 | Time Slot Engine | گام‌های 5/10/15/20/30/45/Custom | 3 | PLANNED | calendar | none | none | 2026-06-21 |
| SCH-004 | Conflict Check | تضاد پزشک/یونیت/زمان | 3 | PLANNED | appointment repository | none | none | 2026-06-21 |
| SCH-005 | Jalali Calendar | شمسی، جمعه/تعطیل قرمز، day/week/month/year | 3 | PLANNED | calendar lib decision | none | none | 2026-06-21 |
| SCH-006 | Status Lifecycle | آمد/نیامد/لغو/انجام شد/جابجا | 4 | PLANNED | workflow | none | none | 2026-06-21 |
| SCH-007 | Follow-up/Recall | پیگیری و یادآوری بعدی | 4 | PLANNED | notification | none | none | 2026-06-21 |

## FINANCE

| ID | عنوان | توضیح | فاز | وضعیت | وابستگی | Evidence | Blocker | آخرین آپدیت |
|---|---|---|---|---|---|---|---|---|
| FIN-001 | Finance Ledger | دفتر مالی append-only/audit-ready | 5 | PLANNED | data contract | none | none | 2026-06-21 |
| FIN-002 | Payments | نقد/POS/کارت/انتقال | 5 | PLANNED | ledger | none | none | 2026-06-21 |
| FIN-003 | Installments | اقساط و سررسید | 5 | PLANNED | notification | none | none | 2026-06-21 |
| FIN-004 | Cheques | چک، پاس/برگشت، هشدار | 5 | PLANNED | notification | none | none | 2026-06-21 |
| FIN-005 | Doctor Share | سهم پزشک با rule قابل تنظیم | 5 | PLANNED | treatment/lab | none | none | 2026-06-21 |

## LAB / INVENTORY / CRM / AI

| ID | عنوان | توضیح | فاز | وضعیت | وابستگی | Evidence | Blocker | آخرین آپدیت |
|---|---|---|---|---|---|---|---|---|
| LAB-001 | Lab Orders | ارسال/دریافت/تحویل لابراتوار | 5 | PLANNED | treatment | none | none | 2026-06-21 |
| INV-001 | Inventory Core | موجودی و هشدار کمبود | 5 | PLANNED | data contract | none | none | 2026-06-21 |
| CRM-001 | SMS/WhatsApp | پیامک و واتساپ | 6 | PLANNED | connector policy | none | PROVIDER_DECISION_PENDING | 2026-06-21 |
| AI-001 | Persian AI Assistant | فرمان فارسی permission/audit-aware | 7 | PLANNED | data+rbac+audit | none | AI_NOT_BEFORE_CORE | 2026-06-21 |
| MCP-001 | MCP/Connector Policy | اتصال ابزارها فقط با allowlist | 7 | SOURCE_GATED | policy file | this pack | none | 2026-06-21 |

---

## Pending Decisions

| ID | سؤال | گزینه‌ها | وضعیت |
|---|---|---|---|
| DEC-001 | ثبت بیمار جدید از تماس | A: ثبت سریع حداقلی / B: پرونده کامل همان لحظه | PENDING |
| DEC-002 | شماره پرونده | A: global automatic / B: per-doctor | PENDING |
| DEC-003 | timeline بیمار | A: فقط درمان / B: همه فعالیت‌ها | PENDING |
| DEC-004 | provider پیامک | کاوه‌نگار/ملی‌پیامک/دیگر | PENDING |
| DEC-005 | Web Admin scope | فقط مدیریت یا full app | PENDING |
