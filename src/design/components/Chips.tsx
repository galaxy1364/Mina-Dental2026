import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../tokens';
import { Text } from './Text';

interface ChipsProps<T extends string> {
  options: T[];
  value: T;
  labels: Record<T, string>;
  onChange: (v: T) => void;
}

/** Single-select pill chooser, RTL-aware. */
export function Chips<T extends string>({ options, value, labels, onChange }: ChipsProps<T>) {
  return (
    <View style={styles.chips}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text variant="caption" tone={active ? 'inverse' : 'secondary'}>
              {labels[opt]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
});
