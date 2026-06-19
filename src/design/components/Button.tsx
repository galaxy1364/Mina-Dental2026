import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
} from 'react-native';
import { colors, radius, spacing } from '../tokens';
import { Text } from './Text';

type Kind = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title: string;
  kind?: Kind;
  loading?: boolean;
}

const BG: Record<Kind, string> = {
  primary: colors.primary,
  secondary: colors.surfaceAlt,
  danger: colors.danger,
  ghost: 'transparent',
};

const TEXT_TONE = {
  primary: 'onPrimary',
  secondary: 'primary',
  ghost: 'primary',
  danger: 'inverse',
} as const;

export function Button({ title, kind = 'primary', loading, disabled, ...rest }: ButtonProps) {
  const isDisabled = disabled || loading;
  const tone = TEXT_TONE[kind];
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: BG[kind] },
        kind === 'ghost' && styles.ghost,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
      {...rest}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            color={kind === 'primary' ? colors.onPrimary : kind === 'danger' ? colors.textInverse : colors.primaryDark}
          />
        ) : (
          <Text variant="button" tone={tone}>
            {title}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghost: { borderWidth: 1, borderColor: colors.border },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
});
