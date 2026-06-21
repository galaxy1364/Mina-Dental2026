import { StyleSheet, View } from 'react-native';
import { Icon, type IconName } from '../icons/Icon';
import { colors, radius, spacing } from '../tokens';
import { withAlpha } from '@/lib/color';
import { PressableScale } from '../motion';
import { Text } from './Text';

/**
 * A single section tile in the Iranian banking "soft icon" style: a softly
 * tinted squircle holding the hue-colored line glyph, with a caption below.
 */
export function IconTile({
  label,
  icon,
  color,
  size = 60,
  onPress,
  badge,
}: {
  label: string;
  icon: IconName;
  color: string;
  size?: number;
  onPress?: () => void;
  badge?: string;
}) {
  return (
    <PressableScale style={styles.wrap} onPress={onPress} hitSlop={4} scaleTo={0.9}>
      <View
        style={[
          styles.tile,
          { width: size, height: size, borderRadius: size * 0.32, backgroundColor: withAlpha(color, 0.14) },
        ]}
      >
        <Icon name={icon} size={size * 0.5} color={color} strokeWidth={2} />
        {badge ? (
          <View style={styles.badge}>
            <Text variant="caption" style={styles.badgeText}>
              {badge}
            </Text>
          </View>
        ) : null}
      </View>
      <Text variant="caption" tone="secondary" style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: spacing.sm, width: '100%' },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { textAlign: 'center' },
  badge: {
    position: 'absolute',
    top: -4,
    left: -4,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.surface,
  },
  badgeText: { color: colors.textInverse, fontSize: 10, lineHeight: 14 },
});
