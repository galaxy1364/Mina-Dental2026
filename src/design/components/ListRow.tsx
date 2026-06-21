import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../tokens';
import { withAlpha } from '@/lib/color';
import { Icon, type IconName } from '../icons/Icon';
import { PressableScale } from '../motion';
import { Text } from './Text';

interface ListRowProps {
  title: string;
  subtitle?: string;
  meta?: string;
  right?: ReactNode;
  onPress?: () => void;
  /** Optional leading icon, shown in a tinted squircle on the RIGHT (banking style). */
  icon?: IconName;
  /** Hue for the leading icon tile (defaults to brand lime). */
  iconColor?: string;
  /** Show the trailing chevron on the LEFT when the row is tappable. */
  chevron?: boolean;
}

/**
 * Banking-style list row (RTL): a white rounded card with an optional tinted
 * leading icon on the right, title/subtitle/meta stacked to its right, optional
 * trailing content and a chevron on the left. Tapping scales the card.
 */
export function ListRow({
  title,
  subtitle,
  meta,
  right,
  onPress,
  icon,
  iconColor = colors.primaryDark,
  chevron = true,
}: ListRowProps) {
  return (
    <PressableScale onPress={onPress} style={styles.row} disabled={!onPress}>
      {icon ? (
        <View style={[styles.iconTile, { backgroundColor: withAlpha(iconColor, 0.14) }]}>
          <Icon name={icon} size={22} color={iconColor} strokeWidth={2} />
        </View>
      ) : null}
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
      {onPress && chevron ? <Icon name="chevronL" size={18} color={colors.textMuted} /> : null}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    ...shadow.card,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { flex: 1, gap: spacing.xs },
  title: { textAlign: 'right' },
  right: { alignItems: 'flex-end', gap: spacing.xs },
});
