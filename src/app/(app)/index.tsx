import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Logo } from '@/design/components/Logo';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { Icon } from '@/design/icons/Icon';
import { colors, gradients, radius, shadow, spacing } from '@/design/tokens';
import { withAlpha } from '@/lib/color';
import { getSyncSnapshot } from '@/core/sync/syncEngine';
import { computeDashboardData, type DashboardData } from '@/features/dashboard/data';
import {
  loadLayout,
  moveDown,
  moveUp,
  resetLayout,
  saveLayout,
  setVisible,
  widgetMeta,
  type DashboardLayout,
} from '@/features/dashboard/layout';
import { renderWidget } from '@/features/dashboard/widgets';
import { useAuth } from '@/features/auth/useAuth';
import { useCountUp } from '@/design/motion';
import { formatJalaliLong, nowIso } from '@/lib/jalali';
import { formatToman, toPersianDigits } from '@/lib/persian';

export default function Dashboard() {
  const router = useRouter();
  const { session } = useAuth();
  const [data, setData] = useState<DashboardData>(() => computeDashboardData());
  const [online, setOnline] = useState<boolean>(() => getSyncSnapshot().online);
  const [pending, setPending] = useState<number>(() => getSyncSnapshot().pending);
  const [now] = useState(() => nowIso());
  const [layout, setLayout] = useState<DashboardLayout>(() => loadLayout());
  const [editing, setEditing] = useState(false);

  const refresh = useCallback(() => {
    setData(computeDashboardData());
    const snap = getSyncSnapshot();
    setOnline(snap.online);
    setPending(snap.pending);
  }, []);

  useFocusEffect(refresh);
  useEffect(() => {
    if (editing) return;
    const id = setInterval(refresh, 5000);
    return () => clearInterval(id);
  }, [refresh, editing]);

  const apply = useCallback((next: DashboardLayout) => {
    setLayout(next);
    saveLayout(next);
  }, []);

  const visible = layout.filter((c) => c.visible);
  const hidden = layout.filter((c) => !c.visible);

  const onUp = (id: string) => apply(moveUp(layout, layout.findIndex((c) => c.id === id)));
  const onDown = (id: string) => apply(moveDown(layout, layout.findIndex((c) => c.id === id)));

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
            <Pressable
              style={[styles.iconBtn, editing && styles.iconBtnActive]}
              onPress={() => setEditing((e) => !e)}
            >
              <Icon name={editing ? 'check' : 'sliders'} size={18} color={editing ? colors.onPrimary : colors.textSecondary} />
            </Pressable>
            <Pressable style={styles.iconBtn} onPress={() => router.push('/(app)/more')}>
              <Icon name="bell" size={18} color={colors.textSecondary} />
              {pending > 0 ? <View style={styles.bellDot} /> : null}
            </Pressable>
          </View>
        </View>

        <LinearGradient colors={gradients.wallet} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <Text variant="caption" style={styles.heroLabel}>
            مانده مطالبات کلینیک
          </Text>
          <HeroBalance value={data.stats.outstanding} />
          <Text variant="caption" style={styles.heroDate}>
            {formatJalaliLong(now)}
          </Text>

          <View style={styles.heroStats}>
            <HeroStat label="نوبت امروز" value={data.stats.todayAppointments} />
            <View style={styles.heroDivider} />
            <HeroStat label="بیماران" value={data.stats.patients} />
            <View style={styles.heroDivider} />
            <HeroStat label="سفارش باز" value={data.stats.openLabCases} />
          </View>
        </LinearGradient>

        {editing ? (
          <View style={styles.editBanner}>
            <Icon name="sliders" size={16} color={colors.primaryDark} />
            <Text variant="caption" tone="secondary" style={styles.editBannerText}>
              حالت شخصی‌سازی: جابه‌جا، مخفی یا اضافه کنید
            </Text>
            <Pressable onPress={() => apply(resetLayout())}>
              <Text variant="caption" tone="primary">
                بازنشانی
              </Text>
            </Pressable>
          </View>
        ) : null}

        {visible.map((cfg, i) => (
          <View key={cfg.id}>
            {editing ? (
              <View style={styles.editBar}>
                <View style={styles.editBarStart}>
                  <Icon name={widgetMeta(cfg.id).icon} size={15} color={colors.primaryDark} />
                  <Text variant="caption" tone="secondary">
                    {widgetMeta(cfg.id).title}
                  </Text>
                </View>
                <View style={styles.editBarActions}>
                  <Pressable style={styles.editAction} disabled={i === 0} onPress={() => onUp(cfg.id)}>
                    <Icon name="chevronU" size={16} color={i === 0 ? colors.textMuted : colors.textSecondary} />
                  </Pressable>
                  <Pressable
                    style={styles.editAction}
                    disabled={i === visible.length - 1}
                    onPress={() => onDown(cfg.id)}
                  >
                    <Icon name="chevronD" size={16} color={i === visible.length - 1 ? colors.textMuted : colors.textSecondary} />
                  </Pressable>
                  <Pressable style={styles.editAction} onPress={() => apply(setVisible(layout, cfg.id, false))}>
                    <Icon name="eyeOff" size={16} color={colors.danger} />
                  </Pressable>
                </View>
              </View>
            ) : null}
            <View pointerEvents={editing ? 'none' : 'auto'} style={editing ? styles.widgetEditing : undefined}>
              {renderWidget(cfg.id, data, session)}
            </View>
          </View>
        ))}

        {editing && hidden.length > 0 ? (
          <View style={styles.addPanel}>
            <Text variant="subtitle" style={styles.addTitle}>
              افزودن ویجت
            </Text>
            {hidden.map((cfg) => (
              <Pressable key={cfg.id} style={styles.addRow} onPress={() => apply(setVisible(layout, cfg.id, true))}>
                <View style={styles.addRowStart}>
                  <View style={styles.addIcon}>
                    <Icon name={widgetMeta(cfg.id).icon} size={16} color={colors.primaryDark} />
                  </View>
                  <View style={styles.addTexts}>
                    <Text variant="body">{widgetMeta(cfg.id).title}</Text>
                    <Text variant="caption" tone="muted">
                      {widgetMeta(cfg.id).description}
                    </Text>
                  </View>
                </View>
                <Icon name="plus" size={18} color={colors.primaryDark} />
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

function HeroBalance({ value }: { value: number }) {
  const animated = useCountUp(value);
  return (
    <Text variant="title" style={styles.heroValue}>
      {formatToman(animated)}
    </Text>
  );
}

function HeroStat({ label, value }: { label: string; value: number }) {
  const animated = useCountUp(value);
  return (
    <View style={styles.heroStat}>
      <Text variant="subtitle" style={styles.heroStatValue}>
        {toPersianDigits(animated)}
      </Text>
      <Text variant="caption" style={styles.heroStatLabel}>
        {label}
      </Text>
    </View>
  );
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
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  iconBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  bellDot: {
    position: 'absolute',
    top: 7,
    right: 7,
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

  editBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: withAlpha(colors.primary, 0.12),
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: withAlpha(colors.primary, 0.3),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  editBannerText: { flex: 1 },
  editBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceAlt,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: -spacing.sm,
  },
  editBarStart: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  editBarActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  editAction: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  widgetEditing: { opacity: 0.6 },

  addPanel: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadow.card,
  },
  addTitle: { marginBottom: spacing.xs },
  addRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  addRowStart: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  addIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  addTexts: { flex: 1, gap: 2 },
});
