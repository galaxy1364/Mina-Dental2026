# AI Executor Protocol — پروتکل اجرای AI / Replit / Codex / Claude / v0

وضعیت: اجباری  
هدف: هر AI فقط طبق batch، evidence و rule کار کند.

---

## 1. نقش‌ها

### ChatGPT
- Architect
- QA
- Requirement manager
- Code planner
- Evidence reviewer
- Packet writer

### Replit
- Executor محدود
- فقط طبق packet
- بدون تصمیم معماری مستقل
- خروجی با ZIP/manifest/evidence

### v0/Vercel
- UI prototype یا web component
- نه source of truth
- نه جایگزین data/sync/security

### Codex/Claude
- کمک در کدنویسی/audit
- فقط تحت Constitution و batch

## 2. قالب هر Execution Packet

هر packet باید شامل باشد:

1. عنوان batch
2. هدف
3. resume point
4. فایل‌های مجاز
5. فایل‌های ممنوع
6. کارهای مجاز
7. کارهای ممنوع
8. requirements ID
9. دستور اجرا
10. تست‌ها
11. evidence مورد نیاز
12. stop conditions
13. acceptance criteria
14. output format
15. ZIP requirements
16. governance updates

## 3. Header اجباری برای هر Executor

Executor باید قبل از اجرا اعلام کند:

- فایل‌های governance را خوانده
- مسیر پروژه را verified کرده
- scope batch را فهمیده
- forbidden files را می‌داند
- build/schema/package/native/dependency تغییر نمی‌دهد مگر مجاز
- بدون evidence ادعا نمی‌کند
- اگر blocker دید STOP می‌کند

## 4. ZIP Requirements

اگر source/docs/config/evidence تغییر کرد:

- overlay ZIP لازم است
- فقط فایل‌های تغییرکرده همان batch
- مسیر نسبی از project root
- MANIFEST
- SHA256 هر فایل
- SHA256 کل ZIP
- line count
- forbidden files check
- PowerShell extract command
- status report

اگر ZIP نیست:

`INVALID_OUTPUT_NEEDS_OVERLAY_ZIP`

## 5. Gates

حداقل gates برای source:

- TypeScript 0 errors
- Lint 0 blocking errors
- Expo doctor / environment doctor
- Secret scan
- Governance file update
- Requirement status update
- Evidence file
- Build فقط با اجازه

## 6. Runtime Evidence

ادعای runtime فقط با:

- دستگاه/پلتفرم مشخص
- build/version مشخص
- route مشخص
- screenshot/video
- رفتار قابل مشاهده
- data path
- known limits

## 7. ممنوعیت‌های Executor

Executor حق ندارد:

- پروژه را از مسیر اشتباه باز کند
- فایل خارج از allowed list تغییر دهد
- dependency اضافه کند
- schema تغییر دهد
- native/prebuild اجرا کند
- build بگیرد
- cache پاک کند
- data پاک کند
- workaround تصادفی بزند
- feature جدید اضافه کند
- UI جدا از design system بسازد
- status را PASS اعلام کند بدون evidence

## 8. خروجی استاندارد Executor

هر گزارش باید شامل باشد:

- STATUS
- SCOPE
- FILES_CHANGED
- FILES_CREATED
- FORBIDDEN_FILES_TOUCHED
- TESTS_RUN
- TEST_OUTPUT
- EVIDENCE
- REQUIREMENT_UPDATES
- KNOWN_LIMITS
- BLOCKERS
- ZIP_LINK
- SHA256
- NEXT_RESUME_POINT

## 9. Stop Blockers استاندارد

- `STOP_BLOCKER_WRONG_PROJECT`
- `STOP_BLOCKER_INPUT_PACKAGE_INCOMPLETE`
- `STOP_BLOCKER_EVIDENCE_REQUIRED`
- `STOP_BLOCKER_SCOPE_TOO_LARGE`
- `STOP_BLOCKER_FORBIDDEN_FILE_RISK`
- `STOP_BLOCKER_SCHEMA_CHANGE_NOT_APPROVED`
- `STOP_BLOCKER_DEPENDENCY_CHANGE_NOT_APPROVED`
- `STOP_BLOCKER_SECRET_RISK`
- `STOP_BLOCKER_PERMISSION_UNDEFINED`
- `STOP_BLOCKER_RUNTIME_NOT_VERIFIED`
