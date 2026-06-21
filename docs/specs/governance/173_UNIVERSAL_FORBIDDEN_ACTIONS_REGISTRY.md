# MinaDent Zero Rebuild — V1.12
## PHASE_0O_FORBIDDEN_RULES_AND_ALWAYS_ON_EXECUTION_CONTROL

Status: GOVERNANCE_ONLY / READ_ONLY_IMPORT / NO_CODE
Date: 2026-06-21
Rule: این فایل از batch جدید ورودی‌ها استخراج شده و هیچ کد legacy، هیچ schema، هیچ build، هیچ dependency و هیچ prompt خام را مستقیم اجرا نمی‌کند.


# 173 — Universal Forbidden Actions Registry

## Why this exists
این فایل از این به بعد باید در همه phaseها، همه Replit packetها، همه AI Builder promptها، همه code reviewها و همه handoffها فعال باشد. ممنوعیات نباید فقط یک سند آرشیوی باشند؛ باید **always-on execution guard** باشند.

## Enforcement Levels
- **ABSOLUTE_STOP**: انجام آن کار بلافاصله batch را INVALID می‌کند.
- **APPROVAL_REQUIRED**: فقط با approval مرحله‌ای و evidence مجاز است.
- **QUARANTINE_REQUIRED**: محتوا/کد/ایده باید جدا نگه داشته شود و مستقیم merge نشود.
- **EVIDENCE_REQUIRED**: بدون proof واقعی claim ممنوع است.

## A. Source of Truth ممنوعیات
ABSOLUTE_STOP:
1. اتکا به چت، حافظه، حدس، اسکرین‌شات ناقص یا narrative به‌عنوان source of truth.
2. اجرای تغییر قبل از read-only audit.
3. قاطی‌کردن MinaDent Zero Rebuild با مسیرهای legacy، old SDK، old EAS، old Replit state یا پروژه‌های قبلی.
4. اجرای prompt خام legacy که داخل آن جمله‌هایی مثل “execute now/build now” دارد.

## B. Build / Package / Native ممنوعیات
APPROVAL_REQUIRED or ABSOLUTE_STOP:
1. تغییر package.json / lockfile / .npmrc / app.json / eas.json / babel / metro / tsconfig / eslint بدون packet رسمی.
2. نصب dependency جدید بدون ADR، license/maintenance/Expo compatibility check، rollback و test plan.
3. استفاده از local Gradle، native patch، android/ios changes یا node_modules patch برای فرار از blocker.
4. build بی‌هدف یا build برای «ببینیم چه می‌شود».
5. انتخاب latest Expo SDK بدون بررسی Expo Go 54 constraint کاربر.

## C. Data / Schema / Sync ممنوعیات
ABSOLUTE_STOP:
1. schema change بدون migration، RLS، rollback، dry-run و evidence.
2. hard delete برای patient، appointment، treatment، payment، cheque، installment، lab، inventory، audit.
3. reset database / clear storage / uninstall برای حل bug بدون اجازه صریح.
4. نشان‌دادن SYNCED بدون remote confirmation.
5. حذف sync_queue یا pending row برای تمیز نشان دادن UI.
6. نبود idempotency key، conflict policy، retry/backoff، dead-letter و visible error در sync.

## D. Security ممنوعیات
ABSOLUTE_STOP:
1. service_role key در client/app/source.
2. ذخیره secret/token/password/PII در log یا source.
3. کنترل دسترسی فقط در UI بدون RLS/permission layer.
4. broken access control، endpoint بدون auth، mass assignment، insecure direct object reference.
5. client-side doctor share یا sensitive finance truth.
6. OTP/SMS/AI/payment بدون rate limit/audit/permission.

## E. UI/UX / Persian / RTL ممنوعیات
ABSOLUTE_STOP:
1. UI انگلیسی برای کاربر نهایی.
2. RTL ظاهری فقط با textAlign بدون root/semantic RTL.
3. labelهای چپ‌چین، form broken، dock/tab/chip LTR در UI فارسی.
4. Persian font بد، encoding خراب، اعداد/تاریخ/پول بی‌قاعده.
5. safe area/notch/dock collision.
6. دکمه، chip، card یا action مرده.
7. dashboard/notification/timeline/count fake.
8. screen طولانی و فرم خام وقتی workflow compact لازم است.

## F. Workflow / Domain ممنوعیات
ABSOLUTE_STOP:
1. ذخیره درمان فقط در notes.
2. ساخت کارت/خط روند بدون state machine، owner، due، next action، audit و sync.
3. ساخت task بدون owner/due/status/evidence.
4. تغییر state بدون transition rule.
5. ساخت finance summary بدون ledger/calculation trace.
6. ساخت AI assistant بدون preview/confirmation/audit/RBAC.

## G. Testing / Evidence ممنوعیات
ABSOLUTE_STOP:
1. استفاده از Done/Ready/OK/Working/Completed به جای status labels رسمی.
2. claim VERIFIED_REAL بدون terminal output/device screenshot/artifact.
3. نادیده‌گرفتن TypeScript/ESLint/secret scan failures.
4. خاموش کردن test/warning برای PASS نمایشی.
5. تحویل بدون STATUS/RESUME/manifest/SHA256/evidence.

## H. Design Reference ممنوعیات
QUARANTINE_REQUIRED:
1. کپی مستقیم HTML/CSS/brand/color/logo از نمونه‌ها.
2. تبدیل preview HTML به production WebView.
3. اجرای visual prototype بدون data/action contract.
4. اجرای animation سنگین قبل از performance budget.

## Required STOP_BLOCKER Format
```text
STOP_BLOCKER_CODE:
REASON:
RISK_LEVEL:
FILES_INVOLVED:
EVIDENCE_MISSING:
FORBIDDEN_RULE_TRIGGERED:
SAFE_NEXT_STEP:
OWNER_DECISION_REQUIRED:
```

## Mandatory Propagation
این فایل باید در تمام فایل‌های زیر reference شود:
- Phase packet
- Replit executor prompt
- batch output template
- PR checklist
- QA checklist
- release gate
- STATUS/RESUME update
