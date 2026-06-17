import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Card } from '@/design/components/Card';
import { ListRow } from '@/design/components/ListRow';
import { Pill } from '@/design/components/Pill';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { EmptyState } from '@/design/components/StateViews';
import { colors, spacing } from '@/design/tokens';
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

export default function PaymentsScreen() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams<{ patientId?: string }>();
  const [items, setItems] = useState<Payment[]>([]);

  const reload = useCallback(() => {
    setItems(patientId ? listPaymentsForPatient(patientId) : listRecentPayments());
  }, [patientId]);
  useFocusEffect(reload);

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
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="بازگشت ›" kind="ghost" onPress={() => router.back()} />
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

      <ScrollView contentContainerStyle={styles.list}>
        {items.length === 0 ? (
          <EmptyState message="تراکنشی ثبت نشده است." />
        ) : (
          items.map((p) => {
            const pt = getPatient(p.patientId);
            return (
              <ListRow
                key={p.id}
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  actions: { marginVertical: spacing.md },
  list: { gap: spacing.md, paddingBottom: spacing.xl },
});
