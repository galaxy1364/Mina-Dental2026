# MinaDent V1.6 — Input Data Collection Checklist for Next Files

## Purpose
The user may send more files. This checklist defines what kinds of data are useful and how they must be submitted so nothing corrupts the new project.

## Preferred package structure
If many files are sent, place them in a ZIP with this structure:

```text
01_Clinic_Rules/
02_Old_Governance_Docs/
03_UI_References_Banking/
04_UI_References_Dental/
05_Competitor_Screenshots/
06_Competitor_Feature_Lists/
07_Old_Replit_Outputs/
08_Old_Code_Do_Not_Merge/
09_Error_Logs_Build_Logs/
10_Schema_SQL_Old/
11_Clinic_Workflow_Notes/
12_Finance_Lab_Implant_Rules/
13_SMS_WhatsApp_Templates/
14_Legal_Consent_Print_Forms/
15_Device_And_Runtime_Evidence/
```

## Required INPUT_INDEX_FOR_AUDIT.txt fields
For each batch, include:

```text
Batch name:
Source project:
Approximate date:
What is important:
What is broken or suspicious:
Should we use as idea / requirement / code reference / evidence / reject:
Any known runtime result:
Any screenshots attached:
```

## What is most useful now
1. Real screenshots of the banking-style app references the user likes.
2. Competitor screenshots/features, especially Labkhand and Iranian dental apps.
3. Real clinic workflow details: call → booking → arrival → treatment → finance → lab → follow-up.
4. Exact list of active doctors, units, staff, services, lab names, finance rules.
5. Any previous Replit outputs with date and whether they worked.
6. Error logs showing failures that must never repeat.
7. Any old database schema or field lists, clearly marked as old/reference only.
8. Consent/print/receipt forms, anonymized.

## What is risky and must be separated
- Old source code.
- Old package.json or lockfiles.
- Supabase SQL migrations.
- Edge Functions with service_role.
- Payment/Salamat/insurance snippets.
- AI/X-Ray/voice code.
- Screens with mock data.

These go into `DO_NOT_MERGE_UNTIL_AUDITED`.

## Privacy rule
Remove or anonymize patient names, phone numbers, national codes, addresses, financial records, and medical images unless explicitly intended for safe testing and marked as synthetic.

## Import rule
No input file becomes source code. Every input first becomes a row in:
- Legacy/Input Audit Ledger
- Requirement Traceability Matrix
- Accept/Rewrite/Reject Matrix
- Risky Code Denylist if needed
- Future Backlog if not MVP
