# 139 — Security, Privacy, Risk Governance Import

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Practical security testing
Security rules are not enough. Each release candidate must have repeatable evidence.

## Required tests
| Test | Cadence | Blocking condition |
|---|---|---|
| Secret scan | every PR / batch | any exposed secret |
| Dependency/CVE scan | release and periodic | unresolved critical CVE |
| RLS review | every data migration | unsafe public access |
| Auth/session review | release candidate | raw token storage/logging |
| Log privacy review | monthly/release | PII in logs |
| Backup access review | release and periodic | unauthorized path |
| Pen-style scenarios | scheduled/release | privilege bypass/data leak |

## Required governance artifacts
- Threat Model.
- Risk Register.
- Data Classification Matrix.
- Access Review Log.
- Retention and Deletion Policy.
- Security Incident Register.
- Key Rotation Record.

## Data classification minimum
- Public Configuration.
- Internal Operational.
- Sensitive Operational.
- Financial Sensitive.
- Authentication Secret.
- Audit Immutable.
- Clinical Sensitive.
- Consent/Legal Evidence.

## Release blocking risk classes
A release is blocked if any of these are open without formal acceptance:
- possible data loss,
- privilege escalation,
- weak RLS on operational table,
- failed restore drill,
- PII logging,
- service_role/client secret exposure,
- unreviewed financial correction path.
