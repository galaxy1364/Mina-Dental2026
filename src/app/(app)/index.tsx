import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { eq, sql } from 'drizzle-orm';
import { Button } from '@/design/components/Button';
import { Card } from '@/design/components/Card';
import { Logo } from '@/design/components/Logo';
import { Screen } from '@/design/components/Screen';
import { StatCard } from '@/design/components/StatCard';
import { StatusBadge } from '@/design/components/StateViews';
import { Text } from '@/design/components/Text';
import { spacing } from '@/design/tokens';
import { db } from '@/core/db/client';
import { appBootAudit, localMeta } from '@/core/db/schema';
import { getSyncSnapshot, processQueue, retryFailed } from '@/core/sync/syncEngine';
import { computeClinicDashboard, type ClinicDashboard } from '@/features/journey/engine';
import { useAuth } from '@/features/auth/useAuth';
import { formatJalaliDateTime, nowIso } from '@/lib/jalali';
import { formatToman, toPersianDigits } from '@/lib/persian';

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

export default function Dashboard() {
  const router = useRouter();
  const { session, signOut } = useAuth();
  const isManager = session?.role === 'manager';
  const [health, setHealth] = useState<Health>(() => readHealth());
  const [stats, setStats] = useState<ClinicDashboard>(() => computeClinicDashboard());
  const [now] = useState(() => nowIso());

  const refresh = useCallback(() => {
    setHealth(readHealth());
    setStats(computeClinicDashboard());
  }, []);

  useFocusEffect(refresh);
  useEffect(() => {
    const id = setInterval(refresh, 5000);
    return () => clearInterval(id);
  }, [refresh]);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Logo size={48} />
          <Text variant="caption" tone="secondary">
            {formatJalaliDateTime(now)}
          </Text>
        </View>

        <View style={styles.grid}>
          <StatCard
            label="نوبت‌های امروز"
            value={toPersianDigits(stats.todayAppointments)}
            tone="info"
            icon="◷"
            onPress={() => router.push('/(app)/appointments')}
          />
          <StatCard
            label="بیماران"
            value={toPersianDigits(stats.patients)}
            tone="success"
            icon="⊕"
            onPress={() => router.push('/(app)/patients')}
          />
          <StatCard
            label="سفارش‌های در جریان"
            value={toPersianDigits(stats.openLabCases)}
            hint={stats.overdueLabCases > 0 ? `${toPersianDigits(stats.overdueLabCases)} معوق` : undefined}
            tone={stats.overdueLabCases > 0 ? 'danger' : 'warning'}
            icon="⚙"
            onPress={() => router.push('/(app)/labcases')}
          />
          <StatCard
            label="مطالبات کلینیک"
            value={stats.outstanding > 0 ? formatToman(stats.outstanding, false) : '۰'}
            hint={stats.outstanding > 0 ? 'تومان' : 'تسویه'}
            tone={stats.outstanding > 0 ? 'warning' : 'success'}
            icon="₪"
            onPress={() => router.push('/(app)/payments')}
          />
        </View>

        <Card>
          <Text variant="subtitle">خوش آمدید</Text>
          <Text variant="body" tone="secondary">
            {session?.displayName ?? session?.email ?? 'کاربر'}
          </Text>
          {session?.role ? (
            <View style={styles.badgeRow}>
              <StatusBadge tone="synced" label={`نقش: ${session.role}`} />
            </View>
          ) : null}
        </Card>

        <Card>
          <Text variant="subtitle">مدیریت</Text>
          <View style={styles.menu}>
            <MenuItem label="بیماران" onPress={() => router.push('/(app)/patients')} />
            <MenuItem label="نوبت‌دهی" onPress={() => router.push('/(app)/appointments')} />
            <MenuItem label="سفارش‌های لابراتوار" onPress={() => router.push('/(app)/labcases')} />
            <MenuItem label="مالی" onPress={() => router.push('/(app)/payments')} />
            <MenuItem label="کادر درمان و پرسنل" onPress={() => router.push('/(app)/staff')} />
            <MenuItem label="لابراتوارها" onPress={() => router.push('/(app)/labs')} />
          </View>
          {!isManager ? (
            <Text variant="caption" tone="muted">
              فقط مدیر می‌تواند افزودن/ویرایش/حذف انجام دهد.
            </Text>
          ) : null}
        </Card>

        <Card>
          <Text variant="subtitle">وضعیت سامانه</Text>
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

function MenuItem({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <Text variant="body" tone="primary">
        {label}
      </Text>
      <Text variant="caption" tone="muted">
        ‹
      </Text>
    </Pressable>
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

const styles = StyleSheet.create({
  content: { gap: spacing.lg, paddingBottom: spacing.xl },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: spacing.md },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  badgeRow: { marginTop: spacing.sm, flexDirection: 'row' },
  actions: { gap: spacing.md, marginTop: spacing.sm },
  menu: { marginTop: spacing.sm },
  menuItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
});
