# MinaDent V1.16 — Phase 1 Foundation Start Packet Gate

**Purpose:** مشخص کردن اینکه اولین packet واقعی Replit بعد از audit دقیقاً چه باشد تا پروژه دوباره از مسیر خارج نشود.

---

## 1. قبل از Phase 1 code چه باید pass شود؟

- V1.16 ZIP placed and readable
- README/STATUS/RESUME read
- Forbidden registry read
- Always-repeat phase header read
- Source-of-truth hierarchy read
- Replit confirms no code/build/schema/package executed
- Current repo/path/SDK/runtime target reported
- Conflict list returned
- Owner approves Phase 1 packet

اگر هرکدام missing باشد:

```text
STOP_BLOCKER_PHASE1_NOT_AUTHORIZED
```

---

## 2. Scope پیشنهادی اولین packet کدنویسی واقعی

اولین code packet نباید Patient/Finance/Scheduling بسازد. باید فقط foundation را بسازد:

```text
App Shell
Design Token Registry
RTL/Persian Root
Safe Area
Navigation Shell
Bottom Dock Skeleton
Top Command Placeholder with real route hook
Reusable State Views
Config Loader Shell
SQLite Bootstrap Shell
Sync Queue Table Shell
Audit Log Table Shell
Status/Diagnostics Screen
No fake data
No business module
```

---

## 3. خروجی قابل مشاهده روی گوشی

کاربر باید ببیند:

- صفحه اصلی فارسی و RTL
- داک پایین ثابت/اسکرول‌پذیر طبق قرارداد
- top command/search
- smart chips
- state cards صادقانه: آماده اتصال / not connected yet
- هیچ آمار fake
- هیچ دکمه مرده
- اگر داده واقعی نیست، متن صادقانه «آماده اتصال»

---

## 4. تست‌های اجباری اولین packet

- TypeScript pass
- ESLint pass
- secret scan clean
- Expo boot / preview path confirmed
- Android phone screenshot/video
- route/back/dock no crash
- RTL visual pass
- no English visible label
- no fake success message
- no package/native/config change unless explicitly approved

---

## 5. مرز ممنوع در اولین packet

ممنوع:

- Supabase production connection
- real SMS/payment
- patient CRUD
- finance engine
- appointment booking logic
- schema heavy migration
- AI real action
- HTML/WebView import
- design asset copying
- replacing entire project
- uncontrolled dependency install

---

## 6. Resume بعد از PASS

اگر اولین packet واقعاً pass شد:

```text
PHASE1_FOUNDATION_SHELL_RUNTIME_PASS_PENDING_AUTH_SQLITE_SYNC_PACKET
```

اگر فقط source pass شد ولی گوشی تست نشد:

```text
IMPLEMENTED_NOT_VERIFIED_PENDING_PHONE_RUNTIME
```
