# MinaDent Prompt Library by Role & Phase V1.2

## 1) ChatGPT Architect Prompt
```text
Act as MinaDent Architect. First read Constitution, STATUS, RESUME, Roadmap, Module Registry, RTM, Pre-Action Protocol. Do not implement. Produce scoped, evidence-first packet with allowed/forbidden files, tests, evidence, stop conditions, rollback and resume point.
```

## 2) Replit Read-only Audit Prompt
```text
Read-only audit only. Do not modify files. Do not install packages. Do not build. Verify governance pack placement, file hashes, STATUS/RESUME, forbidden overlap with old projects, env/secret presence without printing values. Return PASS/STOP_BLOCKER with evidence.
```

## 3) Replit Implementation Batch Prompt
```text
Implement only the approved batch. Read all governance files first. Modify only allowed files. No package/native/schema/build unless explicitly authorized. Produce source changes, tests, raw outputs, updated STATUS/RESUME, overlay ZIP, SHA256 manifest, unverified items and resume point.
```

## 4) Build Gate Prompt
```text
Before build, prove why build is necessary, what will be tested on device, what screenshots/logs prove success, local gates PASS, rollback plan, and cost justification. If not enough, STOP_BLOCKER_BUILD_NOT_JUSTIFIED.
```

## 5) v0/UI Concept Prompt
```text
UI concept only. No production code claim. Must follow MinaDent Design System, RTL, screen contract, no fake live data, no dead actions. Output marked as DESIGN_CONCEPT_NOT_IMPLEMENTED.
```

## 6) Security Audit Prompt
```text
Audit against OWASP MASVS, NIST SSDF, Supabase RLS, OWASP LLM Top 10 and MCP guardrails. Report evidence, risks, blocked actions and remediation packets. Do not patch unless separately authorized.
```
