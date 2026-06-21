# MinaDent V1.7 — Lab, Inventory, Unit & Calendar Operations Lock

## Purpose
Lock operational requirements for labs, inventory, units, work hours, and calendar behavior.

## Lab model
Lab types:
- Fixed lab
- Mobile/removable lab
- Smart workflow lab category

Lab must support:
- Add/edit/deactivate lab
- Lab service catalog
- Internal price/cost
- Due date
- Status lifecycle
- Responsible doctor/treatment linkage
- Delay alert
- Delivery/return status
- Lab cost included in compensation formulas

Lab status examples:
- Draft
- Sent to lab
- In progress
- Ready
- Delivered
- Returned/needs correction
- Cancelled
- Delayed

## Inventory model
Inventory must support:
- Item name
- Category
- Unit of measure
- Current stock
- Minimum stock threshold
- Near-low stock threshold
- Expiry date if applicable
- Supplier optional
- Cost optional
- Manual adjustment with audit
- Consumption linked to treatment in later phase

Inventory alerts:
- Low stock
- Near-low stock
- Expiring soon
- Expired
- Negative stock attempt

## Unit model
Current clinic has two units, including Blue/آبی. The second unit remains editable/confirmable.
Unit features:
- Add/edit/deactivate
- Color identity
- Working availability
- Conflict detection
- Doctor/unit capacity checks

## Calendar behavior
- Jalali UI only.
- Gregorian DB storage.
- Iranian official holidays red.
- Fridays red.
- Clinic private holidays configurable.
- Holiday can be open/closed by manager override.
- Past dates dimmed but accessible.
- New appointment in past blocked by default.
- Today: only future time slots selectable.
- Historical record entry, if ever needed, must be manager-only and audited.

## Booking safety
Appointment cannot be valid without:
- Patient or provisional caller lead
- Doctor
- Unit when required by clinic flow
- Date/time/duration
- Status
- Audit owner

## UX requirement
Calendar and unit screens must show:
- Color-coded dots/counts
- Free/busy information
- Patient and doctor context
- Fast call/search/open file actions
- RTL layout
- Persian digits
