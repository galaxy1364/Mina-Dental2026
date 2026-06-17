import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Chips } from '@/design/components/Chips';
import { ListRow } from '@/design/components/ListRow';
import { Pill } from '@/design/components/Pill';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { EmptyState } from '@/design/components/StateViews';
import { spacing } from '@/design/tokens';
import type { Tone } from '@/design/tone';
import {
  LAB_CASE_STATUS_LABELS,
  isOpen,
  listLabCases,
  listOpenLabCases,
  type LabCase,
  type LabCaseStatus,
} from '@/features/labCases/repository';
import { fullName, getPatient } from '@/features/patients/repository';
import { getLab } from '@/features/labs/repository';
import { formatJalali } from '@/lib/jalali';

const STATUS_TONE: Record<LabCaseStatus, Tone> = {
  ordered: 'info',
  in_lab: 'warning',
  ready: 'warning',
  delivered: 'success',
  returned: 'danger',
  cancelled: 'neutral',
};

type Filter = 'open' | 'all';
const FILTER_LABELS: Record<Filter, string> = { open: 'در جریان', all: 'همه' };

export default function LabCasesScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('open');
  const [items, setItems] = useState<LabCase[]>([]);

  const reload = useCallback(
    () => setItems(filter === 'open' ? listOpenLabCases() : listLabCases()),
    [filter],
  );
  useFocusEffect(reload);

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="بازگشت ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">سفارش‌های لابراتوار</Text>
      </View>

      <View style={styles.actions}>
        <Chips
          options={['open', 'all']}
          value={filter}
          labels={FILTER_LABELS}
          onChange={setFilter}
        />
        <Button title="سفارش جدید" onPress={() => router.push('/(app)/labcases/form')} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {items.length === 0 ? (
          <EmptyState message="سفارشی برای نمایش نیست." />
        ) : (
          items.map((c) => {
            const p = getPatient(c.patientId);
            const lab = getLab(c.labId);
            const overdue = isOpen(c.status) && c.dueAt != null && new Date(c.dueAt) < new Date();
            return (
              <ListRow
                key={c.id}
                title={`${c.title} — ${lab?.name ?? 'لابراتوار'}`}
                subtitle={p ? fullName(p) : undefined}
                meta={c.dueAt ? `تحویل: ${formatJalali(c.dueAt)}${overdue ? ' (معوق)' : ''}` : undefined}
                right={
                  <Pill
                    tone={overdue ? 'danger' : STATUS_TONE[c.status]}
                    label={overdue ? 'معوق' : LAB_CASE_STATUS_LABELS[c.status]}
                  />
                }
                onPress={() => router.push(`/(app)/labcases/form?id=${c.id}`)}
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  list: { gap: spacing.md, paddingBottom: spacing.xl },
});
