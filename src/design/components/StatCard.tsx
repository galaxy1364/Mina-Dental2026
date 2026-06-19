import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../tokens';
import { TONE_COLORS, type Tone } from '../tone';
import { Text } from './Text';

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: Tone;
  icon?: string;
  onPress?: () => void;
}

/** Live, tappable metric tile for the dashboard (2026 soft-card style). */
export function StatCard({ label, value, hint, tone = 'neutral', icon, onPress }: StatCardProps) {
  const t = TONE_COLORS[tone];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && onPress ? styles.pressed : null]}
    >
      <View style={styles.top}>
        <View style={[styles.iconWrap, { backgroundColor: t.bg }]}>
          <Text variant="subtitle" style={{ color: t.fg }}>
            {icon ?? '•'}
          </Text>
        </View>
        {onPress ? (
          <Text variant="caption" tone="muted">
            ‹
          </Text>
        ) : null}
      </View>
      <Text variant="title" style={styles.value}>
        {value}
      </Text>
      <Text variant="caption" tone="secondary">
        {label}
      </Text>
      {hint ? (
        <Text variant="caption" style={{ color: t.fg, marginTop: spacing.xs }}>
          {hint}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    ...shadow.card,
  },
  pressed: { opacity: 0.85 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: { marginTop: spacing.sm },
});
