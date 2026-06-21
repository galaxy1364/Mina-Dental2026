import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Card } from '@/design/components/Card';
import { Pill } from '@/design/components/Pill';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { Timeline } from '@/design/components/Timeline';
import { EmptyState } from '@/design/components/StateViews';
import { colors, radius, spacing } from '@/design/tokens';
import { TONE_COLORS } from '@/design/tone';
import {
  GENDER_LABELS,
  deletePatient,
  fullName,
  getPatient,
} from '@/features/patients/repository';
import { patientBalance } from '@/features/payments/repository';
import {
  buildPatientTimeline,
  computePatientAlerts,
  type JourneyAlert,
  type TimelineEvent,
} from '@/features/journey/engine';
import { formatToman, toPersianDigits } from '@/lib/persian';

const QUICK = [
  { label: '+ نوبت', route: 'appointments' },
  { label: '+ سفارش لابراتوار', route: 'labcases' },
  { label: '+ پرداخت', route: 'payments' },
  { label: '+ ایمپلنت', route: 'implants' },
] as const;

export default function PatientDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tick, setTick] = useState(0);
  const reload = useCallback(() => setTick((t) => t + 1), []);
  useFocusEffect(reload);

  const patient = id ? getPatient(id) : undefined;
  if (!patient) {
    return (
      <Screen>
        <Stack.Screen options={{ headerShown: false }} />
        <EmptyState message="بیمار یافت نشد." />
        <Button title="بازگشت" kind="secondary" onPress={() => router.back()} />
      </Screen>
    );
  }

  const balance = patientBalance(patient.id);
  const alerts: JourneyAlert[] = computePatientAlerts(patient.id);
  const timeline: TimelineEvent[] = buildPatientTimeline(patient.id);
  void tick;

  const onDelete = () => {
    Alert.alert('حذف بیمار', `«${fullName(patient)}» حذف شود؟ (حذف نرم — داده از بین نمی‌رود)`, [
      { text: 'انصراف', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: () => {
          deletePatient(patient.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="بازگشت ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title" style={styles.headerTitle}>
          {fullName(patient)}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <View style={styles.rowBetween}>
            <Pill tone="neutral" label={`پروندهٔ ${toPersianDigits(patient.fileNumber)}`} />
            <View style={styles.headerActions}>
              <Button
                title="ویرایش"
                kind="secondary"
                onPress={() => router.push(`/(app)/patients/form?id=${patient.id}`)}
              />
              <Button title="حذف" kind="danger" onPress={onDelete} />
            </View>
          </View>
          <View style={styles.info}>
            <InfoRow label="موبایل" value={patient.mobile ? toPersianDigits(patient.mobile) : '—'} />
            <InfoRow
              label="کد ملی"
              value={patient.nationalCode ? toPersianDigits(patient.nationalCode) : '—'}
            />
            <InfoRow label="جنسیت" value={patient.gender ? GENDER_LABELS[patient.gender] : '—'} />
            <InfoRow label="تاریخ تولد" value={patient.dob ? toPersianDigits(patient.dob) : '—'} />
          </View>
        </Card>

        <Card>
          <View style={styles.rowBetween}>
            <Text variant="subtitle">مالی</Text>
            <Pressable onPress={() => router.push(`/(app)/payments?patientId=${patient.id}`)}>
              <Text variant="caption" tone="primary">
                مشاهدهٔ صورتحساب ›
              </Text>
            </Pressable>
          </View>
          <Text variant="title" style={{ color: balance > 0 ? colors.warning : colors.success }}>
            {balance > 0 ? `بدهی: ${formatToman(balance)}` : 'تسویه'}
          </Text>
        </Card>

        <View style={styles.quick}>
          {QUICK.map((q) => (
            <Pressable
              key={q.route}
              style={styles.quickBtn}
              onPress={() => router.push(`/(app)/${q.route}/form?patientId=${patient.id}`)}
            >
              <Text variant="caption" tone="primary">
                {q.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {alerts.length > 0 ? (
          <Card>
            <Text variant="subtitle">کارهای بعدی</Text>
            <View style={styles.alerts}>
              {alerts.map((a) => (
                <View key={a.id} style={[styles.alert, { backgroundColor: TONE_COLORS[a.tone].bg }]}>
                  <Text variant="caption" style={{ color: TONE_COLORS[a.tone].fg }}>
                    {a.icon} {a.message}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        ) : null}

        <Card>
          <Text variant="subtitle">روند کار بیمار (تایم‌لاین)</Text>
          <View style={{ marginTop: spacing.md }}>
            <Timeline events={timeline} />
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text variant="caption" tone="muted">
        {label}
      </Text>
      <Text variant="body">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  headerTitle: { flexShrink: 1, textAlign: 'right' },
  content: { gap: spacing.lg, paddingBottom: spacing.xl },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerActions: { flexDirection: 'row', gap: spacing.sm },
  info: { marginTop: spacing.md, gap: spacing.sm },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  quick: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  quickBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  alerts: { marginTop: spacing.md, gap: spacing.sm },
  alert: { padding: spacing.md, borderRadius: radius.md },
});
