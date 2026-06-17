import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Card } from '@/design/components/Card';
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

  const reload = useCallback(() => setItems(listStaff()), []);
  useFocusEffect(useCallback(() => reload(), [reload]));

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
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text variant="body" tone="primary">
            ← بازگشت
          </Text>
        </Pressable>
        <Text variant="title">کادر درمان و پرسنل</Text>
      </View>

      {isManager ? (
        <Button title="افزودن کارمند جدید" onPress={() => router.push('/(app)/staff/form')} />
      ) : null}

      <ScrollView contentContainerStyle={styles.list}>
        {items.length === 0 ? (
          <EmptyState message="هنوز کارمندی ثبت نشده است." />
        ) : (
          items.map((s) => (
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
  header: { gap: spacing.xs, marginBottom: spacing.md },
  list: { gap: spacing.md, paddingBottom: spacing.xl },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badgeRow: { flexDirection: 'row', marginTop: spacing.sm },
  actions: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
});
