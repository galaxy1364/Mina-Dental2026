# 86 — MinaDent Integrated Foundation Engine Spec
Version: V1.5
Status: LOCKED PRODUCT FOUNDATION

## Purpose
MinaDent is not a collection of screens. It is a unified dental operating system. The foundation must include engines that every module uses.

## Required foundation engines

### 1. Identity & Role Engine
Manager, doctor, secretary, assistant. Deny-by-default. Sensitive finance and delete/edit actions protected.

### 2. Patient Journey Engine
Every patient must have stage, owner, due date, next action, blocking reason, audit trail.

### 3. Scheduling Engine
FHIR-inspired Schedule/Slot/Appointment model adapted for Iranian dental workflows, doctor/unit capacity, duration flexibility, holidays, no-show, waiting list.

### 4. Timeline Engine
Unified event stream: lead, call, file, appointment, arrival, visit, diagnosis, treatment, lab, imaging, prescription, consent, payment, debt, recall, archive.

### 5. Financial Attribution Engine
Treatment production, lab cost, implant exceptions, discounts, doctor share, installments/cheques, manager-only sensitive calculations.

### 6. Sync & Conflict Engine
Offline-first queue, state machine, conflict policy, manual conflict center for financial/clinical conflicts.

### 7. Audit Engine
All sensitive actions record old/new/reason/actor/device/time/sync state.

### 8. Research/Requirement Engine
Every new feature goes through research → requirement → design/data contract → test → execution.

### 9. UI Token & Module Identity Engine
All colors/icons/surfaces/dock/cards/headers from registry; no isolated styles.

### 10. AI Safety Engine
AI may suggest, summarize, find, draft, prioritize, and prefill. It may not autonomously diagnose, bill, delete, send sensitive data, or change schema.

## Foundation acceptance
Foundation is accepted only when these engines are visible in code structure or governance contracts, and the first phone-visible shell proves the UI direction.
