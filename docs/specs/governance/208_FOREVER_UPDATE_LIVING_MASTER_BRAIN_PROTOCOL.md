# 208 — Forever Update Living Master Brain Protocol — V1.15

## Purpose
MinaDent must remain editable and extendable forever without losing source-of-truth clarity.

## What must update the Master Brain
Update the ZIP/source-of-truth when any of these happen:
- owner adds/changes a business rule;
- implementation changes project architecture;
- phase gate passes/fails;
- blocker appears/closes;
- provider/API choice changes;
- design system decision changes;
- schema/RLS/sync/backup/security decision changes;
- runtime evidence is collected;
- a legacy file is audited/imported/quarantined;
- release/build/rollback decision changes.

## Required update outputs
Every source-of-truth update must include:
- new version number;
- patch report;
- updated STATUS.md;
- updated RESUME_STATE.md;
- updated PROJECT_FILE_INDEX.md;
- SHA256 manifest;
- updated all-in-one file;
- downloadable ZIP.

## Versioning policy
- Small governance patch: V1.x+0.1.
- Major structural phase transition: V2.0, V3.0, etc.
- Code/evidence versions must reference batch IDs and git commits once repo exists.

## No chat-only rule
Chat can explain, but chat is not the final source of truth. Important decisions must enter the ZIP/project files.

## No hidden drift rule
If an AI response proposes something not in the pack, it must either:
1. mark it as proposal and ask owner approval; or
2. add it through a governed patch; or
3. reject it.
