import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Chips } from '@/design/components/Chips';
import { Input } from '@/design/components/Input';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { colors, spacing } from '@/design/tokens';
import { PatientPicker } from '@/features/patients/PatientPicker';
import { DoctorPicker } from '@/features/staff/DoctorPicker';
import {
  PAYMENT_DIRECTION_LABELS,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  createPayment,
  getPayment,
  updatePayment,
  type PaymentDirection,
  type PaymentMethod,
} from '@/features/payments/repository';
import { isoToJalaliDate, isoToTime, nowIso, parseJalaliToIso, todayJalali } from '@/lib/jalali';
import { formatToman, toEnglishDigits } from '@/lib/persian';

const DIRECTIONS: PaymentDirection[] = ['charge', 'payment'];

export default function PaymentFormScreen() {
  const router = useRouter();
  const { id, patientId: patientIdParam } = useLocalSearchParams<{ id?: string; patientId?: string }>();
  const existing = useMemo(() => (id ? getPayment(id) : undefined), [id]);

  const [patientId, setPatientId] = useState<string | null>(
    existing?.patientId ?? patientIdParam ?? null,
  );
  const [direction, setDirection] = useState<PaymentDirection>(existing?.direction ?? 'payment');
  const [amount, setAmount] = useState(existing?.amount != null ? String(existing.amount) : '');
  const [method, setMethod] = useState<PaymentMethod>(existing?.method ?? 'cash');
  const [doctorId, setDoctorId] = useState<string | null>(existing?.doctorId ?? null);
  const [date, setDate] = useState(existing ? isoToJalaliDate(existing.paidAt) : todayJalali());
  const [time] = useState(existing ? isoToTime(existing.paidAt) : isoToTime(nowIso()));
  const [description, setDescription] = useState(existing?.description ?? '');
  const [error, setError] = useState<string | null>(null);

  const amountNum = Number(toEnglishDigits(amount)) || 0;

  const onSave = () => {
    setError(null);
    if (!patientId) return setError('انتخاب بیمار الزامی است.');
    if (amountNum <= 0) return setError('مبلغ باید بزرگ‌تر از صفر باشد.');
    const paidAt = parseJalaliToIso(date, time);
    if (!paidAt) return setError('تاریخ معتبر نیست.');

    const payload = {
      patientId,
      direction,
      amount: amountNum,
      method: direction === 'payment' ? method : null,
      doctorId,
      description: description.trim() || null,
      paidAt,
    };
    if (existing) updatePayment(existing.id, payload);
    else createPayment(payload);
    router.back();
  };

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="انصراف ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">{existing ? 'ویرایش تراکنش' : 'تراکنش مالی'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <PatientPicker value={patientId} onChange={(v) => setPatientId(v || null)} />

        <View>
          <Text variant="caption" tone="secondary" style={styles.label}>
            نوع
          </Text>
          <Chips
            options={DIRECTIONS}
            value={direction}
            labels={PAYMENT_DIRECTION_LABELS}
            onChange={setDirection}
          />
        </View>

        <Input label="مبلغ (تومان)" value={amount} onChangeText={setAmount} keyboardType="number-pad" />
        {amountNum > 0 ? (
          <Text variant="caption" tone="muted" style={styles.label}>
            {formatToman(amountNum)}
          </Text>
        ) : null}

        {direction === 'payment' ? (
          <View>
            <Text variant="caption" tone="secondary" style={styles.label}>
              روش پرداخت
            </Text>
            <Chips
              options={PAYMENT_METHODS}
              value={method}
              labels={PAYMENT_METHOD_LABELS}
              onChange={setMethod}
            />
          </View>
        ) : (
          <DoctorPicker value={doctorId} onChange={setDoctorId} label="پزشک (برای محاسبهٔ سهم)" />
        )}

        <Input label="تاریخ (شمسی)" value={date} onChangeText={setDate} placeholder="۱۴۰۴/۰۳/۲۷" />
        <Input label="توضیح" value={description} onChangeText={setDescription} multiline />

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  form: { gap: spacing.lg, paddingBottom: spacing.xl },
  label: { textAlign: 'right', marginBottom: spacing.sm },
});
