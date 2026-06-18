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
import { listLabs } from '@/features/labs/repository';
import {
  LAB_CASE_STATUSES,
  LAB_CASE_STATUS_LABELS,
  createLabCase,
  getLabCase,
  updateLabCase,
  type LabCaseStatus,
} from '@/features/labCases/repository';
import { isoToJalaliDate, parseJalaliToIso } from '@/lib/jalali';
import { toEnglishDigits } from '@/lib/persian';

export default function LabCaseFormScreen() {
  const router = useRouter();
  const { id, patientId: patientIdParam } = useLocalSearchParams<{ id?: string; patientId?: string }>();
  const existing = useMemo(() => (id ? getLabCase(id) : undefined), [id]);
  const labs = useMemo(() => listLabs(), []);
  const labLabels = useMemo(() => Object.fromEntries(labs.map((l) => [l.id, l.name])), [labs]);

  const [patientId, setPatientId] = useState<string | null>(
    existing?.patientId ?? patientIdParam ?? null,
  );
  const [labId, setLabId] = useState<string | null>(existing?.labId ?? labs[0]?.id ?? null);
  const [doctorId, setDoctorId] = useState<string | null>(existing?.doctorId ?? null);
  const [title, setTitle] = useState(existing?.title ?? '');
  const [toothNumbers, setToothNumbers] = useState(existing?.toothNumbers ?? '');
  const [status, setStatus] = useState<LabCaseStatus>(existing?.status ?? 'ordered');
  const [sentAt, setSentAt] = useState(existing?.sentAt ? isoToJalaliDate(existing.sentAt) : '');
  const [dueAt, setDueAt] = useState(existing?.dueAt ? isoToJalaliDate(existing.dueAt) : '');
  const [price, setPrice] = useState(existing?.price != null ? String(existing.price) : '');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [error, setError] = useState<string | null>(null);

  const onSave = () => {
    setError(null);
    if (!patientId) return setError('انتخاب بیمار الزامی است.');
    if (!labId) return setError('انتخاب لابراتوار الزامی است.');
    if (!title.trim()) return setError('نوع کار (مثلاً روکش PFM) الزامی است.');

    const sentIso = sentAt.trim() ? parseJalaliToIso(sentAt) : null;
    if (sentAt.trim() && !sentIso) return setError('تاریخ ارسال معتبر نیست.');
    const dueIso = dueAt.trim() ? parseJalaliToIso(dueAt) : null;
    if (dueAt.trim() && !dueIso) return setError('تاریخ تحویل معتبر نیست.');

    const payload = {
      patientId,
      labId,
      doctorId,
      title: title.trim(),
      toothNumbers: toothNumbers.trim() || null,
      status,
      sentAt: sentIso,
      dueAt: dueIso,
      price: price.trim() ? Number(toEnglishDigits(price)) : null,
      notes: notes.trim() || null,
    };
    if (existing) updateLabCase(existing.id, payload);
    else createLabCase(payload);
    router.back();
  };

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="انصراف ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">{existing ? 'ویرایش سفارش' : 'سفارش لابراتوار'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <PatientPicker value={patientId} onChange={(v) => setPatientId(v || null)} />

        <View>
          <Text variant="caption" tone="secondary" style={styles.label}>
            لابراتوار
          </Text>
          {labs.length === 0 ? (
            <Text variant="caption" tone="muted" style={styles.label}>
              ابتدا یک لابراتوار اضافه کنید.
            </Text>
          ) : (
            <Chips
              options={labs.map((l) => l.id)}
              value={labId ?? labs[0].id}
              labels={labLabels}
              onChange={setLabId}
            />
          )}
        </View>

        <DoctorPicker value={doctorId} onChange={setDoctorId} />

        <Input label="نوع کار" value={title} onChangeText={setTitle} placeholder="مثلاً روکش PFM، پروتز کامل" />
        <Input label="شمارهٔ دندان‌ها (اختیاری)" value={toothNumbers} onChangeText={setToothNumbers} placeholder="مثلاً ۱۱، ۱۲، ۲۱" />

        <View>
          <Text variant="caption" tone="secondary" style={styles.label}>
            وضعیت
          </Text>
          <Chips
            options={LAB_CASE_STATUSES}
            value={status}
            labels={LAB_CASE_STATUS_LABELS}
            onChange={setStatus}
          />
        </View>

        <View style={styles.two}>
          <View style={styles.flex}>
            <Input label="تاریخ ارسال (شمسی)" value={sentAt} onChangeText={setSentAt} placeholder="۱۴۰۴/۰۳/۲۷" />
          </View>
          <View style={styles.flex}>
            <Input label="تاریخ تحویل (شمسی)" value={dueAt} onChangeText={setDueAt} placeholder="۱۴۰۴/۰۴/۰۵" />
          </View>
        </View>

        <Input label="هزینهٔ لابراتوار (تومان)" value={price} onChangeText={setPrice} keyboardType="number-pad" />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  form: { gap: spacing.lg, paddingBottom: spacing.xl },
  label: { textAlign: 'right', marginBottom: spacing.sm },
  two: { flexDirection: 'row-reverse', gap: spacing.md },
  flex: { flex: 1 },
});
