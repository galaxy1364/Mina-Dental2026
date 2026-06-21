---
project: MinaDent Zero Rebuild
version: V1.3
date: 2026-06-21
status: GOVERNANCE_HARDENING_NO_CODE
language: fa-IR
rule: Evidence-first, real-code-only after approval, no demo/mock/guess/patch
---

# 40 — Deep Research to Requirement Pipeline

هدف: MinaDent فقط از ذهن کاربر یا خروجی AI ساخته نشود؛ هر ماژول باید با تحقیق معتبر، استانداردهای جهانی و نیاز ایران تطبیق شود.

## منابع مجاز برای تحقیق

- استانداردهای رسمی: OWASP MASVS، NIST SSDF، W3C WCAG، HL7 FHIR، IHE Scheduling
- مستندات رسمی تکنولوژی: Expo/EAS، React Native، Supabase، PostgreSQL
- تحلیل رقبا: نرم‌افزارهای دندانپزشکی جهانی و ایرانی، فقط به‌عنوان benchmark نه کپی
- فایل‌ها و نیازمندی‌های کاربر، پس از read-only audit
- تجربه واقعی کلینیک، فقط پس از ثبت در Requirement Matrix

## مراحل تبدیل تحقیق به requirement

```text
Research Finding
→ Practical Relevance for Iranian Dental Clinic
→ Requirement ID
→ Module Mapping
→ Data Contract
→ Screen Contract
→ RBAC/Audit Impact
→ Offline/Sync Impact
→ Acceptance Test
→ Evidence Requirement
→ Phase Assignment
```

## قانون عدم کپی

کپی برند، لوگو، UI یا flow اختصاصی رقبا ممنوع است. الهام از کیفیت و الگوهای عمومی مجاز است، اما MinaDent باید identity مستقل داشته باشد.

## فیلتر کاربردی ایران

هر قابلیت جهانی باید با این معیارها فیلتر شود:

```text
آیا در کلینیک ایرانی کاربرد دارد؟
آیا با تقویم جلالی سازگار است؟
آیا با پیامک/واتساپ/تلفن ایران سازگار است؟
آیا با نقش مدیر/منشی/پزشک/دستیار سازگار است؟
آیا offline-first قابل اجراست؟
آیا هزینه و پیچیدگی آن برای مرحله فعلی منطقی است؟
```

## قانون توقف مشترک
اگر هر بخش این سند با evidence قابل اثبات نشد، خروجی مجاز فقط این است:

```text
STOP_BLOCKER
NO_CODE
NO_BUILD
NO_SCHEMA
NO_CONNECTOR
NO_PATCH
```
