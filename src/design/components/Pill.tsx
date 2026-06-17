import { StyleSheet, View } from 'react-native';
import { radius, spacing } from '../tokens';
import { TONE_COLORS, type Tone } from '../tone';
import { Text } from './Text';

/** Small semantic status pill. */
export function Pill({ label, tone = 'neutral' }: { label: string; tone?: Tone }) {
  const t = TONE_COLORS[tone];
  return (
    <View style={[styles.pill, { backgroundColor: t.bg }]}>
      <Text variant="caption" style={{ color: t.fg }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
});
