import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../tokens';
import { Text } from './Text';

interface ListRowProps {
  title: string;
  subtitle?: string;
  meta?: string;
  right?: ReactNode;
  onPress?: () => void;
}

/** A tappable surface row used across list screens (RTL). */
export function ListRow({ title, subtitle, meta, right, onPress }: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && onPress ? styles.pressed : null]}
    >
      <View style={styles.texts}>
        <Text variant="body" tone="primary" style={styles.title}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" tone="secondary" style={styles.title}>
            {subtitle}
          </Text>
        ) : null}
        {meta ? (
          <Text variant="caption" tone="muted" style={styles.title}>
            {meta}
          </Text>
        ) : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    ...shadow.card,
  },
  pressed: { opacity: 0.85 },
  texts: { flex: 1, gap: spacing.xs },
  title: { textAlign: 'right' },
  right: { alignItems: 'flex-end', gap: spacing.xs },
});
