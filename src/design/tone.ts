import { colors } from './tokens';

export type Tone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/** Maps a semantic tone to a (foreground, background) pair for badges/dots. */
export const TONE_COLORS: Record<Tone, { fg: string; bg: string }> = {
  info: { fg: colors.info, bg: '#DBEAFE' },
  success: { fg: colors.success, bg: '#DCFCE7' },
  warning: { fg: colors.warning, bg: '#FEF3C7' },
  danger: { fg: colors.danger, bg: '#FEE2E2' },
  neutral: { fg: colors.textSecondary, bg: colors.surfaceAlt },
};
