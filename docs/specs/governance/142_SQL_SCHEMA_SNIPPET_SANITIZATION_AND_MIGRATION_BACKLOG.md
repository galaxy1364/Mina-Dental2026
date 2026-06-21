# 142 — SQL Schema Snippet Sanitization and Migration Backlog

**Version:** V1.9  
**Date:** 2026-06-21  
**Status:** GOVERNANCE / READ-ONLY MERGE / NOT A BUILD PERMIT  
**Source Batch:** Legacy Master Contracts Batch 2: v54, Phase-by-Phase Code Guide, v22, v23, v24, v25, v25 Hardening, v25 Supreme, v25.1, Audit Snapshot.

## Problem
Legacy files contain SQL migrations for clinics, users, patients, appointments, finance, lab, inventory, staff permissions, etc. Some patterns are useful; direct execution is unsafe.

## Why direct SQL is forbidden now
- Current entity model is not frozen.
- Current real clinic data differs from older defaults.
- SDK/runtime path is still under Expo Go54 compatibility gate.
- Supabase project identity/secrets/provider selection not yet audited.
- Some snippets assume old hardcoded clinic IDs, old doctor list, old appointment windows, or old sequence starts.

## Importable design patterns
- RLS on every operational table.
- Sequential migrations.
- Soft delete for clinical/financial records.
- appointment overlap prevention at DB layer.
- cheque/installment/debt lifecycle tables.
- lab and inventory lifecycle tables.
- staff permission granularity.
- audit event append-only pattern.

## Rewrite requirements before any migration
Every migration must include:
- REQ-ID/ENTITY-ID/PERMISSION-ID references.
- forward migration and rollback/compensating plan.
- RLS policies and negative tests.
- clinic_id scoping and ownership model.
- no hardcoded real secrets.
- no stale clinic master data.
- Jalali UI only; Gregorian DB only.
- test/evidence plan.

## Backlog status
`SCHEMA_SNIPPETS_QUARANTINED_PENDING_ENTITY_CONTRACT`
