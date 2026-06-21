import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Input } from '@/design/components/Input';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { colors, radius, spacing } from '@/design/tokens';
import {
  LAB_TYPE_LABELS,
  createLab,
  getLab,
  updateLab,
  type LabType,
} from '@/features/labs/repository';
import { normalizeMobile } from '@/lib/persian';
import { useAuth } from '@/features/auth/useAuth';
import { EmptyState } from '@/design/components/StateViews';

const TYPES: LabType[] = ['fixed', 'removable'];

export default function LabFormScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const isManager = session?.role === 'manager';
  const { id } = useLocalSearchParams<{ id?: string }>();
  const existing = useMemo(() => (id ? getLab(id) : undefined), [id]);

  const [name, setName] = useState(existing?.name ?? '');
  const [type, setType] = useState<LabType>(existing?.type ?? 'fixed');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [contactPerson, setContactPerson] = useState(existing?.contactPerson ?? '');
  const [address, setAddress] = useState(existing?.address ?? '');
  const [active, setActive] = useState(existing?.active ?? true);
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [error, setError] = useState<string | null>(null);

  const onSave = () => {
    setError(null);
    if (!name.trim()) return setError('نام لابراتوار الزامی است.');

    const payload = {
      name: name.trim(),
      type,
      phone: phone ? normalizeMobile(phone) : null,
      contactPerson: contactPerson.trim() || null,
      address: address.trim() || null,
      active,
      notes: notes.trim() || null,
    };

    if (existing) updateLab(existing.id, payload);
    else createLab(payload);
    router.back();
  };

  if (!isManager) {
    return (
      <Screen>
        <Stack.Screen options={{ headerShown: false }} />
        <EmptyState message="فقط مدیر می‌تواند لابراتوار را اضافه یا ویرایش کند." />
        <View style={styles.guard}>
          <Button title="بازگشت" kind="secondary" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="انصراف ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">{existing ? 'ویرایش لابراتوار' : 'لابراتوار جدید'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Input label="نام لابراتوار" value={name} onChangeText={setName} />

        <View>
          <Text variant="caption" tone="secondary" style={styles.label}>
            نوع
          </Text>
          <View style={styles.chips}>
            {TYPES.map((t) => {
              const activeChip = t === type;
              return (
                <Pressable
                  key={t}
                  onPress={() => setType(t)}
                  style={[styles.chip, activeChip && styles.chipActive]}
                >
                  <Text variant="caption" tone={activeChip ? 'onPrimary' : 'secondary'}>
                    {LAB_TYPE_LABELS[t]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Input label="تلفن" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Input label="شخص رابط" value={contactPerson} onChangeText={setContactPerson} />
        <Input label="آدرس" value={address} onChangeText={setAddress} multiline />

        <View style={styles.switchRow}>
          <Text variant="body" tone="secondary">
            فعال
          </Text>
          <Switch value={active} onValueChange={setActive} />
        </View>

        <Input label="یادداشت" value={notes} onChangeText={setNotes} multiline />

        {error ? (
          <Text variant="caption" style={{ color: colors.danger, textAlign: 'right' }}>
            {error}
          </Text>
        ) : null}

        <Button title="ذخیره" onPress={onSave} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  guard: { padding: spacing.lg },
  form: { gap: spacing.lg, paddingBottom: spacing.xl },
  label: { textAlign: 'right', marginBottom: spacing.sm },
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
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
