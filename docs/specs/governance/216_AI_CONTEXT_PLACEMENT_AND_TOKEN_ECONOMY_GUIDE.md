# MinaDent V1.16 — AI Context Placement & Token Economy Guide

**Purpose:** مشخص کردن اینکه کدام اطلاعات در Custom Instructions، کدام در فایل‌ها، و کدام در prompt مرحله‌ای قرار بگیرد تا AI هم مسیر را گم نکند و هم توکن بی‌خودی مصرف نشود.

---

## 1. Custom Instructions / Project Instructions

فقط قوانین کوتاه و همیشه‌فعال اینجا قرار بگیرد:

- MinaDent is Persian-first dental clinic OS.
- No fake/demo/mock/dead action.
- No phase skipping.
- Evidence-first.
- Read latest STATUS/RESUME before work.
- Use latest governance ZIP as source of truth.
- Replit/Executor has zero architecture authority.
- Ask exact blocker question when critical data missing.
- Every phase must update STATUS/RESUME/evidence/manifest.

این بخش نباید پر از متن 100 صفحه‌ای شود.

---

## 2. Knowledge / Files

این‌ها باید در فایل‌ها بمانند:

- Governance ZIP
- All-in-One TXT
- Master vision
- Forbidden registry
- Module specs
- Roadmap
- Design system contract
- Security/RBAC/audit
- Dashboard/calendar/patient/finance specs
- Research queue
- Patch reports

---

## 3. Per-Batch Prompt

هر بار فقط یک prompt کوتاه و دقیق:

```text
PHASE:
BATCH_ID:
READ THESE FILES:
SCOPE:
ALLOWED FILES:
FORBIDDEN FILES:
COMMANDS ALLOWED:
COMMANDS FORBIDDEN:
TESTS REQUIRED:
EVIDENCE REQUIRED:
STOP CONDITIONS:
OUTPUT FORMAT:
```

---

## 4. Evidence Folder

هر اجرا باید evidence جدا داشته باشد:

- raw terminal output
- screenshots/videos
- changed files list
- hash/manifest
- test results
- known limits
- resume point

---

## 5. قانون مصرف توکن

AI نباید هر بار کل ZIP را بازخوانی کند، مگر audit کامل باشد. برای هر فاز فقط این‌ها لازم‌اند:

1. STATUS
2. RESUME
3. forbidden registry
4. phase header template
5. module spec مرتبط
6. phase gate مرتبط
7. latest patch report

اگر ambiguity باقی ماند، بعداً فایل‌های بیشتر باز شود.
