import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Chips } from '@/design/components/Chips';
import { Input } from '@/design/components/Input';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { colors, spacing } from '@/design/tokens';
import {
  GENDER_LABELS,
  createPatient,
  getPatient,
  updatePatient,
  type Gender,
} from '@/features/patients/repository';
import {
  isValidIranianMobile,
  isValidNationalCode,
  normalizeMobile,
  toEnglishDigits,
} from '@/lib/persian';

const GENDERS: Gender[] = ['male', 'female', 'other'];

export default function PatientFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const existing = useMemo(() => (id ? getPatient(id) : undefined), [id]);

  const [firstName, setFirstName] = useState(existing?.firstName ?? '');
  const [lastName, setLastName] = useState(existing?.lastName ?? '');
  const [mobile, setMobile] = useState(existing?.mobile ?? '');
  const [nationalCode, setNationalCode] = useState(existing?.nationalCode ?? '');
  const [gender, setGender] = useState<Gender>(existing?.gender ?? 'male');
  const [dob, setDob] = useState(existing?.dob ?? '');
  const [error, setError] = useState<string | null>(null);

  const onSave = () => {
    setError(null);
    if (!firstName.trim()) return setError('نام الزامی است.');
    if (!lastName.trim()) return setError('نام خانوادگی الزامی است.');
    if (mobile && !isValidIranianMobile(mobile)) return setError('شمارهٔ موبایل معتبر نیست.');
    if (nationalCode && !isValidNationalCode(nationalCode)) return setError('کد ملی معتبر نیست.');

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      mobile: mobile ? normalizeMobile(mobile) : null,
      nationalCode: nationalCode ? toEnglishDigits(nationalCode) : null,
      gender,
      dob: dob ? toEnglishDigits(dob) : null,
    };

    if (existing) updatePatient(existing.id, payload);
    else createPatient(payload);
    router.back();
  };

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="انصراف ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">{existing ? 'ویرایش بیمار' : 'بیمار جدید'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <Input label="نام" value={firstName} onChangeText={setFirstName} />
        <Input label="نام خانوادگی" value={lastName} onChangeText={setLastName} />

        <View>
          <Text variant="caption" tone="secondary" style={styles.label}>
            جنسیت
          </Text>
          <Chips options={GENDERS} value={gender} labels={GENDER_LABELS} onChange={setGender} />
        </View>

        <Input
          label="موبایل"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          placeholder="09xxxxxxxxx"
        />
        <Input label="کد ملی" value={nationalCode} onChangeText={setNationalCode} keyboardType="number-pad" />
        <Input
          label="تاریخ تولد (شمسی)"
          value={dob}
          onChangeText={setDob}
          placeholder="۱۳۷۰/۰۵/۱۲"
          keyboardType="number-pad"
        />

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
  label: { textAlign: 'right', marginBottom: spacing.sm },
});
