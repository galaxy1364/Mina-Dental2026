import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/design/components/Text';
import { colors, radius, spacing } from '@/design/tokens';
import { listDoctors } from './repository';

interface Props {
  value: string | null;
  onChange: (doctorId: string | null) => void;
  label?: string;
}

/** Chip selector of treating providers (doctors + manager). */
export function DoctorPicker({ value, onChange, label = 'پزشک' }: Props) {
  const doctors = listDoctors();
  return (
    <View>
      <Text variant="caption" tone="secondary" style={styles.label}>
        {label}
      </Text>
      <View style={styles.chips}>
        <Chip active={value == null} onPress={() => onChange(null)} text="—" />
        {doctors.map((d) => (
          <Chip key={d.id} active={value === d.id} onPress={() => onChange(d.id)} text={d.fullName} />
        ))}
      </View>
    </View>
  );
}

function Chip({ active, onPress, text }: { active: boolean; onPress: () => void; text: string }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text variant="caption" tone={active ? 'inverse' : 'secondary'}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: { textAlign: 'right', marginBottom: spacing.sm },
  chips: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: spacing.sm },
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
