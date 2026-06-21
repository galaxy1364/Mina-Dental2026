# Change Control & Update Protocol — پروتکل آپدیت بدون خرابکاری

وضعیت: اجباری  
هدف: هر چیزی که بعداً گفته می‌شود، درست merge شود و فایل‌ها خراب نشوند.

---

## 1. قانون تغییر

هیچ تغییر جدیدی مستقیم وارد کد نمی‌شود. اول وارد این مسیر می‌شود:

1. دریافت درخواست
2. تشخیص اینکه requirement جدید است یا اصلاح requirement قبلی
3. تعیین ID
4. بررسی conflict با قوانین
5. تعیین فاز
6. تعیین dependencies
7. تعیین blocker
8. آپدیت Requirement Control Board
9. آپدیت Blueprint/Architecture/Design/Data/Security در صورت نیاز
10. تعریف execution packet
11. اجرا
12. evidence
13. update STATUS/RESUME

## 2. قالب Amendment

هر آپدیت باید این قالب را داشته باشد:

```text
AMENDMENT-ID:
Date:
Source:
Related Requirement ID:
Change Type: ADD / MODIFY / DEPRECATE / CLARIFY
Reason:
Affected Files:
Affected Modules:
Risks:
Required Evidence:
Decision:
Status:
```

## 3. قانون عدم حذف

اگر قابلیت قبلی با قابلیت جدید conflict داشت:

- حذف مستقیم ممنوع
- اول conflict ثبت می‌شود
- بعد تصمیم owner
- بعد deprecate/replace با evidence
- بعد migration/compatibility path

## 4. Update Matrix

هر نوع تغییر باید کدام فایل را آپدیت کند:

| نوع تغییر | فایل‌های لازم |
|---|---|
| قابلیت جدید | Requirement Board, Blueprint, STATUS, RESUME |
| قانون جدید | Constitution, STATUS, RESUME |
| طراحی جدید | Design System, Requirement Board |
| data/schema | Data Contract, Requirement Board, Evidence |
| security/role | Security Contract, Permission Matrix |
| connector/MCP | Connector Policy, Evidence |
| runtime pass | Evidence Ledger, STATUS, RESUME |
| blocker | STATUS, RESUME, Requirement Board |

## 5. Versioning

نسخه‌ها:

- Major: تغییر معماری بزرگ
- Minor: اضافه شدن ماژول/فاز
- Patch: اصلاح متن/clarification
- Evidence revision: اضافه شدن evidence بدون تغییر scope

## 6. ممنوعیت Update

- اضافه‌کردن requirement بدون ID
- تغییر وضعیت بدون evidence
- پاک‌کردن blocker بدون دلیل
- اعلام PASS بدون تست
- merge کردن فایل قدیمی روی جدید بدون diff
- کپی‌کردن سند از پروژه دیگر بدون تطبیق
- overwrite کردن Constitution بدون version note

## 7. Resume Rule

هر پاسخ اجرایی باید این را داشته باشد:

- وضعیت واقعی
- کارهای انجام شده
- کارهای تاییدنشده
- ممنوعیت فعلی
- blockerها
- قدم بعدی
- resume point

## 8. مثال وضعیت

```text
STATUS: PHASE_0B_INPUT_PACKAGE_AUDIT_PENDING
VERIFIED: Governance pack created
NOT_VERIFIED: No project source, no runtime, no build
FORBIDDEN_NOW: coding/build/schema/connector
NEXT: collect and merge input docs into Requirement Control Board
RESUME_POINT: PHASE_0B_INPUT_PACKAGE_AUDIT
```
