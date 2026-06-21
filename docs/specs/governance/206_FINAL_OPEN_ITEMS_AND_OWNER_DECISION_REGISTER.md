# 206 — Final Open Items and Owner Decision Register — V1.15

## Purpose
These items do not mean the master vision is incomplete. They are decisions/assets required before or during specific implementation phases.

| Item | Current safe default | Needed before |
|---|---|---|
| Orthodontics | Inactive/future hook | Activating orthodontic services. |
| Online booking doctor visibility | Configurable; pending approval; privacy-safe default | Online booking implementation. |
| Final clinic display name/logo | MinaDent/Mina-Dental working name | Production branding and app store. |
| Official letterhead/stamp/signature | Placeholder forbidden for legal claim | Prescription/consent/print release. |
| Exact current last file number | Continue from last real number; user said around 4000–5000 | Patient seed/migration. |
| Staff emails | Missing for some staff | Auth account creation and notifications. |
| SMS provider credentials | Not available | SMS verification and delivery proof. |
| Payment/POS/gateway credentials | Not available | Payment integration. |
| Insurance contracts | Future/inactive | Insurance active module. |
| Price/tariff list | Seed can be complete but prices manual | Tariff module. |
| Final design samples | User may send screenshots/videos | Visual implementation approval. |
| Development Build vs Expo Go | Expo Go SDK54 is current guard | Native libraries beyond Expo Go. |
| Backup provider | Cloud/local backup policy exists | Backup implementation. |
| AI provider | Human-approved AI only | AI implementation. |

## If missing at execution time
Executor must stop only when the missing item is necessary for the active phase.

Example:
- Missing stamp does not block Foundation Shell.
- Missing SMS credentials blocks real SMS delivery claim.
- Missing exact last file number blocks real patient numbering migration.

## Final rule
Do not invent these items. Do not use fake credentials/assets. Use safe disabled/blocked state or ask exact blocker question.
