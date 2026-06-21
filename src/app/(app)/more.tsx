import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { eq, sql } from 'drizzle-orm';
import { Button } from '@/design/components/Button';
import { Card } from '@/design/components/Card';
import { IconTile } from '@/design/components/IconTile';
import { FadeInUp } from '@/design/motion';
import { Screen } from '@/design/components/Screen';
import { StatusBadge } from '@/design/components/StateViews';
import { Text } from '@/design/components/Text';
import { colors, radius, spacing, tile } from '@/design/tokens';
import { db } from '@/core/db/client';
import { appBootAudit, localMeta } from '@/core/db/schema';
import { getSyncSnapshot, processQueue, retryFailed } from '@/core/sync/syncEngine';
import { useAuth } from '@/features/auth/useAuth';
import { toPersianDigits } from '@/lib/persian';
import type { IconName } from '@/design/icons/Icon';

interface Health {
  schemaVersion: string;
  bootCount: number;
  pending: number;
  online: boolean;
  configured: boolean;
  failed: number;
}

function readHealth(): Health {
  const version = db.select().from(localMeta).where(eq(localMeta.key, 'schema_version')).get();
  const boots = db.select({ c: sql<number>`count(*)` }).from(appBootAudit).get();
  const snap = getSyncSnapshot();
  return {
    schemaVersion: version?.value ?? '—',
    bootCount: boots?.c ?? 0,
    pending: snap.pending,
    online: snap.online,
    configured: snap.configured,
    failed: snap.failed,
  };
}

interface Section {
  label: string;
  icon: IconName;
  color: string;
  route: string;
}

const SECTIONS: Section[] = [
  { label: 'بیماران', icon: 'tooth', color: tile.patients, route: '/(app)/patients' },
  { label: 'نوبت‌دهی', icon: 'appointment', color: tile.appointments, route: '/(app)/appointments' },
  { label: 'تقویم', icon: 'calendar', color: tile.calendar, route: '/(app)/calendar' },
  { label: 'لابراتوار', icon: 'flask', color: tile.labcases, route: '/(app)/labcases' },
  { label: 'ایمپلنت', icon: 'implant', color: tile.implants, route: '/(app)/implants' },
  { label: 'مالی', icon: 'wallet', color: tile.finance, route: '/(app)/payments' },
  { label: 'کادر درمان', icon: 'users', color: tile.staff, route: '/(app)/staff' },
  { label: 'لابراتوارها', icon: 'building', color: tile.labs, route: '/(app)/labs' },
];

export default function MoreScreen() {
  const router = useRouter();
  const { session, signOut } = useAuth();
  const [health, setHealth] = useState<Health>(() => readHealth());

  const refresh = useCallback(() => setHealth(readHealth()), []);
  useFocusEffect(refresh);

  return (
    <Screen edges={['top']} padded={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="title">خدمات</Text>

        <Card>
          <Text variant="subtitle" style={styles.cardTitle}>
            بخش‌ها
          </Text>
          <View style={styles.grid}>
            {SECTIONS.map((s, i) => (
              <FadeInUp key={s.label} index={i} style={styles.cell}>
                <IconTile
                  label={s.label}
                  icon={s.icon}
                  color={s.color}
                  size={58}
                  onPress={() => router.push(s.route as never)}
                />
              </FadeInUp>
            ))}
          </View>
        </Card>

        <Card>
          <Text variant="subtitle" style={styles.cardTitle}>
            حساب کاربری
          </Text>
          <View style={styles.accountRow}>
            <View>
              <Text variant="body">{session?.displayName ?? session?.email ?? 'کاربر'}</Text>
              {session?.email ? (
                <Text variant="caption" tone="muted">
                  {session.email}
                </Text>
              ) : null}
            </View>
            <View style={styles.roleChip}>
              <Text variant="caption" style={{ color: colors.primaryDark }}>
                {roleLabel(session?.role)}
              </Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text variant="subtitle" style={styles.cardTitle}>
            وضعیت سامانه
          </Text>
          <Row label="اتصال">
            <StatusBadge tone={health.online ? 'synced' : 'offline'} label={health.online ? 'آنلاین' : 'آفلاین'} />
          </Row>
          <Row label="صف همگام‌سازی">
            <StatusBadge
              tone={health.pending > 0 ? 'pendingSync' : 'synced'}
              label={health.pending > 0 ? `${toPersianDigits(health.pending)} در انتظار` : 'همگام'}
            />
          </Row>
          {health.failed > 0 ? (
            <Row label="ناموفق (نیازمند تلاش مجدد)">
              <StatusBadge tone="conflict" label={`${toPersianDigits(health.failed)} رکورد`} />
            </Row>
          ) : null}
          <Row label="سرویس ابری">
            <StatusBadge
              tone={health.configured ? 'synced' : 'offline'}
              label={health.configured ? 'پیکربندی‌شده' : 'پیکربندی‌نشده'}
            />
          </Row>
          <Row label="پایگاه‌دادهٔ محلی">
            <Text variant="caption" tone="muted">
              نسخهٔ شِما {toPersianDigits(health.schemaVersion)} · {toPersianDigits(health.bootCount)} بار راه‌اندازی
            </Text>
          </Row>
        </Card>

        <View style={styles.actions}>
          <Button title="همگام‌سازی دستی" kind="secondary" onPress={() => void processQueue().then(refresh)} />
          {health.failed > 0 ? (
            <Button title="تلاش مجدد رکوردهای ناموفق" kind="secondary" onPress={() => void retryFailed().then(refresh)} />
          ) : null}
          <Button title="خروج از حساب" kind="ghost" onPress={() => void signOut()} />
        </View>
      </ScrollView>
    </Screen>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.row}>
      <Text variant="body" tone="secondary">
        {label}
      </Text>
      {children}
    </View>
  );
}

function roleLabel(role?: string | null): string {
  switch (role) {
    case 'manager':
      return 'مدیر';
    case 'doctor':
      return 'پزشک';
    case 'secretary':
      return 'منشی';
    case 'assistant':
      return 'دستیار';
    default:
      return 'کاربر';
  }
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  cardTitle: { marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing.lg },
  cell: { width: '25%' },
  accountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roleChip: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  actions: { gap: spacing.md },
});
