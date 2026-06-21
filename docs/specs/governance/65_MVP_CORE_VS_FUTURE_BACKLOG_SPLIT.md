# MinaDent Zero Rebuild Governance Pack V1.4

**Layer:** Legacy-to-Production Governance Merge  
**Date:** 2026-06-21  
**Status:** GOVERNANCE_ONLY / NO_CODE / NO_BUILD / NO_SCHEMA / NO_CONNECTOR  
**Purpose:** تبدیل ورودی‌های legacy/v54 از «طلای خام» به requirement، قانون، backlog، ADR، denylist، prompt و gate قابل اجرای امن.

> این نسخه هیچ کد legacy را مستقیم وارد source نمی‌کند. هر کد/SQL/Prompt قدیمی فقط پس از audit، rewrite، verification و approval مرحله‌ای قابل تبدیل به implementation packet است.

## 65 — MVP Core vs Future Backlog Split

### MVP Core — فازهای اول که برای «برنامه واقعی قابل استفاده» ضروری‌اند
1. Production App Shell: RTL, theme, navigation, auth shell, role shell, error/offline states.
2. Local database foundation: SQLite, WAL, migrations, repositories, sync queue.
3. Auth + RBAC + Audit baseline: manager/doctor/secretary/lab/accountant rules.
4. Patient Master: file number, mobile, national code, duplicate, medical history, search, archive.
5. Smart Scheduling: doctor/unit/date/time/duration/type/status/no-show/reschedule/calendar.
6. Patient Journey Engine: lead/call → appointment → arrival → treatment → finance → lab → follow-up.
7. Finance baseline: invoice, payments, debt, installment, cheque, discount, doctor share edge-only design.
8. Lab baseline: lab order lifecycle, due dates, delivery, cost link.
9. Dashboard command center: daily live operational cards, timeline, alerts, sync/backup status.
10. Backup/Restore + Release gates: no data loss, no clear data, rollback plan.

### Future Backlog — ارزشمند اما بعد از core
- PWA/Windows Desktop.
- WhatsApp/Bale/Eitaa advanced messaging.
- Insurance API integrations.
- Payment gateway/online payments.
- X-Ray AI, digital twin, voice commands.
- 3D/AR dental visualization.
- GraphQL/codegen.
- SaaS subscription plans.
- FHIR export.
- Advanced ML/no-show prediction.
- Smart contracts/blockchain/quantum-ready research.

### Rule
هیچ Future Backlog حق ندارد MVP Core را عقب بیندازد یا قبل از Foundation وارد source شود.
