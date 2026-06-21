import { ScrollView, StyleSheet, Pressable, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../tokens';
import { withAlpha } from '@/lib/color';
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
 * Right-aligned, horizontally scrollable filter chip bar. This app realizes RTL
 * via `flexDirection: 'row'` throughout (the same convention used by
 * every other screen), so the first chip sits at the right edge and overflow
 * scrolls toward the left; `direction: 'rtl'` right-anchors the scroll offset so
 * the first chips are visible initially. Shared by every module screen.
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
  content: { flexDirection: 'row', gap: spacing.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
  chip: {
    flexDirection: 'row',
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
  labelActive: { color: colors.onPrimary },
  badge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: { backgroundColor: withAlpha(colors.onPrimary, 0.18) },
  badgeText: { fontSize: 10, lineHeight: 14, color: colors.textSecondary },
  badgeTextActive: { color: colors.onPrimary },
});
