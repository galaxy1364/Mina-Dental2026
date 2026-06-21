# MinaDent Research Baseline & Competitive Benchmark V1.2

**Purpose:** MinaDent نباید فقط بر اساس ذهن مالک یا ChatGPT ساخته شود. هر ماژول باید با استانداردهای معتبر و نمونه‌های بازار مقایسه شود، اما بدون کپی برند/کد/لوگو.

## 1) Research Sources Snapshot
- OWASP MASVS: mobile app security baseline.
- NIST SSDF: secure software development practice baseline.
- NIST AI RMF / GenAI profile: AI risk management baseline.
- HL7 FHIR Appointment/Slot: appointment/scheduling domain language reference.
- ISO 9241-210: human-centered design principles.
- Supabase RLS docs: row-level security and exposed schema rules.
- Expo EAS docs: build/update profiles and release mechanics.
- React Native list performance docs: virtualized lists and responsiveness.
- Dental PMS market references: Dentrix, CareStack, Curve Dental, Dentrix Ascend, Open Dental patterns.
- Iranian dental software references: Labkhand, existing MinaDent, Bastani Teb, Wedent patterns.

## 2) Competitive Capability Baseline
MinaDent must include at minimum:
```text
scheduling
patient records
dental charting
treatment planning
billing/collections
insurance/tariff readiness
patient engagement
reminders
analytics/reporting
imaging/file hooks
lab workflow
inventory
multi-provider/unit
online booking
mobile access
AI-assisted workflows
```

## 3) MinaDent Differentiators
MinaDent باید یک سر و گردن بالاتر باشد با:
```text
Patient Journey Engine عملیاتی
AI Assistant با action governance
Persian-first RTL design
offline-first local DB
200k+ scale budget
manager control center
deep RBAC/audit
financial workflows ایران‌محور: قسط، چک، سهم پزشک
lab/implant lifecycle کامل
call-to-appointment <10s workflow
no dead actions/no fake data
```

## 4) Research Intake Rule
هر فایل/مطلب جدید کاربر باید به RTM، Module Registry، Screen Contracts یا Decision Log route شود. اگر مفید باشد، V1.3/Vnext ساخته می‌شود؛ اگر تکراری باشد، merge/supersede می‌شود.
