# MinaDent Legal / Consent / Print / Export Contract V1.2

**Important:** این سند جای مشاوره حقوقی و مقررات رسمی ایران نیست؛ اما برای طراحی نرم‌افزار، حداقل‌های evidence و audit را قفل می‌کند.

## 1) Consent Data Contract
```text
consent_id
clinic_id
patient_id
treatment_id_optional
form_version
title
body
signer_name
signer_relation
signature_image_hash
fingerprint_capture_hash_optional
signer_photo_hash_optional
created_by
created_at
device_id
ip_optional
status: draft|signed|revoked|superseded
revocation_reason
```

## 2) Rules
- متن رضایت‌نامه versioned است؛ تغییر متن قدیمی مجاز نیست، نسخه جدید ساخته می‌شود.
- امضا/اثر انگشت/عکس به patient/treatment/actor/time وصل می‌شود.
- چاپ/PDF باید شماره نسخه، زمان، مسئول ثبت، نام کلینیک و patient file number داشته باشد.
- تغییر/ابطال consent فقط با audit و reason مجاز است.
- Export patient file نیازمند role و audit است.

## 3) Print/Export Controls
```text
who_exported
what_exported
why_exported
recipient_optional
watermark_optional
file_hash
created_at
```

## 4) Forbidden
- ادعای «صددرصد حقوقی» بدون بررسی حقوقی رسمی.
- تغییر بی‌ردپای فرم امضاشده.
- چاپ/ارسال فایل حساس بدون audit.
