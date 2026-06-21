/**
 * Design tokens — single source of truth for color, spacing, radius, typography.
 * No screen may hardcode colors/fonts; everything references these tokens.
 *
 * Visual foundation (LOCKED V1.17): owner-approved "V0 dashboard" direction —
 * a dark, luxury, clinical dashboard. Deep petrol / slate green-black canvas,
 * luminous TURQUOISE/TEAL primary action, clinical VIOLET accent, translucent
 * "glass" cards with soft borders and restrained teal glow, premium rounded
 * geometry, bold Persian numeric hierarchy. Banking apps (Bank Mehr / Qbank /
 * Banket) remain the STRUCTURAL reference (cards, dock, chips, list rows); the
 * palette is the dark teal-glass system locked in docs/specs/governance
 * (219/220/222). Teal `primary` is a fill; it always carries dark `onPrimary`
 * text. Persian-first, RTL, Vazirmatn typeface.
 */

export const colors = {
  // Luminous turquoise brand. `primary` is a fill; put `onPrimary` text on it.
  primary: '#22D3C5',
  primaryDark: '#5BEADD', // bright teal — readable as text/icon on the dark canvas
  primaryLight: '#0E3A3B', // dark teal tint — soft backgrounds, chips, today
  primarySoft: '#0E3A3B',
  onPrimary: '#04181B', // deep petrol ink for text/icons sitting on `primary`

  // Clinical violet secondary accent (sessions / special states).
  secondary: '#9A8CF7',
  secondarySoft: '#221F3D',

  // Premium near-black petrol for the wallet/balance card and strong surfaces.
  ink: '#0B2227',

  // Deep petrol / clinic black-green canvas + translucent glass surfaces.
  background: '#08171B',
  surface: '#102A30', // glass card
  surfaceAlt: '#16363D', // elevated glass

  textPrimary: '#EAF6F4',
  textSecondary: '#9BB2BA',
  textMuted: '#647C84',
  textInverse: '#FFFFFF',

  border: '#1E3A41', // low-contrast glass border
  borderStrong: '#2C4F57',

  success: '#34D399',
  warning: '#FBBF24',
  danger: '#FB6E73',
  info: '#38BDF8',
  gold: '#F2C14E', // طلا / premium accents

  // status / sync semantics
  offline: '#647C84',
  pendingSync: '#FBBF24',
  synced: '#34D399',
  conflict: '#FB6E73',
} as const;

/**
 * Section hues for the home/services icon grid. Tiles render as a soft tint of
 * the hue holding the hue-colored glyph (banking "soft icon" style). On the dark
 * canvas these are bright mid-tones chosen to read both as a ~14% tint and as a
 * full-strength glyph.
 */
export const tile = {
  patients: '#34D399',
  appointments: '#38BDF8',
  calendar: '#F472B6',
  labcases: '#FBBF24',
  implants: '#A78BFA',
  finance: '#34D399',
  inventory: '#22D3EE',
  staff: '#FB7185',
  labs: '#2DD4BF',
  reports: '#94A3B8',
  rent: '#E879F9',
  dentalChart: '#22D3EE',
  gold: '#F2C14E',
} as const;

export const gradients = {
  /** Luminous teal hero band. Use DARK text on this. */
  brand: ['#2DE3D3', '#15B7AB'] as const,
  /** Premium petrol-glass balance/wallet card. Use WHITE text on this. */
  wallet: ['#15363C', '#0A1F24'] as const,
  finance: ['#10B981', '#34D399'] as const,
  gold: ['#F2C94C', '#E2B100'] as const,
  violet: ['#7C6FF0', '#9A8CF7'] as const,
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
  card: 22, // glass cards use generous rounding
  xl: 26,
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
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  /** Stronger float for the wallet card / sheets. */
  float: {
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  /** Restrained teal glow for primary/active elements. */
  glow: {
    shadowColor: '#22D3C5',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
} as const;

export const tokens = { colors, spacing, radius, fonts, fontSize, shadow } as const;
export type Tokens = typeof tokens;
