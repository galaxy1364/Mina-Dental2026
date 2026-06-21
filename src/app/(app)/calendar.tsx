import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { ChipBar, type ChipItem } from '@/design/components/ChipBar';
import { Screen } from '@/design/components/Screen';
import { EmptyState } from '@/design/components/StateViews';
import { Text } from '@/design/components/Text';
import { Icon } from '@/design/icons/Icon';
import { FadeInUp } from '@/design/motion';
import { colors, fonts, radius, shadow, spacing } from '@/design/tokens';
import { withAlpha } from '@/lib/color';
import {
  addJalaliMonths,
  buildJalaliMonth,
  formatJalaliLong,
  JALALI_WEEKDAY_SHORT,
} from '@/lib/jalali';
import { toPersianDigits } from '@/lib/persian';
import {
  dayKey,
  listCalendarEvents,
  type CalendarCategory,
  type CalendarEvent,
} from '@/features/calendar/events';

type Filter = 'all' | CalendarCategory;

const CAT_COLOR: Record<CalendarCategory, string> = {
  appointment: colors.success,
  labcase: colors.warning,
  payment: colors.info,
};

const FILTERS: ChipItem<Filter>[] = [
  { key: 'all', label: 'همه' },
  { key: 'appointment', label: 'نوبت' },
  { key: 'labcase', label: 'لابراتوار' },
  { key: 'payment', label: 'پرداخت/صورتحساب' },
];

export default function CalendarScreen() {
  const router = useRouter();
  const [cursor, setCursor] = useState(() => new Date());
  const [selectedKey, setSelectedKey] = useState(() => dayKey(new Date()));
  const [filter, setFilter] = useState<Filter>('all');
  const [tick, setTick] = useState(0);

  useFocusEffect(useCallback(() => setTick((t) => t + 1), []));

  const month = useMemo(() => buildJalaliMonth(cursor), [cursor]);
  const todayKey = dayKey(new Date());

  const buckets = useMemo(() => {
    const dayCells = month.cells.filter((c) => c.date);
    if (dayCells.length === 0) return new Map<string, CalendarEvent[]>();
    const first = dayCells[0].date as Date;
    const last = dayCells[dayCells.length - 1].date as Date;
    const end = new Date(last);
    end.setDate(end.getDate() + 1);
    const events = listCalendarEvents(first.toISOString(), end.toISOString());
    const map = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const k = dayKey(new Date(e.dateIso));
      const arr = map.get(k);
      if (arr) arr.push(e);
      else map.set(k, [e]);
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, tick]);

  const selectedEvents = (buckets.get(selectedKey) ?? []).filter(
    (e) => filter === 'all' || e.category === filter,
  );

  const selectedCell = month.cells.find((c) => c.date && dayKey(c.date) === selectedKey);
  const selectedHoliday = selectedCell?.holidayName;

  const goToday = () => {
    const today = new Date();
    setCursor(today);
    setSelectedKey(dayKey(today));
  };

  return (
    <Screen edges={['top']} padded={false}>
      <View style={styles.topBar}>
        <Text variant="title">تقویم</Text>
        <Pressable style={styles.todayBtn} onPress={goToday}>
          <Icon name="calendar" size={15} color={colors.primaryDark} />
          <Text variant="caption" style={{ color: colors.primaryDark }}>
            امروز
          </Text>
        </Pressable>
      </View>

      <ChipBar items={FILTERS} value={filter} onChange={setFilter} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.calCard}>
          <View style={styles.monthRow}>
            <Pressable style={styles.navBtn} onPress={() => setCursor((c) => addJalaliMonths(c, -1))}>
              <Icon name="chevronR" size={20} color={colors.textSecondary} />
            </Pressable>
            <View style={styles.monthLabel}>
              <Text variant="subtitle">{month.monthName}</Text>
              <Text variant="caption" tone="muted">
                {toPersianDigits(month.year)}
              </Text>
            </View>
            <Pressable style={styles.navBtn} onPress={() => setCursor((c) => addJalaliMonths(c, 1))}>
              <Icon name="chevronL" size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.weekRow}>
            {JALALI_WEEKDAY_SHORT.map((w, i) => (
              <View key={w} style={styles.weekCell}>
                <Text variant="caption" style={[styles.weekText, i === 6 && styles.holidayText]}>
                  {w}
                </Text>
              </View>
            ))}
          </View>

          <FadeInUp key={`${month.year}-${month.monthName}`}>
            <View style={styles.grid}>
              {month.cells.map((cell, idx) => {
                if (!cell.date || cell.day === null) {
                  return <View key={`b-${idx}`} style={styles.cell} />;
                }
                const k = dayKey(cell.date);
                const dayEvents = (buckets.get(k) ?? []).filter(
                  (e) => filter === 'all' || e.category === filter,
                );
                const cats = Array.from(new Set(dayEvents.map((e) => e.category)));
                const isToday = k === todayKey;
                const isSelected = k === selectedKey;
                return (
                  <Pressable key={k} style={styles.cell} onPress={() => setSelectedKey(k)}>
                    <View
                      style={[
                        styles.dayInner,
                        isToday && !isSelected && styles.dayToday,
                        isSelected && styles.daySelected,
                      ]}
                    >
                      <Text
                        variant="body"
                        style={[
                          styles.dayNum,
                          cell.holiday && styles.holidayText,
                          isToday && !isSelected && styles.dayTodayText,
                          isSelected && styles.daySelectedText,
                        ]}
                      >
                        {toPersianDigits(cell.day)}
                      </Text>
                      <View style={styles.dots}>
                        {cats.map((c) => (
                          <View
                            key={c}
                            style={[styles.dot, { backgroundColor: isSelected ? colors.onPrimary : CAT_COLOR[c] }]}
                          />
                        ))}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </FadeInUp>

          <View style={styles.legend}>
            <LegendItem color={CAT_COLOR.appointment} label="نوبت" />
            <LegendItem color={CAT_COLOR.labcase} label="لابراتوار" />
            <LegendItem color={CAT_COLOR.payment} label="پرداخت" />
            <LegendItem color={colors.danger} label="تعطیل" />
          </View>
        </View>

        <View style={styles.agendaHead}>
          <View style={styles.agendaTitleWrap}>
            <Text variant="subtitle">
              {selectedCell?.date ? formatJalaliLong(selectedCell.date) : 'رویدادهای روز'}
            </Text>
            {selectedHoliday ? (
              <View style={styles.holidayChip}>
                <Text variant="caption" style={styles.holidayChipText}>
                  {selectedHoliday === 'جمعه' ? 'تعطیل رسمی' : selectedHoliday}
                </Text>
              </View>
            ) : null}
          </View>
          {selectedEvents.length > 0 ? (
            <Text variant="caption" tone="muted">
              {toPersianDigits(selectedEvents.length)} رویداد
            </Text>
          ) : null}
        </View>

        {selectedEvents.length === 0 ? (
          <EmptyState message="برای این روز رویدادی ثبت نشده است." />
        ) : (
          <View style={styles.eventList}>
            {selectedEvents.map((e, i) => (
              <FadeInUp key={e.id} index={i}>
                <Pressable
                  style={styles.eventRow}
                  onPress={() => router.push(`/(app)/patients/${e.patientId}` as never)}
                >
                  <View style={[styles.eventIcon, { backgroundColor: withAlpha(CAT_COLOR[e.category], 0.16) }]}>
                    <Icon name={CAT_ICON[e.category]} size={16} color={CAT_COLOR[e.category]} />
                  </View>
                  <View style={styles.eventBody}>
                    <Text variant="body">{e.title}</Text>
                    <Text variant="caption" tone="muted">
                      {e.subtitle}
                    </Text>
                  </View>
                  <Icon name="chevronL" size={18} color={colors.textMuted} />
                </Pressable>
              </FadeInUp>
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const CAT_ICON: Record<CalendarCategory, 'appointment' | 'flask' | 'wallet'> = {
  appointment: 'appointment',
  labcase: 'flask',
  payment: 'wallet',
};

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text variant="caption" tone="secondary">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  todayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },

  calCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadow.card,
  },
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  monthLabel: { alignItems: 'center' },
  weekRow: { flexDirection: 'row', marginTop: spacing.xs },
  weekCell: { flex: 1, alignItems: 'center' },
  weekText: { fontFamily: fonts.medium, color: colors.textMuted },
  holidayText: { color: colors.danger },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, padding: 3 },
  dayInner: {
    flex: 1,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  daySelected: { backgroundColor: colors.primary, ...shadow.glow },
  dayToday: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dayNum: { color: colors.textPrimary },
  dayTodayText: { color: colors.primaryDark, fontFamily: fonts.bold },
  daySelectedText: { color: colors.onPrimary, fontFamily: fonts.bold },
  dots: { flexDirection: 'row', gap: 2, height: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    justifyContent: 'center',
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },

  agendaHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  agendaTitleWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  holidayChip: {
    backgroundColor: withAlpha(colors.danger, 0.16),
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  holidayChipText: { color: colors.danger, fontFamily: fonts.medium },
  eventList: { gap: spacing.sm },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadow.card,
  },
  eventIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventBody: { flex: 1, gap: 2 },
});
