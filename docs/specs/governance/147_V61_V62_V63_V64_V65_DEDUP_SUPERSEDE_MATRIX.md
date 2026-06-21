# MinaDent Zero Rebuild — V1.10 Batch3 Legacy/Handoff Audit Merge

**Status:** `PHASE_0M_BATCH3_LEGACY_HANDOFF_AUDIT_MERGED`  
**Created:** 2026-06-21  
**Mode:** Governance-only / Read-only audit / No code / No schema / No build / No connector  
**Purpose:** تبدیل batch سوم فایل‌های legacy و handoff به اسناد اجرایی امن، حذف تکرارها، قرنطینه مسیرهای قدیمی، و حفظ نکات مفید بدون کپی مستقیم.

**Non-negotiable:** این فایل‌ها source material هستند، نه دستور اجرا. در صورت تضاد با Zero Rebuild V1.10، سختگیرانه‌ترین قانون و وضعیت جدید Zero Rebuild مقدم است.

## Deduplication and Supersede Matrix

| Legacy source group | Duplicate with current pack? | Useful unique value | V1.10 action |
|---|---:|---|---|
| v61/v62/v63/v64/v65 core contracts | High | Module template, strict phase gates, old core module ordering, OTA policy | Deduped; imported only stricter clauses |
| v65 Smart Atomic | High | Atomic executor framing and exact report format | Rewritten into V1.10 executor prompt |
| v57 runtime evidence | Medium | Clear distinction between build success, runtime boot, and login blocker | Imported as legacy evidence standard, not current proof |
| 2026-05-07 handoff | Medium | Golden Baseline Overlay, no paid build guessing, RTL Android proof hierarchy | Imported as anti-regression rules |
| 2026-05-01 handoff | High | Phase 1 gate matrix and no-guess principles | Already covered; kept only as traceability |
| v53/v52 DOCX | High | Zero-ambiguity, 45 forbidden behaviors, clinic master data pattern | Deduped; only strict clauses referenced |
| Replit executor lock | Medium | Read-only contract adoption packet format | Rewritten for V1.10 Zero Rebuild |

## Conflict handling

### Conflict A — Old project paths vs Zero Rebuild
Old files lock paths like `C:\Users\MOSTAFA.ARAD\Desktop\MinaDent-Contract\artifacts\minadent-app`. These are now legacy evidence paths only. Zero Rebuild must not assume those folders are current.

**Decision:** `LEGACY_PATH_REFERENCE_ONLY`.

### Conflict B — Expo SDK 51/old EAS baseline vs current Expo Go 54 constraint
Old contracts mention Expo SDK 51 and old APK/build baseline. V1.4.1+ already locks Expo Go 54 compatibility as current runtime constraint.

**Decision:** `SDK54_CURRENT_RUNTIME_CONSTRAINT_WINS`.

### Conflict C — Auth/Login blocker from old project vs Zero Rebuild status
Old handoff says current blocker is Auth/Login credential issue. That is true for old project state only. Zero Rebuild is governance-only and code not started.

**Decision:** `OLD_BLOCKER_IMPORTED_AS_LEGACY_EVIDENCE_AND_RISK_PATTERN_ONLY`.

### Conflict D — Patient Master old progress vs Zero Rebuild clean rebuild
Old handoff reports partial Patient Master progress. Zero Rebuild must not claim that progress unless code/evidence is re-imported and verified under current repo.

**Decision:** `NO_PROGRESS_CARRYOVER_WITHOUT_CURRENT_REPO_EVIDENCE`.
