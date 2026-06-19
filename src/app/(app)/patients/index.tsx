import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { ChipBar, type ChipItem } from '@/design/components/ChipBar';
import { Input } from '@/design/components/Input';
import { ListRow } from '@/design/components/ListRow';
import { Pill } from '@/design/components/Pill';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { EmptyState } from '@/design/components/StateViews';
import { spacing } from '@/design/tokens';
import { fullName, listPatients, type Patient } from '@/features/patients/repository';
import { patientBalance } from '@/features/payments/repository';
import { formatToman, toPersianDigits } from '@/lib/persian';

type PatientFilter = 'all' | 'debtor' | 'settled';

export default function PatientsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Patient[]>([]);
  const [filter, setFilter] = useState<PatientFilter>('all');

  const reload = useCallback(() => setItems(listPatients(query)), [query]);
  useFocusEffect(reload);

  const withBalance = useMemo(
    () => items.map((p) => ({ p, bal: patientBalance(p.id) })),
    [items],
  );
  const visible = withBalance.filter(({ bal }) =>
    filter === 'debtor' ? bal > 0 : filter === 'settled' ? bal <= 0 : true,
  );
  const chips: ChipItem<PatientFilter>[] = [
    { key: 'all', label: 'همه', count: withBalance.length },
    { key: 'debtor', label: 'بدهکار', count: withBalance.filter(({ bal }) => bal > 0).length },
    { key: 'settled', label: 'تسویه‌شده', count: withBalance.filter(({ bal }) => bal <= 0).length },
  ];

  return (
    <Screen edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Text variant="title">بیماران</Text>
      </View>

      <View style={styles.search}>
        <Input
          placeholder="جستجو: نام، موبایل یا کد ملی"
          value={query}
          onChangeText={(v) => setQuery(v)}
        />
        <Button title="بیمار جدید" onPress={() => router.push('/(app)/patients/form')} />
      </View>

      <ChipBar items={chips} value={filter} onChange={setFilter} />

      <FlatList
        data={visible}
        keyExtractor={({ p }) => p.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<EmptyState message="بیماری یافت نشد. «بیمار جدید» را بزنید." />}
        renderItem={({ item: { p: item, bal } }) => {
          return (
            <ListRow
              title={fullName(item)}
              subtitle={item.mobile ? toPersianDigits(item.mobile) : 'بدون موبایل'}
              meta={`پروندهٔ شمارهٔ ${toPersianDigits(item.fileNumber)}`}
              right={bal > 0 ? <Pill tone="warning" label={formatToman(bal)} /> : undefined}
              onPress={() => router.push(`/(app)/patients/${item.id}`)}
            />
          );
        }}
      />
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
  search: { gap: spacing.md, marginBottom: spacing.md },
  list: { gap: spacing.md, paddingBottom: spacing.xl },
});
