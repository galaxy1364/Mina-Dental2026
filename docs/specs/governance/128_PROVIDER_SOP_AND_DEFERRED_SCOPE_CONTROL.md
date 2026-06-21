# 128 — Provider SOP and Deferred Scope Control
Version: V1.8
Status: LOCKED

## هدف
V16 provider matrix را دقیق‌تر کرد. MinaDent نباید SMS/OTP/Payment/Storage/Backup/Push را با placeholder یا mock production بسازد.

## Provider statuses
- PROVIDER_REQUIRED
- SOURCE_AUDIT_REQUIRED
- DEFERRED
- READY_FOR_SANDBOX
- READY_FOR_PRODUCTION_AFTER_CONTRACT
- REJECTED_UNVERIFIED

## Provider gate
| Provider | Required before real implementation |
|---|---|
| SMS | API docs, sender line, cost, delivery webhook, retry, opt-out, template approval |
| OTP | provider docs, rate limit, resend rule, brute force protection, lockout |
| Push | device token lifecycle, permission UX, retry, privacy |
| Storage | signed URL/RLS/encryption/backup/retention |
| Backup | schedule, retention, checksum, restore drill |
| Payment | PSP contract, callback verification, idempotency, reconciliation, receipt |
| WhatsApp/Telegram/Bale/Eitaa | official API/provider terms, consent, delivery state |

## Deferred scope
این‌ها بدون مالک/قرارداد/API رسمی/تست واقعی اجرا نمی‌شوند:
- دفتر معین حسابداری کامل
- حضور و غیاب اثرانگشتی پرسنل
- درگاه پرداخت آنلاین production
- اتصال مستقیم WhatsApp/Telegram رسمی
- AI image diagnosis بالینی
- اتصال سخت‌افزاری RVG/OPG بدون SDK رسمی

## STOP codes
- STOP_BLOCKER_PROVIDER_NOT_SELECTED
- STOP_BLOCKER_PROVIDER_DOCS_MISSING
- STOP_BLOCKER_FAKE_PROVIDER
- STOP_BLOCKER_PAYMENT_IDEMPOTENCY_MISSING
- STOP_BLOCKER_MESSAGE_CONSENT_MISSING
