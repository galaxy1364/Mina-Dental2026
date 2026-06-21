# MinaDent V1.7 — Patient Identity, Duplicate & Relationship Policy

## Purpose
Define patient identity rules for a high-scale Iranian dental clinic with family/shared phone scenarios.

## Mandatory fields
A patient file must include:
- File number
- Mobile number
- National code

## Uniqueness policy
### File number
- Must be unique.
- Must support at least 200,000 records.
- Must continue from existing real latest file number, approximately 4,000–5,000 now.
- Manual correction may exist only for manager/admin with audit.

### National code
- Must be unique per real person.
- Duplicate national code should block new patient creation unless manager resolves as correction/merge scenario.
- National code validation/checksum required.

### Mobile
- Mobile can be shared in family context.
- Duplicate mobile must not silently create confusion.
- Duplicate mobile should show a warning card with existing linked patients.
- User must choose relationship or confirm intentional shared phone.

## Relationship engine
Supported relationships should include:
- Spouse
- Parent
- Child
- Sibling
- Family member
- Referrer
- Guardian
- Emergency contact
- Other

Bidirectional behavior:
- Some relationships are naturally inverse (parent/child, spouse/spouse).
- System must store relationship direction and display inverse labels where useful.
- Relationship changes require audit.

## Merge/correction workflow
If duplicate patient is discovered:
- Hard delete forbidden.
- Merge requires manager approval.
- Old file link retained in audit/history.
- Financial/clinical records must not be lost.
- Merge is future advanced workflow and not MVP unless explicitly scoped.

## Search requirements
Search must support:
- File number
- Mobile
- National code
- First/last name
- Persian normalization
- Related patients by shared phone/relationship

## Phone normalization
Accepted input variants should normalize to canonical Iranian mobile format where possible:
- 0912...
- 912...
- +98912...
- 0098912...
- Persian/Arabic digits

Canonical storage target:
```text
09xxxxxxxxx
```
