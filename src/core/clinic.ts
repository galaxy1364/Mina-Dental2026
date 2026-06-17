/**
 * LOCKED clinic master data (reference: Mina-Dental / مینا دنتال).
 * These identifiers are seeded once and never invented at runtime.
 */
export const CLINIC = {
  id: 'afc3cf13-9d00-4076-b0c9-25829bb59848',
  nameFa: 'مینا دنتال',
  nameEn: 'Mina-Dental',
  workingHours: { startHour: 8, endHour: 24 },
  currency: 'تومان',
  units: ['آبی', 'زرد'] as const,
} as const;
