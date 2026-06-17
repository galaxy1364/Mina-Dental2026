import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Input } from '@/design/components/Input';
import { Text } from '@/design/components/Text';
import { colors, radius, spacing } from '@/design/tokens';
import { fullName, getPatient, listPatients } from './repository';
import { toPersianDigits } from '@/lib/persian';

interface Props {
  value: string | null;
  onChange: (patientId: string) => void;
}

/** Searchable inline patient selector for appointment/lab/finance/implant forms. */
export function PatientPicker({ value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const selected = value ? getPatient(value) : undefined;

  if (selected) {
    return (
      <View>
        <Text variant="caption" tone="secondary" style={styles.label}>
          بیمار
        </Text>
        <View style={styles.selected}>
          <Text variant="body">
            {fullName(selected)} · پروندهٔ {toPersianDigits(selected.fileNumber)}
          </Text>
          <Pressable onPress={() => onChange('')} hitSlop={8}>
            <Text variant="caption" tone="primary">
              تغییر
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const results = query.trim() ? listPatients(query, 8) : listPatients(undefined, 8);

  return (
    <View>
      <Input
        label="بیمار"
        placeholder="جستجوی بیمار: نام، موبایل یا کد ملی"
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.results}>
        {results.length === 0 ? (
          <Text variant="caption" tone="muted" style={styles.label}>
            بیماری یافت نشد.
          </Text>
        ) : (
          results.map((p) => (
            <Pressable key={p.id} style={styles.result} onPress={() => onChange(p.id)}>
              <Text variant="body" style={styles.label}>
                {fullName(p)}
              </Text>
              <Text variant="caption" tone="muted">
                پروندهٔ {toPersianDigits(p.fileNumber)}
              </Text>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { textAlign: 'right' },
  selected: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  results: { marginTop: spacing.sm, gap: spacing.xs },
  result: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
});
