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
import { spacing, tile } from '@/design/tokens';
import type { Tone } from '@/design/tone';
import {
  LAB_CASE_STATUS_LABELS,
  isOpen,
  listLabCases,
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

type Filter = 'all' | 'open' | 'overdue' | 'ready' | 'delivered';

function isOverdue(c: LabCase): boolean {
  return isOpen(c.status) && c.dueAt != null && new Date(c.dueAt) < new Date();
}

function matchesFilter(c: LabCase, f: Filter): boolean {
  switch (f) {
    case 'open':
      return isOpen(c.status);
    case 'overdue':
      return isOverdue(c);
    case 'ready':
      return c.status === 'ready';
    case 'delivered':
      return c.status === 'delivered';
    default:
      return true;
  }
}

export default function LabCasesScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('open');
  const [items, setItems] = useState<LabCase[]>([]);

  const reload = useCallback(() => setItems(listLabCases()), []);
  useFocusEffect(reload);

  const visible = items.filter((c) => matchesFilter(c, filter));
  const chips: ChipItem<Filter>[] = [
    { key: 'all', label: 'همه', count: items.length },
    { key: 'open', label: 'در جریان', count: items.filter((c) => matchesFilter(c, 'open')).length },
    { key: 'overdue', label: 'معوق', count: items.filter(isOverdue).length },
    { key: 'ready', label: 'آماده', count: items.filter((c) => matchesFilter(c, 'ready')).length },
    { key: 'delivered', label: 'تحویل‌شده', count: items.filter((c) => matchesFilter(c, 'delivered')).length },
  ];

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="بازگشت ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">سفارش‌های لابراتوار</Text>
      </View>

      <View style={styles.actions}>
        <Button title="سفارش جدید" onPress={() => router.push('/(app)/labcases/form')} />
      </View>

      <ChipBar items={chips} value={filter} onChange={setFilter} />

      <ScrollView contentContainerStyle={styles.list}>
        {visible.length === 0 ? (
          <EmptyState message="سفارشی برای نمایش نیست." />
        ) : (
          visible.map((c) => {
            const p = getPatient(c.patientId);
            const lab = getLab(c.labId);
            const overdue = isOpen(c.status) && c.dueAt != null && new Date(c.dueAt) < new Date();
            return (
              <ListRow
                key={c.id}
                icon="flask"
                iconColor={tile.labcases}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  list: { gap: spacing.md, paddingBottom: spacing.xl },
});
