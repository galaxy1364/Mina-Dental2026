import { Text as RNText, type TextProps, type TextStyle } from 'react-native';
import { colors, fonts, fontSize } from '../tokens';

type Variant = 'title' | 'subtitle' | 'body' | 'caption' | 'button';
type Tone = 'primary' | 'secondary' | 'muted' | 'inverse' | 'onPrimary' | 'brand' | 'danger' | 'success';

const VARIANT_STYLE: Record<Variant, TextStyle> = {
  title: { fontFamily: fonts.bold, fontSize: fontSize.xxl },
  subtitle: { fontFamily: fonts.medium, fontSize: fontSize.lg },
  body: { fontFamily: fonts.regular, fontSize: fontSize.md },
  caption: { fontFamily: fonts.regular, fontSize: fontSize.sm },
  button: { fontFamily: fonts.medium, fontSize: fontSize.md },
};

const TONE_COLOR: Record<Tone, string> = {
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
  muted: colors.textMuted,
  inverse: colors.textInverse,
  onPrimary: colors.onPrimary,
  brand: colors.primaryDark,
  danger: colors.danger,
  success: colors.success,
};

export interface AppTextProps extends TextProps {
  variant?: Variant;
  tone?: Tone;
}

export function Text({ variant = 'body', tone = 'primary', style, ...rest }: AppTextProps) {
  return (
    <RNText
      style={[VARIANT_STYLE[variant], { color: TONE_COLOR[tone], writingDirection: 'rtl' }, style]}
      {...rest}
    />
  );
}
