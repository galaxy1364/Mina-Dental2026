import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Input } from '@/design/components/Input';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { colors, spacing } from '@/design/tokens';
import { PatientPicker } from '@/features/patients/PatientPicker';
import { DoctorPicker } from '@/features/staff/DoctorPicker';
import {
  createImplant,
  getImplant,
  updateImplant,
} from '@/features/implants/repository';
import { isoToJalaliDate, parseJalaliToIso, todayJalali } from '@/lib/jalali';

export default function ImplantFormScreen() {
  const router = useRouter();
  const { id, patientId: patientIdParam } = useLocalSearchParams<{ id?: string; patientId?: string }>();
  const existing = useMemo(() => (id ? getImplant(id) : undefined), [id]);

  const [patientId, setPatientId] = useState<string | null>(
    existing?.patientId ?? patientIdParam ?? null,
  );
  const [doctorId, setDoctorId] = useState<string | null>(existing?.doctorId ?? null);
  const [brand, setBrand] = useState(existing?.brand ?? '');
  const [system, setSystem] = useState(existing?.system ?? '');
  const [toothNumber, setToothNumber] = useState(existing?.toothNumber ?? '');
  const [diameter, setDiameter] = useState(existing?.fixtureDiameter ?? '');
  const [length, setLength] = useState(existing?.fixtureLength ?? '');
  const [placedAt, setPlacedAt] = useState(
    existing?.placedAt ? isoToJalaliDate(existing.placedAt) : todayJalali(),
  );
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [error, setError] = useState<string | null>(null);

  const onSave = () => {
    setError(null);
    if (!patientId) return setError('انتخاب بیمار الزامی است.');
    if (!brand.trim()) return setError('برند ایمپلنت الزامی است.');
    const placedIso = placedAt.trim() ? parseJalaliToIso(placedAt) : null;
    if (placedAt.trim() && !placedIso) return setError('تاریخ کاشت معتبر نیست.');

    const payload = {
      patientId,
      doctorId,
      brand: brand.trim(),
      system: system.trim() || null,
      toothNumber: toothNumber.trim() || null,
      fixtureDiameter: diameter.trim() || null,
      fixtureLength: length.trim() || null,
      placedAt: placedIso,
      notes: notes.trim() || null,
    };
    if (existing) updateImplant(existing.id, payload);
    else createImplant(payload);
    router.back();
  };

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="انصراف ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">{existing ? 'ویرایش ایمپلنت' : 'ثبت ایمپلنت'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <PatientPicker value={patientId} onChange={(v) => setPatientId(v || null)} />
        <DoctorPicker value={doctorId} onChange={setDoctorId} />

        <Input label="برند" value={brand} onChangeText={setBrand} placeholder="مثلاً Dentium, SIC, Osstem" />
        <Input label="سیستم/لاین (اختیاری)" value={system} onChangeText={setSystem} />
        <Input label="شمارهٔ دندان (FDI)" value={toothNumber} onChangeText={setToothNumber} placeholder="مثلاً ۳۶" />
        <View style={styles.two}>
          <View style={styles.flex}>
            <Input label="قطر فیکسچر (mm)" value={diameter} onChangeText={setDiameter} placeholder="۴٫۰" />
          </View>
          <View style={styles.flex}>
            <Input label="طول فیکسچر (mm)" value={length} onChangeText={setLength} placeholder="۱۰" />
          </View>
        </View>
        <Input label="تاریخ کاشت (شمسی)" value={placedAt} onChangeText={setPlacedAt} placeholder="۱۴۰۴/۰۳/۲۷" />
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
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  form: { gap: spacing.lg, paddingBottom: spacing.xl },
  two: { flexDirection: 'row-reverse', gap: spacing.md },
  flex: { flex: 1 },
});
