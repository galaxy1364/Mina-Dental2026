# MinaDent V1.7 — Treatment Service Catalog Without Orthodontics

## Purpose
Create a controlled treatment/service catalog requirement for the clinic, excluding orthodontics for now while keeping future extensibility.

## Rule
MinaDent must support nearly all dental treatment categories except orthodontics at initial scope.

## Required catalog characteristics
Each service/treatment should support:
- Persian name
- Category
- Default duration optional
- Default price optional/editable
- Doctor share behavior
- Lab requirement flag
- Lab cost behavior
- Tooth/surface requirement flag
- Consent requirement flag
- Active/inactive status
- Display color/icon
- Audit on changes

## Initial treatment categories to seed as configurable items
- Visit and consultation
- Emergency visit
- Scaling/prophylaxis
- Composite/restoration
- Amalgam/filling if used
- Endodontics/RCT
- Post/core if used
- Crown/prosthesis
- Implant consultation
- Implant surgery
- Implant prosthetic stage
- Abutment/crown stage
- Extraction
- Surgical extraction
- Pediatric dentistry
- Whitening/bleaching if used
- Denture/removable prosthesis
- Lab-linked prosthetic services
- Follow-up/recall
- Prescription-only visit

## Orthodontics handling
- Orthodontics is excluded from active initial catalog.
- System must not hardcode absence permanently.
- Future activation should be a catalog/configuration change, not architecture rewrite.

## Pricing rule
- Prices must be editable manually.
- Discounts can be amount/percentage.
- Prices must not be assumed current without user confirmation.
- Service catalog can be seeded with placeholders only if clearly marked as editable reference, not real tariff.

## Finance linkage
Every billable service must be able to create charge items with:
- Gross amount
- Discount
- Net amount
- Doctor attribution
- Lab cost if any
- Payment/debt linkage
- Share calculation reference
