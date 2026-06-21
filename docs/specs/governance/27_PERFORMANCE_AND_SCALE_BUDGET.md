# MinaDent Performance & Scale Budget V1.2

**Target:** 200,000+ patient files, offline-first, no visible lag on real Android device.

## Budgets
| Area | Budget |
|---|---|
| Patient search | < 1s with indexed local DB |
| Appointment day load | < 500ms for visible day range |
| Dashboard initial load | staged/skeleton; no full DB scan |
| Long lists | virtualized/paginated/windowed |
| Sync queue | batch-based, retryable, non-blocking |
| Calendar | range-based query, not all-history render |
| Images/files | thumbnails + lazy load |
| Backup | incremental or staged; progress UI |

## Mandatory Indexes
- patients: clinic_id, file_number, normalized_mobile, national_code, full_name_search.
- appointments: clinic_id, date, doctor_id, unit_id, status.
- journey_events: patient_id, current_stage, due_at, owner_role.
- finance: patient_id, due_at, status.
- lab_orders: patient_id, due_at, status.
- sync_queue: status, entity_type, created_at.

## Forbidden Patterns
- loading all patients into memory.
- client-side search over huge unindexed arrays.
- dashboard full-table aggregation every render.
- renderItem unstable or heavy list rows without memoization.
- image full-resolution render in lists.

## Required Load Tests
```text
20k patients
100k patients
200k patients
10k appointments
5k unpaid finance rows
sync backlog 1k writes
conflict storm 100 records
backup/restore under load
```
