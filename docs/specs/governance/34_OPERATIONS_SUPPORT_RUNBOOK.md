# MinaDent Operations & Support Runbook V1.2

## Incident Template
```text
INCIDENT_ID:
DATE:
MODULE:
USER_IMPACT:
SYMPTOMS:
LAST_KNOWN_GOOD:
EVIDENCE_COLLECTED:
ROOT_CAUSE_STATUS:
SAFE_ACTIONS:
FORBIDDEN_ACTIONS:
ROLLBACK_REQUIRED:
RESUME_POINT:
```

## Common Incidents
### Sync stuck
Collect: sync_queue counts, last error, entity_type, network status.  
Forbidden: clear data/uninstall before backup evidence.

### Login failure
Collect: auth logs, env presence without printing secrets, role record, network.  
Forbidden: changing auth schema without packet.

### Duplicate patient
Collect: mobile/national_code/file_number normalized values, conflict source.  
Forbidden: delete duplicate without merge/audit plan.

### App crash
Collect: screenshot/video, Android logcat, reproduction path, last changed files.  
Forbidden: random patch or package change.

### Migration failure
Collect: SQL error, table state, backup state, transaction status.  
Forbidden: rerun destructive SQL blindly.

### Secret leak
Immediate: rotate secret, remove from repo/chat, audit logs.  
Forbidden: continuing build with exposed key.
