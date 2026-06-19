/**
 * Design tokens — single source of truth for color, spacing, radius, typography.
 * No screen may hardcode colors/fonts; everything references these tokens.
 *
 * Brand foundation: Iranian banking super-app standard (Bank Mehr / Qbank /
 * Banket). Signature = bright "lime" green used as the action/accent color
 * (gradient headers, primary buttons, active tab, selected states), paired with
 * a near-black "ink" wallet/balance card and a calm light canvas. Lime always
 * carries DARK text (`onPrimary`); never white-on-lime.
 * Persian-first, RTL, Vazirmatn typeface.
 */

export const colors = {
  // Lime brand (Qbank/Bank Mehr). `primary` is a fill; put `onPrimary` text on it.
  primary: '#C2E812',
  primaryDark: '#5E7A00', // deep lime — readable as text/icon on light, and pressed
  primaryLight: '#EEF8C0', // light lime tint — soft backgrounds, chips, today
  primarySoft: '#EEF8C0',
  onPrimary: '#1A1D10', // dark ink for text/icons sitting on `primary`

  // Near-black ink for the premium wallet/balance card and strong surfaces.
  ink: '#16170F',

  background: '#F4F5F1',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F1EB',

  textPrimary: '#15170F',
  textSecondary: '#5B5F52',
  textMuted: '#9AA08C',
  textInverse: '#FFFFFF',

  border: '#E8EAE0',
  borderStrong: '#D6D9CC',

  success: '#1FA463',
  warning: '#E08A00',
  danger: '#E5484D',
  info: '#2D7FF9',
  gold: '#E2B100', // طلا / premium accents (gold investment card)

  // status / sync semantics
  offline: '#8A8F7E',
  pendingSync: '#E08A00',
  synced: '#1FA463',
  conflict: '#E5484D',
} as const;

/**
 * Section hues for the home/services icon grid. Tiles render as a soft tint of
 * the hue holding the hue-colored glyph (banking "soft icon" style), so these
 * are mid-tone colors chosen to read on a ~14% tint.
 */
export const tile = {
  patients: '#2BB673',
  appointments: '#3B82F6',
  calendar: '#EC4899',
  labcases: '#F59E0B',
  implants: '#8B5CF6',
  finance: '#1FA463',
  inventory: '#0EA5E9',
  staff: '#EF4444',
  labs: '#14B8A6',
  reports: '#64748B',
  rent: '#D946EF',
  dentalChart: '#0891B2',
  gold: '#E2B100',
} as const;

export const gradients = {
  /** Lime hero band (Qbank header). Use DARK text on this. */
  brand: ['#D7F23E', '#B8E000'] as const,
  /** Premium near-black balance/wallet card (Banket). Use WHITE text on this. */
  wallet: ['#2A2F1E', '#14160E'] as const,
  finance: ['#1FA463', '#27C46E'] as const,
  gold: ['#F2C94C', '#E2B100'] as const,
  violet: ['#6D28D9', '#8B5CF6'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  card: 20, // banking cards use generous rounding
  xl: 24,
  pill: 999,
} as const;

export const fonts = {
  regular: 'Vazirmatn_400Regular',
  medium: 'Vazirmatn_500Medium',
  bold: 'Vazirmatn_700Bold',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;

export const shadow = {
  card: {
    shadowColor: '#1A1D10',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  /** Stronger float for the wallet card / sheets. */
  float: {
    shadowColor: '#1A1D10',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
} as const;

export const tokens = { colors, spacing, radius, fonts, fontSize, shadow } as const;
export type Tokens = typeof tokens;
