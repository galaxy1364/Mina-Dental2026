import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Card } from '@/design/components/Card';
import { ChipBar, type ChipItem } from '@/design/components/ChipBar';
import { Screen } from '@/design/components/Screen';
import { EmptyState, StatusBadge } from '@/design/components/StateViews';
import { Text } from '@/design/components/Text';
import { colors, spacing } from '@/design/tokens';
import { useAuth } from '@/features/auth/useAuth';
import {
  deleteStaff,
  listStaff,
  STAFF_ROLE_LABELS,
  type Staff,
} from '@/features/staff/repository';

export default function StaffListScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const isManager = session?.role === 'manager';
  const [items, setItems] = useState<Staff[]>([]);

  const [role, setRole] = useState<string>('all');

  const reload = useCallback(() => setItems(listStaff()), []);
  useFocusEffect(useCallback(() => reload(), [reload]));

  const roles = Array.from(new Set(items.map((s) => s.role)));
  const visible = items.filter((s) => role === 'all' || s.role === role);
  const chips: ChipItem<string>[] = [
    { key: 'all', label: 'همه', count: items.length },
    ...roles.map((r) => ({ key: r, label: STAFF_ROLE_LABELS[r], count: items.filter((s) => s.role === r).length })),
  ];

  const confirmDelete = (s: Staff) => {
    Alert.alert('حذف کارمند', `«${s.fullName}» حذف شود؟`, [
      { text: 'انصراف', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: () => {
          deleteStaff(s.id);
          reload();
        },
      },
    ]);
  };

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Button title="بازگشت ›" kind="ghost" onPress={() => router.back()} />
        <Text variant="title">کادر درمان و پرسنل</Text>
      </View>

      {isManager ? (
        <Button title="افزودن کارمند جدید" onPress={() => router.push('/(app)/staff/form')} />
      ) : null}

      <ChipBar items={chips} value={role} onChange={setRole} />

      <ScrollView contentContainerStyle={styles.list}>
        {visible.length === 0 ? (
          <EmptyState message="هنوز کارمندی ثبت نشده است." />
        ) : (
          visible.map((s) => (
            <Card key={s.id}>
              <View style={styles.rowBetween}>
                <Text variant="subtitle">{s.fullName}</Text>
                <StatusBadge tone="synced" label={STAFF_ROLE_LABELS[s.role]} />
              </View>
              {s.mobile ? (
                <Text variant="caption" tone="muted">
                  {s.mobile}
                </Text>
              ) : null}
              {!s.active ? (
                <View style={styles.badgeRow}>
                  <StatusBadge tone="offline" label="غیرفعال" />
                </View>
              ) : null}
              {isManager ? (
                <View style={styles.actions}>
                  <Pressable onPress={() => router.push(`/(app)/staff/form?id=${s.id}`)} hitSlop={8}>
                    <Text variant="body" tone="primary">
                      ویرایش
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => confirmDelete(s)} hitSlop={8}>
                    <Text variant="body" style={{ color: colors.danger }}>
                      حذف
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </Card>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  list: { gap: spacing.md, paddingBottom: spacing.xl },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badgeRow: { flexDirection: 'row', marginTop: spacing.sm },
  actions: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
});
