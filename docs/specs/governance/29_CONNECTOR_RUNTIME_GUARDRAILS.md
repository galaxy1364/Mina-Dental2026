# MinaDent Connector / MCP Runtime Guardrails V1.2

## 1) Default Deny
هر connector/MCP/tool به‌صورت پیش‌فرض ممنوع است تا allowlist، permission، scope و audit مشخص شود.

## 2) Allowlist Categories
| Category | Default | Condition |
|---|---|---|
| Read-only docs | allowed after audit | no patient secrets |
| GitHub read | allowed after repo guard | no write |
| GitHub write | blocked | explicit batch only |
| Supabase read | blocked until RLS | service role never in client |
| Supabase write | blocked | migration packet only |
| SMS/WhatsApp send | blocked | template + manager/role approval |
| Calendar/Email | blocked | scoped permission + audit |
| Payment/POS | blocked | finance hardening required |
| Patient export | blocked | manager approval + audit |

## 3) MCP Threat Controls
- Tool metadata inspection.
- Prompt injection scan.
- Tool poisoning scan.
- Capability attestation preferred.
- No shell execution through MCP unless isolated and approved.
- Human confirmation for destructive actions.
- Full tool-call log.

## 4) STOP Conditions
```text
STOP_BLOCKER_MCP_UNTRUSTED_TOOL
STOP_BLOCKER_CONNECTOR_PERMISSION_TOO_BROAD
STOP_BLOCKER_SECRET_EXPOSURE_RISK
STOP_BLOCKER_PATIENT_DATA_EXPORT_RISK
```
