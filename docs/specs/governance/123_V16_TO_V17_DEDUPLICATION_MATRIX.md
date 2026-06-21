# 123 — V16 to V1.7 Deduplication Matrix
Version: V1.8
Status: CANONICAL_DEDUP_LOCK

## اصل ضدتکرار
هیچ requirement، phase، roadmap، prompt یا matrix مشابه نباید با نام متفاوت دوباره ساخته شود. هر مفهوم جدید باید یکی از این حکم‌ها را بگیرد:

- ACCEPT_AS_NEW
- MERGE_INTO_EXISTING
- REWRITE_AND_REPLACE
- SUPERSEDE_OLD
- DEFER
- REJECT_DUPLICATE
- REJECT_UNSAFE

## ماتریس dedup
| V16 Concept | Existing V1.7 Location | Decision | Canonical Location After V1.8 |
|---|---|---|---|
| Source Reality Audit first | 16, 38, 58, 74 | MERGE_INTO_EXISTING | 127 + updated 16/58/74 |
| Not a build permit | 17, 32, 41, 80 | MERGE_INTO_EXISTING | 122 + STATUS |
| Definition of Ready | 23 | ENHANCE | 126 + updated 23 |
| Definition of Done | 23, 80, 89 | ENHANCE | 126 + updated 23 |
| Requirement ID | 21 | ENFORCE_STRONGER | 125 + updated 21 |
| Phase transition gate | 18, 85 | MERGE_AS_MAPPING | 124 + updated 18/85 |
| Prompt Pack | 31, 73, 92 | MERGE | 132 + updated 31/73 |
| Scope/Deferred | 65, 108 | MERGE | 128 + updated 65/108 |
| Permission Matrix | 06, 25, 112 | MERGE | 129 + RBAC refs |
| Financial Ledger Contract | 56, 113 | MERGE | 129 |
| Provider SOP Matrix | 104 | MERGE | 128 + 104 |
| Performance Budget | 27 | ENHANCE | 130 + updated 27 |
| Test Matrix | 26, 89 | ENHANCE | 130 + updated 26/89 |
| Phase 0 Output | 16, 74 | ACCEPT_AS_NEW_DETAIL | 127 |

## تکراری‌هایی که ساخته نشدند
- no new global roadmap replacing 18.
- no second master product blueprint.
- no second RBAC contract.
- no second finance engine document.
- no second test strategy.
- no second design system.
- no duplicate Replit prompt library.

## قانون merge
اگر فایل جدیدی با مفهوم مشابه بیاید:
1. اول در این matrix جستجو شود.
2. اگر مشابه بود، update/cross-reference انجام شود.
3. اگر واقعاً جدید بود، فایل مستقل ساخته شود.
4. اگر unsafe بود، Risky Code Denylist یا Deferred Backlog شود.
