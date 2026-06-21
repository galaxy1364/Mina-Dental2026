# MinaDent Security, Privacy & Threat Model V1.2

**Scope:** MinaDent شامل داده درمانی، مالی، هویتی، تصاویر، امضا/اثر انگشت، پیامک و workflowهای حساس است؛ بنابراین security-by-design اجباری است.

## 1) Security Baselines
- OWASP MASVS برای موبایل.
- NIST SSDF برای توسعه امن.
- OWASP Top 10 LLM برای AI assistant.
- MCP Security Best Practices برای connectorها.
- Supabase RLS برای data isolation در exposed schema.

## 2) Data Classes
| Class | Examples | Protection |
|---|---|---|
| Identity | نام، موبایل، کد ملی | encryption/storage guard, RBAC |
| Medical | چارت، درمان، تصویر، رضایت | strict RBAC, audit, backup |
| Financial | بدهی، پرداخت، چک، سهم پزشک | manager-gated, no doctor free access |
| Credential | env, token, SMS key | no commit, no chat, no client secrets |
| AI Context | prompt, tool result, patient summary | minimal, redacted, logged |

## 3) Threats
- دسترسی اشتباه منشی/پزشک به مالی.
- افشای secret در repo یا chat.
- ذخیره service role در client.
- connector/MCP prompt injection یا tool poisoning.
- sync conflict و data overwrite.
- lost/stolen device with local DB.
- insecure backup/restore.
- فایل export/print بدون کنترل.
- AI hallucination در تصمیم درمانی/مالی.

## 4) Mandatory Controls
- Least privilege.
- Manager confirmation for sensitive actions.
- Audit old_value/new_value.
- Soft delete by default.
- RLS enabled for every exposed table.
- Secret scan in gates.
- No destructive operation without explicit owner approval.
- AI suggestions must be labeled as suggestions unless verified by authorized user.

## 5) AI Safety Rule
AI در MinaDent نمی‌تواند تشخیص قطعی، درمان قطعی، تصمیم مالی حساس یا حذف/ارسال/پرداخت/تغییر سطح دسترسی را بدون تأیید انسانی انجام دهد.
