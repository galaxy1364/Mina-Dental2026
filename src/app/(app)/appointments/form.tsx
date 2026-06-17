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
  APPOINTMENT_STATUS_LABELS,
  APPOINTMENT_STATUSES,
  createAppointment,
  getAppointment,
  updateAppointment,
  type AppointmentStatus,
} from '@/features/appointments/repository';
import { isoToJalaliDate, isoToTime, parseJalaliToIso, todayJalali } from '@/lib/jalali';
import { toEnglishDigits } from '@/lib/persian';

export default function AppointmentFormScreen() {
  const router = useRouter();
  const { id, patientId: patientIdParam } = useLocalSearchParams<{ id?: string; patientId?: string }>();
  const existing = useMemo(() => (id ? getAppointment(id) : undefined), [id]);

  const [patientId, setPatientId] = useState<string | null>(
    existing?.patientId ?? patientIdParam ?? null,
  );
  const [doctorId, setDoctorId] = useState<string | null>(existing?.doctorId ?? null);
  const [date, setDate] = useState(existing ? isoToJalaliDate(existing.startTime) : todayJalali());
  const [start, setStart] = useState(existing ? isoToTime(existing.startTime) : '09:00');
  const [duration, setDuration] = useState(
    existing ? String(durationMinutes(existing.startTime, existing.endTime)) : '30',
  );
  const [unit, setUnit] = useState(existing?.unit ?? '');
  const [status, setStatus] = useState<AppointmentStatus>(existing?.status ?? 'scheduled');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [error, setError] = useState<string | null>(null);

  const onSave = () => {
    setError(null);
    if (!patientId) return setError('انتخاب بیمار الزامی است.');
    const startIso = parseJalaliToIso(date, start);
    if (!startIso) return setError('تاریخ یا ساعت معتبر نیست. نمونه: ۱۴۰۴/۰۳/۲۷ و ۰۹:۰۰');
    const hour = new Date(startIso).getHours();
    if (hour < 8) return setError('ساعت کاری کلینیک از ۸ صبح است.');
    const dur = Number(toEnglishDigits(duration)) || 30;
    const endIso = new Date(new Date(startIso).getTime() + dur * 60000).toISOString();

    const payload = {
      patientId,
      doctorId,
      unit: unit.trim() || null,
      startTime: startIso,
      endTime: endIso,
      status,
      notes: notes.trim() || null,
    };
    if (existing) updateAppointment(existing.id, payload);
    else createAppointment(payload);
    router.back();
  };

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="انصراف ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">{existing ? 'ویرایش نوبت' : 'نوبت جدید'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <PatientPicker value={patientId} onChange={(v) => setPatientId(v || null)} />
        <DoctorPicker value={doctorId} onChange={setDoctorId} />

        <Input label="تاریخ (شمسی)" value={date} onChangeText={setDate} keyboardType="numbers-and-punctuation" placeholder="۱۴۰۴/۰۳/۲۷" />
        <View style={styles.two}>
          <View style={styles.flex}>
            <Input label="ساعت شروع" value={start} onChangeText={setStart} placeholder="۰۹:۰۰" />
          </View>
          <View style={styles.flex}>
            <Input label="مدت (دقیقه)" value={duration} onChangeText={setDuration} keyboardType="number-pad" />
          </View>
        </View>
        <Input label="یونیت/اتاق (اختیاری)" value={unit} onChangeText={setUnit} />

        <View>
          <Text variant="caption" tone="secondary" style={styles.label}>
            وضعیت
          </Text>
          <Chips
            options={APPOINTMENT_STATUSES}
            value={status}
            labels={APPOINTMENT_STATUS_LABELS}
            onChange={setStatus}
          />
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

function durationMinutes(startIso: string, endIso: string): number {
  const m = Math.round((new Date(endIso).getTime() - new Date(startIso).getTime()) / 60000);
  return m > 0 ? m : 30;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  form: { gap: spacing.lg, paddingBottom: spacing.xl },
  label: { textAlign: 'right', marginBottom: spacing.sm },
  two: { flexDirection: 'row-reverse', gap: spacing.md },
  flex: { flex: 1 },
});
