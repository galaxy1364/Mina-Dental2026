# MinaDent V1.6 — Integration & Iran API Verification Backlog

## Purpose
Prevent guessed integrations. Iranian APIs and external services must be verified before implementation.

## Verification-required providers

### SMS
- Kavenegar
- Melipayamak
- Other Iranian SMS gateway
Required: official docs, pricing, test key, sender line rules, delivery callback.

### WhatsApp / messaging
- WhatsApp deep link initially.
- WhatsApp Business API future.
- Bale/Eitaa/Rubika future only after official API verification.

### Payments
- ZarinPal
- IDPay
- Pay.ir/PayPing/PayStar/NextPay if needed.
Required: official API docs, callback, idempotency, test sandbox, legal/clinic eligibility.

### Insurance / Salamat / SEPAS
- Must be official and verified.
- Mock code is forbidden in production.
- Placeholder APIs are backlog only.

### Push notifications
- Expo Notifications path if Expo-compatible.
- FCM/APNs path if development build.
- Permission UX and token storage required.

### Backup/cloud storage
- Supabase Storage.
- Optional external encrypted backup future.
- Restore drill required.

## Import rule
Every provider gets a row:
- Provider name
- Use case
- Official docs URL
- Credential owner
- Test environment
- Security notes
- Cost estimate
- Implementation phase
- Current status

## Status now
All integrations remain NOT_READY until verified.
