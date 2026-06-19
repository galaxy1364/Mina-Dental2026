import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Logo } from '@/design/components/Logo';
import { Screen } from '@/design/components/Screen';
import { IconTile } from '@/design/components/IconTile';
import { Text } from '@/design/components/Text';
import { Icon } from '@/design/icons/Icon';
import { colors, gradients, radius, shadow, spacing, tile } from '@/design/tokens';
import { getSyncSnapshot } from '@/core/sync/syncEngine';
import { computeClinicDashboard, type ClinicDashboard } from '@/features/journey/engine';
import { useAuth } from '@/features/auth/useAuth';
import { formatJalaliLong, nowIso } from '@/lib/jalali';
import { formatToman, toPersianDigits } from '@/lib/persian';

interface QuickLink {
  label: string;
  icon: Parameters<typeof IconTile>[0]['icon'];
  color: string;
  route: string;
  badge?: () => string | undefined;
}

export default function Dashboard() {
  const router = useRouter();
  const { session } = useAuth();
  const [stats, setStats] = useState<ClinicDashboard>(() => computeClinicDashboard());
  const [online, setOnline] = useState<boolean>(() => getSyncSnapshot().online);
  const [pending, setPending] = useState<number>(() => getSyncSnapshot().pending);
  const [now] = useState(() => nowIso());

  const refresh = useCallback(() => {
    setStats(computeClinicDashboard());
    const snap = getSyncSnapshot();
    setOnline(snap.online);
    setPending(snap.pending);
  }, []);

  useFocusEffect(refresh);
  useEffect(() => {
    const id = setInterval(refresh, 5000);
    return () => clearInterval(id);
  }, [refresh]);

  const links: QuickLink[] = [
    { label: 'بیماران', icon: 'tooth', color: tile.patients, route: '/(app)/patients' },
    { label: 'نوبت‌دهی', icon: 'clock', color: tile.appointments, route: '/(app)/appointments' },
    { label: 'تقویم', icon: 'calendar', color: tile.calendar, route: '/(app)/calendar' },
    {
      label: 'لابراتوار',
      icon: 'flask',
      color: tile.labcases,
      route: '/(app)/labcases',
      badge: () => (stats.overdueLabCases > 0 ? toPersianDigits(stats.overdueLabCases) : undefined),
    },
    { label: 'ایمپلنت', icon: 'implant', color: tile.implants, route: '/(app)/implants' },
    { label: 'مالی', icon: 'wallet', color: tile.finance, route: '/(app)/payments' },
    { label: 'کادر درمان', icon: 'users', color: tile.staff, route: '/(app)/staff' },
    { label: 'خدمات', icon: 'grid', color: tile.reports, route: '/(app)/more' },
  ];

  return (
    <Screen edges={['top']} padded={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Logo size={42} />
          <View style={styles.headerRight}>
            <View style={[styles.statusPill, { backgroundColor: online ? colors.primaryLight : colors.surfaceAlt }]}>
              <Icon name="cloud" size={14} color={online ? colors.primaryDark : colors.textMuted} />
              <Text variant="caption" style={{ color: online ? colors.primaryDark : colors.textMuted }}>
                {online ? 'آنلاین' : 'آفلاین'}
              </Text>
            </View>
            <Pressable style={styles.bell} onPress={() => router.push('/(app)/more')}>
              <Icon name="bell" size={20} color={colors.textSecondary} />
              {pending > 0 ? <View style={styles.bellDot} /> : null}
            </Pressable>
          </View>
        </View>

        <LinearGradient colors={gradients.wallet} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <Text variant="caption" style={styles.heroLabel}>
            مانده مطالبات کلینیک
          </Text>
          <Text variant="title" style={styles.heroValue}>
            {formatToman(stats.outstanding)}
          </Text>
          <Text variant="caption" style={styles.heroDate}>
            {formatJalaliLong(now)}
          </Text>

          <View style={styles.heroStats}>
            <HeroStat label="نوبت امروز" value={toPersianDigits(stats.todayAppointments)} />
            <View style={styles.heroDivider} />
            <HeroStat label="بیماران" value={toPersianDigits(stats.patients)} />
            <View style={styles.heroDivider} />
            <HeroStat label="سفارش باز" value={toPersianDigits(stats.openLabCases)} />
          </View>
        </LinearGradient>

        <Pressable style={styles.welcome} onPress={() => router.push('/(app)/more')}>
          <View>
            <Text variant="body" tone="secondary">
              خوش آمدید
            </Text>
            <Text variant="subtitle">{session?.displayName ?? session?.email ?? 'کاربر'}</Text>
          </View>
          <View style={styles.roleChip}>
            <Text variant="caption" style={{ color: colors.primaryDark }}>
              {roleLabel(session?.role)}
            </Text>
          </View>
        </Pressable>

        <Text variant="subtitle" style={styles.sectionTitle}>
          دسترسی سریع
        </Text>
        <View style={styles.grid}>
          {links.map((l) => (
            <IconTile
              key={l.label}
              label={l.label}
              icon={l.icon}
              color={l.color}
              badge={l.badge?.()}
              onPress={() => router.push(l.route as never)}
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.heroStat}>
      <Text variant="subtitle" style={styles.heroStatValue}>
        {value}
      </Text>
      <Text variant="caption" style={styles.heroStatLabel}>
        {label}
      </Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  bell: { padding: spacing.sm, position: 'relative' },
  bellDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  hero: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.xs,
    ...shadow.float,
  },
  heroLabel: { color: 'rgba(255,255,255,0.85)' },
  heroValue: { color: colors.textInverse, fontSize: 30, lineHeight: 42 },
  heroDate: { color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  heroStat: { flex: 1, alignItems: 'center', gap: 2 },
  heroStatValue: { color: colors.textInverse },
  heroStatLabel: { color: 'rgba(255,255,255,0.8)' },
  heroDivider: { width: StyleSheet.hairlineWidth, height: 28, backgroundColor: 'rgba(255,255,255,0.35)' },
  welcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
  roleChip: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  sectionTitle: { marginTop: spacing.xs },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.lg,
  },
});
