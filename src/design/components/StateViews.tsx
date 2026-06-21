import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../tokens';
import { withAlpha } from '@/lib/color';
import { Button } from './Button';
import { Text } from './Text';

/**
 * The 8 mandatory UI states for every data-driven screen:
 * Loading · Error · Empty · Offline · Retry · SavedLocally · PendingSync · Conflict.
 */

function Centered({ children }: { children: React.ReactNode }) {
  return <View style={styles.centered}>{children}</View>;
}

export function LoadingState({ label = 'در حال بارگذاری…' }: { label?: string }) {
  return (
    <Centered>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text variant="body" tone="secondary">
        {label}
      </Text>
    </Centered>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Centered>
      <Text variant="subtitle" tone="danger">
        خطا
      </Text>
      <Text variant="body" tone="secondary" style={styles.center}>
        {message}
      </Text>
      {onRetry ? <Button title="تلاش دوباره" kind="secondary" onPress={onRetry} /> : null}
    </Centered>
  );
}

export function EmptyState({ message = 'موردی برای نمایش وجود ندارد.' }: { message?: string }) {
  return (
    <Centered>
      <Text variant="body" tone="muted" style={styles.center}>
        {message}
      </Text>
    </Centered>
  );
}

export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <Centered>
      <Text variant="subtitle" tone="secondary">
        آفلاین
      </Text>
      <Text variant="body" tone="muted" style={styles.center}>
        اتصال اینترنت برقرار نیست. برنامه به‌صورت محلی کار می‌کند و به‌محض اتصال همگام می‌شود.
      </Text>
      {onRetry ? <Button title="بررسی اتصال" kind="secondary" onPress={onRetry} /> : null}
    </Centered>
  );
}

type BadgeTone = 'savedLocally' | 'pendingSync' | 'conflict' | 'synced' | 'offline';

const BADGE: Record<BadgeTone, { bg: string; fg: string; label: string }> = {
  savedLocally: { bg: colors.primaryLight, fg: colors.primaryDark, label: 'ذخیره‌شده محلی' },
  pendingSync: { bg: withAlpha(colors.pendingSync, 0.16), fg: colors.pendingSync, label: 'در صف همگام‌سازی' },
  conflict: { bg: withAlpha(colors.conflict, 0.16), fg: colors.conflict, label: 'تعارض داده' },
  synced: { bg: withAlpha(colors.synced, 0.16), fg: colors.synced, label: 'همگام شد' },
  offline: { bg: colors.surfaceAlt, fg: colors.offline, label: 'آفلاین' },
};

export function StatusBadge({ tone, label }: { tone: BadgeTone; label?: string }) {
  const b = BADGE[tone];
  return (
    <View style={[styles.badge, { backgroundColor: b.bg }]}>
      <Text variant="caption" style={{ color: b.fg }}>
        {label ?? b.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  center: { textAlign: 'center' },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
});
