import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import { Icon, type IconName } from '../icons/Icon';
import { colors, fonts, radius, shadow, spacing } from '../tokens';
import { Text } from './Text';

interface Tab {
  key: string;
  label: string;
  icon: IconName;
  route: string;
}

const TABS: Tab[] = [
  { key: 'home', label: 'خانه', icon: 'home', route: '/(app)/' },
  { key: 'calendar', label: 'تقویم', icon: 'calendar', route: '/(app)/calendar' },
  { key: 'patients', label: 'بیماران', icon: 'tooth', route: '/(app)/patients' },
  { key: 'finance', label: 'مالی', icon: 'wallet', route: '/(app)/payments' },
  { key: 'more', label: 'خدمات', icon: 'grid', route: '/(app)/more' },
];

/** Routes (normalized pathname) where the persistent tab bar is shown. */
const VISIBLE_ON = new Set(['/', '/calendar', '/patients', '/payments', '/more']);

export function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  if (!VISIBLE_ON.has(pathname)) return null;

  return (
    <View style={[styles.dockWrap, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={styles.bar}>
      {TABS.map((t) => {
        const active = isActive(pathname, t);
        return (
          <Pressable
            key={t.key}
            style={styles.item}
            onPress={() => {
              if (!active) router.replace(t.route as never);
            }}
          >
            <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
              <Icon
                name={t.icon}
                size={23}
                color={active ? colors.onPrimary : colors.textMuted}
                strokeWidth={active ? 2.3 : 1.9}
              />
            </View>
            <Text
              variant="caption"
              style={[styles.label, { color: active ? colors.textPrimary : colors.textMuted }]}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
      </View>
    </View>
  );
}

function isActive(pathname: string, tab: Tab): boolean {
  if (tab.key === 'home') return pathname === '/';
  return pathname === `/${tab.key}` || pathname === tab.route.replace('/(app)', '');
}

const styles = StyleSheet.create({
  dockWrap: {
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xs,
    ...shadow.float,
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  iconWrap: {
    width: 46,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: { backgroundColor: colors.primary, ...shadow.glow },
  label: { fontFamily: fonts.medium, fontSize: 11 },
});
