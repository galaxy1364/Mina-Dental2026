import { colors } from './tokens';
import { withAlpha } from '@/lib/color';

export type Tone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/**
 * Maps a semantic tone to a (foreground, background) pair for badges/dots.
 * Backgrounds are a low-alpha tint of the foreground so they read as glass
 * chips on the dark canvas.
 */
export const TONE_COLORS: Record<Tone, { fg: string; bg: string }> = {
  info: { fg: colors.info, bg: withAlpha(colors.info, 0.16) },
  success: { fg: colors.success, bg: withAlpha(colors.success, 0.16) },
  warning: { fg: colors.warning, bg: withAlpha(colors.warning, 0.16) },
  danger: { fg: colors.danger, bg: withAlpha(colors.danger, 0.16) },
  neutral: { fg: colors.textSecondary, bg: colors.surfaceAlt },
};
