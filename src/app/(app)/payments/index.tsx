import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Card } from '@/design/components/Card';
import { ChipBar, type ChipItem } from '@/design/components/ChipBar';
import { ListRow } from '@/design/components/ListRow';
import { Pill } from '@/design/components/Pill';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { EmptyState } from '@/design/components/StateViews';
import { colors, spacing, tile } from '@/design/tokens';
import {
  PAYMENT_DIRECTION_LABELS,
  deletePayment,
  listPaymentsForPatient,
  listRecentPayments,
  patientBalance,
  totalOutstanding,
  type Payment,
} from '@/features/payments/repository';
import { fullName, getPatient } from '@/features/patients/repository';
import { formatJalali } from '@/lib/jalali';
import { formatToman } from '@/lib/persian';

type PayFilter = 'all' | 'payment' | 'charge';

export default function PaymentsScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams<{ patientId?: string }>();
  const [items, setItems] = useState<Payment[]>([]);
  const [filter, setFilter] = useState<PayFilter>('all');

  const reload = useCallback(() => {
    setItems(patientId ? listPaymentsForPatient(patientId) : listRecentPayments());
  }, [patientId]);
  useFocusEffect(reload);

  const visible = items.filter((p) => filter === 'all' || p.direction === filter);
  const chips: ChipItem<PayFilter>[] = [
    { key: 'all', label: 'همه', count: items.length },
    { key: 'payment', label: 'دریافت', count: items.filter((p) => p.direction === 'payment').length },
    { key: 'charge', label: 'بدهکاری', count: items.filter((p) => p.direction === 'charge').length },
  ];

  const patient = patientId ? getPatient(patientId) : undefined;
  const balance = patientId ? patientBalance(patientId) : totalOutstanding();

  const onDelete = (p: Payment) => {
    Alert.alert('حذف تراکنش', 'این تراکنش حذف شود؟ (حذف نرم)', [
      { text: 'انصراف', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: () => { deletePayment(p.id); reload(); } },
    ]);
  };

  const openNew = () => {
    if (patientId) router.push(`/(app)/payments/form?patientId=${patientId}`);
    else router.push('/(app)/payments/form');
  };

  return (
    <Screen edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, patientId ? styles.headerWithBack : styles.headerPlain]}>
        {patientId ? (
          <Button title="بازگشت ›" kind="ghost" onPress={() => router.back()} />
        ) : null}
        <Text variant="title">{patient ? `صورتحساب ${fullName(patient)}` : 'مالی کلینیک'}</Text>
      </View>

      <Card>
        <Text variant="caption" tone="secondary">
          {patient ? 'مانده‌حساب بیمار' : 'مجموع مطالبات کلینیک'}
        </Text>
        <Text variant="title" style={{ color: balance > 0 ? colors.warning : colors.success }}>
          {balance > 0 ? formatToman(balance) : 'تسویه'}
        </Text>
      </Card>

      <View style={styles.actions}>
        <Button title="ثبت تراکنش جدید" onPress={openNew} />
      </View>

      <ChipBar items={chips} value={filter} onChange={setFilter} />

      <ScrollView contentContainerStyle={styles.list}>
        {visible.length === 0 ? (
          <EmptyState message="تراکنشی ثبت نشده است." />
        ) : (
          visible.map((p) => {
            const pt = getPatient(p.patientId);
            return (
              <ListRow
                key={p.id}
                icon="wallet"
                iconColor={p.direction === 'payment' ? colors.success : tile.finance}
                title={`${PAYMENT_DIRECTION_LABELS[p.direction]} — ${formatToman(p.amount)}`}
                subtitle={!patientId && pt ? fullName(pt) : (p.description ?? undefined)}
                meta={formatJalali(p.paidAt)}
                right={
                  <Pill
                    tone={p.direction === 'payment' ? 'success' : 'warning'}
                    label={p.direction === 'payment' ? 'دریافت' : 'بدهی'}
                  />
                }
                onPress={() => onDelete(p)}
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
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  // Back button present: back at the left edge, title at the right (RTL).
  headerWithBack: { flexDirection: 'row-reverse', justifyContent: 'space-between' },
  // Title only: keep it right-anchored in the RTL context.
  headerPlain: { flexDirection: 'row', justifyContent: 'flex-start' },
  actions: { marginVertical: spacing.md },
  list: { gap: spacing.md, paddingBottom: spacing.xl },
});
