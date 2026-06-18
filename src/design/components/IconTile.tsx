import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, type IconName } from '../icons/Icon';
import { colors, radius, spacing } from '../tokens';
import { Text } from './Text';

/**
 * A single colorful rounded-square section tile (Iranian super-app style):
 * a tinted squircle holding a white glyph, with a caption below.
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
    <Pressable style={[styles.wrap, { width: Math.max(78, size + 24) }]} onPress={onPress} hitSlop={4}>
      <View
        style={[
          styles.tile,
          { width: size, height: size, borderRadius: size * 0.3, backgroundColor: color, shadowColor: color },
        ]}
      >
        <Icon name={icon} size={size * 0.5} color="#FFFFFF" strokeWidth={1.9} />
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: spacing.xs },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
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
