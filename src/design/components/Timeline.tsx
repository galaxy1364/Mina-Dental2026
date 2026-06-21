import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../tokens';
import { TONE_COLORS } from '../tone';
import { Text } from './Text';
import { formatJalaliDateTime } from '@/lib/jalali';
import type { TimelineEvent } from '@/features/journey/engine';

/** Vertical, RTL chronological timeline for a patient's journey. */
export function Timeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return (
      <Text variant="caption" tone="muted" style={styles.empty}>
        هنوز رویدادی ثبت نشده است.
      </Text>
    );
  }
  return (
    <View style={styles.wrap}>
      {events.map((e, i) => {
        const t = TONE_COLORS[e.tone];
        const last = i === events.length - 1;
        return (
          <View key={e.id} style={styles.item}>
            <View style={styles.rail}>
              <View style={[styles.dot, { backgroundColor: t.fg }]} />
              {!last ? <View style={styles.line} /> : null}
            </View>
            <View style={styles.body}>
              <Text variant="body" style={styles.title}>
                {e.title}
              </Text>
              {e.subtitle ? (
                <Text variant="caption" tone="secondary" style={styles.title}>
                  {e.subtitle}
                </Text>
              ) : null}
              <Text variant="caption" tone="muted" style={styles.title}>
                {formatJalaliDateTime(e.at)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 0 },
  empty: { textAlign: 'right', paddingVertical: spacing.md },
  item: { flexDirection: 'row', gap: spacing.md },
  rail: { alignItems: 'center', width: 16 },
  dot: { width: 12, height: 12, borderRadius: radius.pill, marginTop: 4 },
  line: { flex: 1, width: 2, backgroundColor: colors.border, marginVertical: 2 },
  body: { flex: 1, paddingBottom: spacing.lg, gap: 2 },
  title: { textAlign: 'right' },
});
