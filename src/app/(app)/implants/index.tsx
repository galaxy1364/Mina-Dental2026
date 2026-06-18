import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { ChipBar, type ChipItem } from '@/design/components/ChipBar';
import { ListRow } from '@/design/components/ListRow';
import { Pill } from '@/design/components/Pill';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { EmptyState } from '@/design/components/StateViews';
import { spacing } from '@/design/tokens';
import { listImplants, type Implant } from '@/features/implants/repository';
import { fullName, getPatient } from '@/features/patients/repository';
import { formatJalali } from '@/lib/jalali';
import { toPersianDigits } from '@/lib/persian';

export default function ImplantsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<Implant[]>([]);
  const [brand, setBrand] = useState<string>('all');

  const reload = useCallback(() => setItems(listImplants()), []);
  useFocusEffect(reload);

  const brands = Array.from(new Set(items.map((i) => i.brand).filter(Boolean)));
  const visible = items.filter((i) => brand === 'all' || i.brand === brand);
  const chips: ChipItem<string>[] = [
    { key: 'all', label: 'همه', count: items.length },
    ...brands.map((b) => ({ key: b, label: b, count: items.filter((i) => i.brand === b).length })),
  ];

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="بازگشت ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">ایمپلنت‌ها</Text>
      </View>

      <View style={styles.actions}>
        <Button title="ایمپلنت جدید" onPress={() => router.push('/(app)/implants/form')} />
      </View>

      <ChipBar items={chips} value={brand} onChange={setBrand} />

      <ScrollView contentContainerStyle={styles.list}>
        {visible.length === 0 ? (
          <EmptyState message="ایمپلنتی ثبت نشده است." />
        ) : (
          visible.map((i) => {
            const p = getPatient(i.patientId);
            const specs = [i.fixtureDiameter, i.fixtureLength].filter(Boolean).join(' × ');
            return (
              <ListRow
                key={i.id}
                title={`${i.brand}${i.system ? ` — ${i.system}` : ''}`}
                subtitle={p ? fullName(p) : undefined}
                meta={[
                  i.toothNumber ? `دندان ${toPersianDigits(i.toothNumber)}` : null,
                  specs || null,
                  i.placedAt ? formatJalali(i.placedAt) : null,
                ]
                  .filter(Boolean)
                  .join(' · ')}
                right={i.toothNumber ? <Pill tone="info" label={toPersianDigits(i.toothNumber)} /> : undefined}
                onPress={() => router.push(`/(app)/implants/form?id=${i.id}`)}
              />
            );
          })
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  actions: { marginBottom: spacing.md },
  list: { gap: spacing.md, paddingBottom: spacing.xl },
});
