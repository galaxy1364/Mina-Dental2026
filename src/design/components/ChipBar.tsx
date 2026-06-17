import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../tokens';
import { Text } from './Text';

export interface ChipItem<T extends string> {
  key: T;
  label: string;
  count?: number;
}

interface ChipBarProps<T extends string> {
  items: ChipItem<T>[];
  value: T;
  onChange: (v: T) => void;
}

/**
 * Right-aligned, horizontally scrollable filter chip bar (RTL). Chips start at
 * the right edge; when they overflow, the user scrolls toward the left to reach
 * the rest. Shared by every module screen for a consistent, modern feel.
 */
export function ChipBar<T extends string>({ items, value, onChange }: ChipBarProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {items.map((item) => {
        const active = item.key === value;
        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text variant="caption" style={[styles.label, active && styles.labelActive]}>
              {item.label}
            </Text>
            {typeof item.count === 'number' && item.count > 0 ? (
              <View style={[styles.badge, active && styles.badgeActive]}>
                <Text variant="caption" style={[styles.badgeText, active && styles.badgeTextActive]}>
                  {toFa(item.count)}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function toFa(n: number): string {
  return String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0, direction: 'rtl' },
  content: { flexDirection: 'row-reverse', gap: spacing.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
  chip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { fontFamily: fonts.medium, color: colors.textSecondary },
  labelActive: { color: colors.textInverse },
  badge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  badgeText: { fontSize: 10, lineHeight: 14, color: colors.textSecondary },
  badgeTextActive: { color: colors.textInverse },
});
