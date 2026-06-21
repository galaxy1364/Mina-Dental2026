# MinaDent Zero Rebuild — V1.12
## PHASE_0O_FORBIDDEN_RULES_AND_ALWAYS_ON_EXECUTION_CONTROL

Status: GOVERNANCE_ONLY / READ_ONLY_IMPORT / NO_CODE
Date: 2026-06-21
Rule: این فایل از batch جدید ورودی‌ها استخراج شده و هیچ کد legacy، هیچ schema، هیچ build، هیچ dependency و هیچ prompt خام را مستقیم اجرا نمی‌کند.


# 172 — Batch5 Source Audit Ledger

## Purpose
این ledger نشان می‌دهد فایل‌های جدید فقط به‌صورت read-only بررسی شده‌اند. هیچ متن خامی مستقیماً source of truth نشده؛ فقط قواعد مفید، سختگیرانه‌تر و غیرتکراری به اسناد تخصصی V1.12 منتقل شده‌اند.

## Source Inventory
| # | Source | Audit Status | Bytes | SHA256 Prefix | Characters | Signal Counts |
|---|---|---:|---:|---|---:|---|
| 1 | MinaDent_Master_Build_Roadmap.md | READ | 43778 | `2031c2cde4f55c3a...` | 30236 | ممنوع:10, Evidence:6, RLS:7, Sync:43, RTL:6, Jalali:4, فاز:52, fake:3, demo:1, service_role:2, Command Bus:2, Event Bus:2, Rule Engine:1, State Machine:2, Workflow:3, Audit:16, AI:30 |
| 2 | global_software_development_roadmap_fa.txt | READ | 60505 | `e219535d02171518...` | 43704 | ممنوع:90, STOP:28, BLOCKER:33, Evidence:29, Sync:23, RTL:5, State Machine:2, Workflow:5, Audit:14, AI:31 |
| 3 | ممنوعیات.txt | READ | 40197 | `fb4de3ba76071ca3...` | 31024 | ممنوع:55, STOP:11, BLOCKER:10, Evidence:23, RLS:2, Sync:28, RTL:15, فاز:1, fake:11, State Machine:5, Workflow:4, Audit:29, AI:51 |
| 4 | MinaDent_v44_Single_Master_Full_Audit_Integrated.docx | READ | 130951 | `a0cea75969a63fce...` | 194967 | ممنوع:14, STOP:33, BLOCKER:39, Evidence:87, RLS:36, Sync:61, RTL:18, Jalali:51, Phase:222, فاز:6, fake:7, demo:1, service_role:9, State Machine:3, Workflow:29, Audit:90, AI:344 |
| 5 | MINADENT MASTER AI EXECUTION PROMPT.md | READ | 107599 | `f378cdb39ac65834...` | 98630 | STOP:5, BLOCKER:5, Evidence:28, RLS:13, Sync:71, RTL:17, Jalali:31, Phase:52, fake:7, demo:3, service_role:12, Command Bus:3, Event Bus:1, Rule Engine:1, State Machine:3, Workflow:12, Audit:35, AI:160 |
| 6 | MinaDent_MASTER_ChangeID_Benchmark_GapLocked_Execution_Contract_FA.txt | READ | 168469 | `7194c295e6354482...` | 145093 | ممنوع:25, STOP:1, BLOCKER:1, Evidence:58, RLS:4, Sync:226, RTL:14, Jalali:3, Phase:109, فاز:1, fake:37, demo:5, Command Bus:14, Event Bus:13, Rule Engine:21, State Machine:30, Workflow:51, Audit:160, AI:275 |
| 7 | MinaDent_v51_Executable_Zero_Guess_Industrial_Master.docx | READ | 57404 | `b47b00f0b2c907d6...` | 38327 | ممنوع:21, STOP:6, BLOCKER:24, Evidence:46, RLS:7, Sync:12, RTL:5, Jalali:4, Phase:28, فاز:20, fake:6, demo:6, service_role:1, State Machine:3, Workflow:3, Audit:28, AI:67 |
| 8 | MinaDent_v53_v52_Hardened_Gap_Closure_Master.docx | READ | 62580 | `30638a795479cce2...` | 81013 | STOP:25, BLOCKER:18, Evidence:39, RLS:30, Sync:34, RTL:18, Jalali:29, Phase:115, fake:6, demo:4, service_role:12, State Machine:1, Workflow:8, Audit:31, AI:112 |
| 9 | MinaDent_ULTIMATE_Master_NoOmission_Execution_Contract_FA.txt | READ | 190329 | `e2b1c2bb5eabdf3f...` | 165455 | ممنوع:26, STOP:1, BLOCKER:1, Evidence:66, RLS:4, Sync:234, RTL:14, Jalali:3, Phase:112, فاز:1, fake:37, demo:6, Command Bus:14, Event Bus:13, Rule Engine:21, State Machine:30, Workflow:58, Audit:178, AI:319 |
| 10 | MinaDent2026.html | READ | 78009 | `0144b5c69571bc2a...` | 72254 | RTL:2, demo:1, AI:9 |

## Verdict by Source Type

### Roadmap / Master Build Roadmap
ارزشمند برای phase map، engine map، command/event/rule/state/audit foundation و design foundation. اما چون با Zero Rebuild فعلی و Expo Go SDK54 lock باید هماهنگ شود، مستقیم اجرا نمی‌شود.

### Global Software Development Roadmap
ارزشمند برای روند جهانی: Project Intake، PRD، Domain Modeling، Technical Feasibility، Architecture، Repository Setup، Design System، QA، Release. این محتوا به recurring phase gates تبدیل شد.

### Forbidden Actions Registry / ممنوعیات
بالاترین ارزش این batch: باید به‌صورت فایل مستقل universal forbidden registry و همچنین در header تکرارشونده هر فاز تزریق شود. این متن باید در همه phase packetها تکرار شود تا AI/Executor از کنترل خارج نشود.

### v44 / v51 / v53 / v52 / Ultimate Contracts
بیشتر قوانین ضد دمو، ضد حدس، evidence-first، RLS، sync، Persian/RTL، no service_role و status labels تکراری هستند؛ اما enforcement wording و no-weakening/no-omission logic مفید است. تکرار حذف شد و فقط سختگیری‌ها به فایل‌های تخصصی اضافه شد.

### Master AI Execution Prompt
به‌عنوان prompt خام خطرناک است، چون direct execution wording دارد. محتوای مفید آن به executor header و always-on guard تبدیل شد.

### MinaDent2026.html
فقط design preview / visual reference است. source production نیست، WebView production نیست، و نباید مستقیم به React Native کپی شود. استخراج مجاز: tokens، layout patterns، interaction ideas، dashboard/sidebar/cards/states. اجرای مستقیم ممنوع.

## Absolute Import Rule
هر مورد import شده باید یکی از این چهار وضعیت داشته باشد:
- ACCEPT_AS_STRICTER_RULE
- MERGE_INTO_EXISTING_CANONICAL_SECTION
- QUARANTINE_AS_REFERENCE_ONLY
- REJECT_AS_DIRECT_EXECUTION_RISK

## Current Batch Status
CODE: NOT_STARTED
SCHEMA: NOT_ALLOWED
BUILD: NOT_ALLOWED
CONNECTOR: NOT_ALLOWED
LEGACY_RAW_EXECUTION: FORBIDDEN
NEXT: V1.12 read-only placement/adoption audit or next batch audit.
