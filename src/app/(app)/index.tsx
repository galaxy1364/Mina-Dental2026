import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { eq, sql } from 'drizzle-orm';
import { Button } from '@/design/components/Button';
import { Card } from '@/design/components/Card';
import { Screen } from '@/design/components/Screen';
import { StatusBadge } from '@/design/components/StateViews';
import { Text } from '@/design/components/Text';
import { spacing } from '@/design/tokens';
import { CLINIC } from '@/core/clinic';
import { db } from '@/core/db/client';
import { appBootAudit, localMeta } from '@/core/db/schema';
import { getSyncSnapshot, processQueue } from '@/core/sync/syncEngine';
import { useAuth } from '@/features/auth/useAuth';
import { formatJalaliDateTime, nowIso } from '@/lib/jalali';
import { toPersianDigits } from '@/lib/persian';

interface Health {
  schemaVersion: string;
  bootCount: number;
  pending: number;
  online: boolean;
  configured: boolean;
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
  };
}

export default function Dashboard() {
  const { session, signOut } = useAuth();
  const [health, setHealth] = useState<Health>(() => readHealth());
  const [now] = useState(() => nowIso());

  const refresh = useCallback(() => setHealth(readHealth()), []);

  useEffect(() => {
    const id = setInterval(refresh, 3000);
    return () => clearInterval(id);
  }, [refresh]);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="title">مینادنت</Text>
          <Text variant="caption" tone="secondary">
            {CLINIC.nameFa} · {formatJalaliDateTime(now)}
          </Text>
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
          <Text variant="subtitle">وضعیت سامانه</Text>
          <View style={styles.row}>
            <Text variant="body" tone="secondary">
              اتصال
            </Text>
            <StatusBadge tone={health.online ? 'synced' : 'offline'} label={health.online ? 'آنلاین' : 'آفلاین'} />
          </View>
          <View style={styles.row}>
            <Text variant="body" tone="secondary">
              صف همگام‌سازی
            </Text>
            <StatusBadge
              tone={health.pending > 0 ? 'pendingSync' : 'synced'}
              label={health.pending > 0 ? `${toPersianDigits(health.pending)} در انتظار` : 'همگام'}
            />
          </View>
          <View style={styles.row}>
            <Text variant="body" tone="secondary">
              پایگاه‌دادهٔ محلی
            </Text>
            <Text variant="caption" tone="muted">
              نسخهٔ شِما {toPersianDigits(health.schemaVersion)} · {toPersianDigits(health.bootCount)} بار راه‌اندازی
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="body" tone="secondary">
              سرویس ابری
            </Text>
            <StatusBadge
              tone={health.configured ? 'synced' : 'offline'}
              label={health.configured ? 'پیکربندی‌شده' : 'پیکربندی‌نشده'}
            />
          </View>
        </Card>

        <View style={styles.actions}>
          <Button title="همگام‌سازی دستی" kind="secondary" onPress={() => void processQueue().then(refresh)} />
          <Button title="خروج از حساب" kind="ghost" onPress={() => void signOut()} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.lg, paddingBottom: spacing.xl },
  header: { gap: spacing.xs, alignItems: 'flex-start' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  badgeRow: { marginTop: spacing.sm, flexDirection: 'row' },
  actions: { gap: spacing.md, marginTop: spacing.sm },
});
