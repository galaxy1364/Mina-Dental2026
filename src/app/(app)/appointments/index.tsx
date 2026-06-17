import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { ListRow } from '@/design/components/ListRow';
import { Pill } from '@/design/components/Pill';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { EmptyState } from '@/design/components/StateViews';
import { spacing } from '@/design/tokens';
import type { Tone } from '@/design/tone';
import {
  APPOINTMENT_STATUS_LABELS,
  listAppointmentsForDay,
  type Appointment,
  type AppointmentStatus,
} from '@/features/appointments/repository';
import { fullName, getPatient } from '@/features/patients/repository';
import { staffName } from '@/features/staff/repository';
import { formatJalali, isoToTime, jalaliWeekday } from '@/lib/jalali';
import { toPersianDigits } from '@/lib/persian';

const STATUS_TONE: Record<AppointmentStatus, Tone> = {
  scheduled: 'info',
  confirmed: 'info',
  arrived: 'warning',
  in_progress: 'warning',
  completed: 'success',
  no_show: 'danger',
  cancelled: 'danger',
};

export default function AppointmentsScreen() {
  const router = useRouter();
  const [day, setDay] = useState(() => new Date());
  const [items, setItems] = useState<Appointment[]>([]);

  const reload = useCallback(() => setItems(listAppointmentsForDay(day)), [day]);
  useFocusEffect(reload);

  const shift = (delta: number) => {
    const d = new Date(day);
    d.setDate(d.getDate() + delta);
    setDay(d);
  };

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="بازگشت ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">نوبت‌دهی</Text>
      </View>

      <View style={styles.dateNav}>
        <Button title="‹ روز قبل" kind="secondary" onPress={() => shift(-1)} />
        <View style={styles.dateCenter}>
          <Text variant="subtitle">{formatJalali(day)}</Text>
          <Text variant="caption" tone="secondary">
            {jalaliWeekday(day)}
          </Text>
        </View>
        <Button title="روز بعد ›" kind="secondary" onPress={() => shift(1)} />
      </View>

      <View style={styles.actions}>
        <Button title="امروز" kind="ghost" onPress={() => setDay(new Date())} />
        <Button title="نوبت جدید" onPress={() => router.push('/(app)/appointments/form')} />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {items.length === 0 ? (
          <EmptyState message="برای این روز نوبتی ثبت نشده است." />
        ) : (
          items.map((a) => {
            const p = getPatient(a.patientId);
            const doctor = staffName(a.doctorId);
            return (
              <ListRow
                key={a.id}
                title={`${toPersianDigits(isoToTime(a.startTime))} — ${p ? fullName(p) : 'بیمار'}`}
                subtitle={doctor ?? undefined}
                meta={a.unit ? `یونیت ${a.unit}` : undefined}
                right={<Pill tone={STATUS_TONE[a.status]} label={APPOINTMENT_STATUS_LABELS[a.status]} />}
                onPress={() => router.push(`/(app)/appointments/form?id=${a.id}`)}
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
  dateNav: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  dateCenter: { alignItems: 'center', gap: spacing.xs },
  actions: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  list: { gap: spacing.md, paddingBottom: spacing.xl },
});
