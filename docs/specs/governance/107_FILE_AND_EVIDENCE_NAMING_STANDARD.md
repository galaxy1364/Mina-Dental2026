# MinaDent V1.6 — File and Evidence Naming Standard

## Purpose
Stop confusion across versions, screenshots, logs, Replit outputs, and old projects.

## ZIP naming
```text
MinaDent_Zero_Rebuild_Foundation_Governance_Pack_VX_Y_YYYY-MM-DD.zip
```

## Patch report naming
```text
MinaDent_VX_Y_Patch_Report_YYYY-MM-DD.md
```

## Evidence folder naming
```text
evidence/PHASE_BATCHID_DATE/
```

## Runtime screenshot naming
```text
DEVICE_PLATFORM_PHASE_SCREEN_PASSFAIL_YYYYMMDD_HHMM.png
```

## Replit output naming
```text
BATCH-ID_REPLIT_OUTPUT_YYYYMMDD.md
BATCH-ID_OVERLAY.zip
BATCH-ID_SHA256_MANIFEST.txt
```

## Old file naming
Every old file must keep original name and be placed in:
```text
legacy_input_readonly/YYYYMMDD_batch_name/
```

## Required evidence metadata
Each evidence item must include:
- date/time
- phase
- batch id
- device/platform
- command/output or screenshot
- pass/fail
- known limits
