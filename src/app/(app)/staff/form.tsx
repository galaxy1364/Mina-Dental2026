import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Input } from '@/design/components/Input';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { colors, radius, spacing } from '@/design/tokens';
import {
  COMMISSION_MODEL_LABELS,
  STAFF_ROLE_LABELS,
  createStaff,
  getStaff,
  updateStaff,
  type CommissionModel,
  type StaffRole,
} from '@/features/staff/repository';
import { isValidIranianMobile, isValidNationalCode, normalizeMobile, toEnglishDigits } from '@/lib/persian';
import { useAuth } from '@/features/auth/useAuth';
import { EmptyState } from '@/design/components/StateViews';

const ROLES: StaffRole[] = ['doctor', 'secretary', 'assistant', 'manager'];
const MODELS: CommissionModel[] = ['none', 'fixed_50', 'percentage', 'advanced'];

function Chips<T extends string>({
  options,
  value,
  labels,
  onChange,
}: {
  options: T[];
  value: T;
  labels: Record<T, string>;
  onChange: (v: T) => void;
}) {
  return (
    <View style={styles.chips}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text variant="caption" tone={active ? 'onPrimary' : 'secondary'}>
              {labels[opt]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function StaffFormScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const isManager = session?.role === 'manager';
  const { id } = useLocalSearchParams<{ id?: string }>();
  const existing = useMemo(() => (id ? getStaff(id) : undefined), [id]);

  const [fullName, setFullName] = useState(existing?.fullName ?? '');
  const [role, setRole] = useState<StaffRole>(existing?.role ?? 'doctor');
  const [mobile, setMobile] = useState(existing?.mobile ?? '');
  const [nationalCode, setNationalCode] = useState(existing?.nationalCode ?? '');
  const [commissionModel, setCommissionModel] = useState<CommissionModel>(
    existing?.commissionModel ?? 'none',
  );
  const [commissionPercent, setCommissionPercent] = useState(
    existing?.commissionPercent != null ? String(existing.commissionPercent) : '',
  );
  const [active, setActive] = useState(existing?.active ?? true);
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [error, setError] = useState<string | null>(null);

  const isDoctor = role === 'doctor';

  const onSave = () => {
    setError(null);
    if (!fullName.trim()) return setError('نام و نام خانوادگی الزامی است.');
    if (mobile && !isValidIranianMobile(mobile)) return setError('شمارهٔ موبایل معتبر نیست.');
    if (nationalCode && !isValidNationalCode(nationalCode))
      return setError('کد ملی معتبر نیست.');

    let percent: number | null = null;
    if (isDoctor && commissionModel === 'percentage') {
      if (!commissionPercent.trim()) return setError('درصد سهم الزامی است.');
      const p = Number(toEnglishDigits(commissionPercent));
      if (!Number.isFinite(p) || p < 0 || p > 100)
        return setError('درصد سهم باید بین ۰ تا ۱۰۰ باشد.');
      percent = Math.round(p);
    }

    const payload = {
      fullName: fullName.trim(),
      role,
      mobile: mobile ? normalizeMobile(mobile) : null,
      nationalCode: nationalCode ? toEnglishDigits(nationalCode) : null,
      commissionModel: isDoctor ? commissionModel : 'none',
      commissionPercent: percent,
      active,
      notes: notes.trim() || null,
    };

    if (existing) updateStaff(existing.id, payload);
    else createStaff(payload);
    router.back();
  };

  if (!isManager) {
    return (
      <Screen>
        <Stack.Screen options={{ headerShown: false }} />
        <EmptyState message="فقط مدیر می‌تواند کادر درمان را اضافه یا ویرایش کند." />
        <View style={styles.guard}>
          <Button title="بازگشت" kind="secondary" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text variant="body" tone="primary">
            ← انصراف
          </Text>
        </Pressable>
        <Text variant="title">{existing ? 'ویرایش کارمند' : 'کارمند جدید'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Input label="نام و نام خانوادگی" value={fullName} onChangeText={setFullName} />

        <View>
          <Text variant="caption" tone="secondary" style={styles.label}>
            نقش
          </Text>
          <Chips options={ROLES} value={role} labels={STAFF_ROLE_LABELS} onChange={setRole} />
        </View>

        <Input
          label="موبایل"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          placeholder="09xxxxxxxxx"
        />
        <Input
          label="کد ملی"
          value={nationalCode}
          onChangeText={setNationalCode}
          keyboardType="number-pad"
        />

        {isDoctor ? (
          <View>
            <Text variant="caption" tone="secondary" style={styles.label}>
              مدل سهم‌بندی
            </Text>
            <Chips
              options={MODELS}
              value={commissionModel}
              labels={COMMISSION_MODEL_LABELS}
              onChange={setCommissionModel}
            />
            {commissionModel === 'percentage' ? (
              <Input
                label="درصد سهم (٪)"
                value={commissionPercent}
                onChangeText={setCommissionPercent}
                keyboardType="number-pad"
              />
            ) : null}
          </View>
        ) : null}

        <View style={styles.switchRow}>
          <Text variant="body" tone="secondary">
            فعال
          </Text>
          <Switch value={active} onValueChange={setActive} />
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

const styles = StyleSheet.create({
  header: { gap: spacing.xs, marginBottom: spacing.md },
  guard: { padding: spacing.lg },
  form: { gap: spacing.lg, paddingBottom: spacing.xl },
  label: { textAlign: 'right', marginBottom: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
