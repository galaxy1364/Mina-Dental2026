# 79 — Governance ZIP Update Protocol

**Version:** V1.4.1  
**Status:** LOCKED  
**Purpose:** Ensure chat decisions never become the only source of truth.

## Rule
Every important MinaDent decision, audit result, requirement, blocker, constraint, or phase change must be integrated into the governance ZIP and delivered as a new version.

Chat is not the source of truth. The ZIP + project files are the source of truth.

## Required Update Contents
Every governance ZIP update must include:
```text
1. New or updated Markdown files.
2. STATUS.md updated.
3. RESUME_STATE.md updated.
4. PROJECT_FILE_INDEX.md updated.
5. README_START_HERE.md updated if the start path changes.
6. SHA256_MANIFEST_<VERSION>.txt generated.
7. All-in-One TXT generated.
8. ZIP filename includes version and date.
9. Final response includes download links and SHA256.
```

## Versioning
```text
Major governance expansion: V1.5, V1.6...
Small blocker/constraint patch: V1.4.1, V1.4.2...
Implementation batches: separate batch ID, not merged silently.
```

## What Must Trigger a ZIP Update
```text
New runtime constraint
New source-of-truth rule
New clinic fact
New blocker
New accepted/rejected legacy requirement
New Replit execution protocol
New SDK/package/schema decision
New design system decision
New security/privacy rule
New phase/resume change
```

## What Does Not Require ZIP Update
```text
Casual explanation
Temporary wording
Unverified idea
Rejected suggestion with no project impact
```

## Output Contract for ChatGPT
When a ZIP update is required, ChatGPT must provide:
```text
UPDATED_VERSION:
FILES_ADDED:
FILES_UPDATED:
STATUS:
RESUME_POINT:
ZIP_LINK:
ALL_IN_ONE_LINK:
SHA256:
FORBIDDEN_NEXT_ACTIONS:
NEXT_ALLOWED_STEP:
```

## STOP_BLOCKER
If ChatGPT cannot update the ZIP for a project-impacting decision, it must say:
```text
STOP_BLOCKER_ZIP_UPDATE_REQUIRED
```

and must not pretend the decision is locked.
