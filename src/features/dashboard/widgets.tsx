/**
 * Dashboard widget renderers for the customizable command center. Each widget is
 * a self-contained card bound to live repository data and is fully clickable
 * (taps deep-link into the relevant module). Rendered in user-defined order by
 * the home screen; selection/order/visibility is managed in `./layout`.
 */
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Icon, type IconName } from '@/design/icons/Icon';
import { Pill } from '@/design/components/Pill';
import { Text } from '@/design/components/Text';
import { IconTile } from '@/design/components/IconTile';
import { FadeInUp, PressableScale, useCountUp } from '@/design/motion';
import { colors, radius, shadow, spacing, tile } from '@/design/tokens';
import { TONE_COLORS } from '@/design/tone';
import { withAlpha } from '@/lib/color';
import { formatToman, toPersianDigits } from '@/lib/persian';
import type { Session } from '@/features/auth/useAuth';
import type { DashboardData } from './data';
import type { WidgetId } from './layout';

function SectionHeader({ icon, title, action }: { icon: IconName; title: string; action?: React.ReactNode }) {
  return (
    <View style={styles.sectionHead}>
      <View style={styles.sectionHeadStart}>
        <Icon name={icon} size={18} color={colors.primaryDark} />
        <Text variant="subtitle">{title}</Text>
      </View>
      {action}
    </View>
  );
}

interface KpiSpec {
  key: string;
  label: string;
  value: number;
  display: (n: number) => string;
  icon: IconName;
  color: string;
  route: string;
  tone?: 'normal' | 'danger';
}

function KpiCard({ spec }: { spec: KpiSpec }) {
  const router = useRouter();
  const animated = useCountUp(spec.value);
  const danger = spec.tone === 'danger' && spec.value > 0;
  const accent = danger ? colors.danger : spec.color;
  return (
    <PressableScale style={styles.kpiCell} onPress={() => router.push(spec.route as never)}>
      <View style={[styles.kpiCard, danger && { borderColor: withAlpha(colors.danger, 0.5) }]}>
        <View style={[styles.kpiIcon, { backgroundColor: withAlpha(accent, 0.16) }]}>
          <Icon name={spec.icon} size={18} color={accent} />
        </View>
        <Text variant="title" style={[styles.kpiValue, { color: accent }]}>
          {spec.display(animated)}
        </Text>
        <Text variant="caption" tone="secondary">
          {spec.label}
        </Text>
      </View>
    </PressableScale>
  );
}

export function KpisWidget({ data }: { data: DashboardData }) {
  const specs: KpiSpec[] = [
    { key: 'today', label: 'نوبت امروز', value: data.stats.todayAppointments, display: toPersianDigits, icon: 'appointment', color: tile.appointments, route: '/(app)/appointments' },
    { key: 'patients', label: 'بیماران', value: data.stats.patients, display: toPersianDigits, icon: 'tooth', color: tile.patients, route: '/(app)/patients' },
    { key: 'openLab', label: 'سفارش باز لابراتوار', value: data.stats.openLabCases, display: toPersianDigits, icon: 'flask', color: tile.labcases, route: '/(app)/labcases' },
    { key: 'overdue', label: 'سفارش‌های عقب‌افتاده', value: data.stats.overdueLabCases, display: toPersianDigits, icon: 'alert', color: tile.labcases, route: '/(app)/labcases', tone: 'danger' },
  ];
  return (
    <View style={styles.kpiGrid}>
      {specs.map((spec) => (
        <KpiCard key={spec.key} spec={spec} />
      ))}
    </View>
  );
}

export function TimelineWidget({ data }: { data: DashboardData }) {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <SectionHeader
        icon="clock"
        title="نوبت‌های امروز"
        action={
          <PressableScale onPress={() => router.push('/(app)/appointments')}>
            <Text variant="caption" tone="primary">
              همه
            </Text>
          </PressableScale>
        }
      />
      {data.today.length === 0 ? (
        <View style={styles.empty}>
          <Icon name="calendar" size={28} color={colors.textMuted} />
          <Text variant="caption" tone="muted">
            برای امروز نوبتی ثبت نشده است
          </Text>
        </View>
      ) : (
        <View style={styles.timeline}>
          {data.today.slice(0, 5).map((a) => (
            <PressableScale
              key={a.id}
              style={styles.tlRow}
              onPress={() => router.push(`/(app)/appointments/form?id=${a.id}` as never)}
            >
              <View style={[styles.tlTime, { backgroundColor: withAlpha(TONE_COLORS[a.tone].fg, 0.16) }]}>
                <Text variant="caption" style={{ color: TONE_COLORS[a.tone].fg }}>
                  {toPersianDigits(a.time)}
                </Text>
              </View>
              <View style={styles.tlBody}>
                <Text variant="body">{a.patient}</Text>
                {a.doctor || a.unit ? (
                  <Text variant="caption" tone="muted">
                    {[a.doctor, a.unit ? `یونیت ${a.unit}` : null].filter(Boolean).join(' · ')}
                  </Text>
                ) : null}
              </View>
              <Pill tone={a.tone} label={a.statusLabel} />
            </PressableScale>
          ))}
          {data.today.length > 5 ? (
            <Text variant="caption" tone="muted" style={styles.moreLine}>
              + {toPersianDigits(data.today.length - 5)} نوبت دیگر
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

export function AlertsWidget({ data }: { data: DashboardData }) {
  const router = useRouter();
  const hasOutstanding = data.stats.outstanding > 0;
  const calm = data.overdue.length === 0 && !hasOutstanding;
  return (
    <View style={styles.card}>
      <SectionHeader icon="alert" title="هشدارها" />
      {calm ? (
        <View style={styles.empty}>
          <Icon name="check" size={28} color={colors.success} />
          <Text variant="caption" tone="muted">
            همه‌چیز مرتب است
          </Text>
        </View>
      ) : (
        <View style={styles.alerts}>
          {hasOutstanding ? (
            <PressableScale style={styles.alertRow} onPress={() => router.push('/(app)/payments')}>
              <View style={[styles.alertDot, { backgroundColor: withAlpha(colors.warning, 0.16) }]}>
                <Icon name="wallet" size={16} color={colors.warning} />
              </View>
              <Text variant="body" style={styles.alertText}>
                مطالبات باز کلینیک
              </Text>
              <Text variant="body" style={{ color: colors.warning }}>
                {formatToman(data.stats.outstanding)}
              </Text>
            </PressableScale>
          ) : null}
          {data.overdue.slice(0, 4).map((c) => (
            <PressableScale
              key={c.id}
              style={styles.alertRow}
              onPress={() => router.push(`/(app)/labcases/form?id=${c.id}` as never)}
            >
              <View style={[styles.alertDot, { backgroundColor: withAlpha(colors.danger, 0.16) }]}>
                <Icon name="flask" size={16} color={colors.danger} />
              </View>
              <View style={styles.alertBody}>
                <Text variant="body">{c.title}</Text>
                <Text variant="caption" tone="muted">
                  {c.lab}
                </Text>
              </View>
              <Pill tone="danger" label="عقب‌افتاده" />
            </PressableScale>
          ))}
          {data.overdue.length > 4 ? (
            <Text variant="caption" tone="muted" style={styles.moreLine}>
              + {toPersianDigits(data.overdue.length - 4)} مورد دیگر
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

interface QuickLink {
  label: string;
  icon: Parameters<typeof IconTile>[0]['icon'];
  color: string;
  route: string;
  badge?: string;
}

export function QuickAccessWidget({ data }: { data: DashboardData }) {
  const router = useRouter();
  const links: QuickLink[] = [
    { label: 'بیماران', icon: 'tooth', color: tile.patients, route: '/(app)/patients' },
    { label: 'نوبت‌دهی', icon: 'appointment', color: tile.appointments, route: '/(app)/appointments' },
    { label: 'تقویم', icon: 'calendar', color: tile.calendar, route: '/(app)/calendar' },
    {
      label: 'لابراتوار',
      icon: 'flask',
      color: tile.labcases,
      route: '/(app)/labcases',
      badge: data.stats.overdueLabCases > 0 ? toPersianDigits(data.stats.overdueLabCases) : undefined,
    },
    { label: 'ایمپلنت', icon: 'implant', color: tile.implants, route: '/(app)/implants' },
    { label: 'مالی', icon: 'wallet', color: tile.finance, route: '/(app)/payments' },
    { label: 'کادر درمان', icon: 'users', color: tile.staff, route: '/(app)/staff' },
    { label: 'خدمات', icon: 'grid', color: tile.reports, route: '/(app)/more' },
  ];
  return (
    <View style={styles.card}>
      <SectionHeader icon="grid" title="دسترسی سریع" />
      <View style={styles.grid}>
        {links.map((l, i) => (
          <FadeInUp key={l.label} index={i} style={styles.cell}>
            <IconTile
              label={l.label}
              icon={l.icon}
              color={l.color}
              size={54}
              badge={l.badge}
              onPress={() => router.push(l.route as never)}
            />
          </FadeInUp>
        ))}
      </View>
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

export function WelcomeWidget({ session }: { session: Session | null }) {
  const router = useRouter();
  return (
    <PressableScale style={[styles.card, styles.welcome]} onPress={() => router.push('/(app)/more')}>
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
    </PressableScale>
  );
}

export function renderWidget(id: WidgetId, data: DashboardData, session: Session | null) {
  switch (id) {
    case 'kpis':
      return <KpisWidget data={data} />;
    case 'timeline':
      return <TimelineWidget data={data} />;
    case 'alerts':
      return <AlertsWidget data={data} />;
    case 'quick':
      return <QuickAccessWidget data={data} />;
    case 'welcome':
      return <WelcomeWidget session={session} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadow.card,
  },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionHeadStart: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  empty: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.lg },

  // KPIs
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  kpiCell: { width: '47.5%', flexGrow: 1 },
  kpiCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.xs,
    ...shadow.card,
  },
  kpiIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  kpiValue: { fontSize: 24, lineHeight: 34 },

  // Timeline
  timeline: { gap: spacing.sm },
  tlRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  tlTime: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.sm, minWidth: 56, alignItems: 'center' },
  tlBody: { flex: 1, gap: 2 },
  moreLine: { textAlign: 'center', paddingTop: spacing.xs },

  // Alerts
  alerts: { gap: spacing.sm },
  alertRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  alertDot: { width: 32, height: 32, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  alertBody: { flex: 1, gap: 2 },
  alertText: { flex: 1 },

  // Quick access
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing.lg },
  cell: { width: '25%' },

  // Welcome
  welcome: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roleChip: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
});
