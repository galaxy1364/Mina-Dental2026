# MinaDent Pre-Action Thinking Protocol V1.2

**Purpose:** قبل از هر کار اجرایی، AI/Executor باید فکر کند، شواهد بخواند، scope را قفل کند و اگر شواهد کافی نیست STOP کند.

## Mandatory Pre-Action Checklist
هر پاسخ اجرایی، Replit batch، patch، build یا migration باید قبل از عمل این چک‌لیست را طی کند:

```text
1. آیا 00_MINADENT_CONSTITUTION.md خوانده شد؟
2. آیا STATUS.md و RESUME_STATE.md خوانده شد؟
3. آیا current phase مشخص است؟
4. آیا blocker باز وجود دارد؟
5. آیا requirement ID مشخص است؟
6. آیا allowed files و forbidden files مشخص است؟
7. آیا این کار package/native/schema/route/build را تغییر می‌دهد؟
8. آیا Data Contract مشخص است؟
9. آیا UI/Screen Contract مشخص است؟
10. آیا RBAC/Audit/Sync/Offline اثر دارد؟
11. آیا Security/Privacy impact مشخص است؟
12. آیا test plan و evidence plan مشخص است؟
13. آیا rollback plan مشخص است؟
14. آیا build لازم است یا local/source evidence کافی است؟
15. آیا خروجی باید overlay ZIP/manifest/hash داشته باشد؟
```

## Stop Rule
اگر یک مورد کلیدی نامشخص باشد:

```text
STOP_BLOCKER: PRE_ACTION_EVIDENCE_INSUFFICIENT
```

## ممنوعیت‌های Pre-Action
- «به نظر می‌رسد» مبنای patch نیست.
- «احتمالاً درست می‌شود» مبنای build نیست.
- «فقط UI را بزنیم بعداً وصل می‌کنیم» ممنوع است.
- «feature قشنگ ولی بدون domain» مردود است.
