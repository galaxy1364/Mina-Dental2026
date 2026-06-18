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
import { deleteLab, LAB_TYPE_LABELS, listLabs, type Lab } from '@/features/labs/repository';

export default function LabsListScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const isManager = session?.role === 'manager';
  const [items, setItems] = useState<Lab[]>([]);

  const [type, setType] = useState<string>('all');

  const reload = useCallback(() => setItems(listLabs()), []);
  useFocusEffect(useCallback(() => reload(), [reload]));

  const types = Array.from(new Set(items.map((l) => l.type)));
  const visible = items.filter((l) => type === 'all' || l.type === type);
  const chips: ChipItem<string>[] = [
    { key: 'all', label: 'همه', count: items.length },
    ...types.map((t) => ({ key: t, label: LAB_TYPE_LABELS[t], count: items.filter((l) => l.type === t).length })),
  ];

  const confirmDelete = (l: Lab) => {
    Alert.alert('حذف لابراتوار', `«${l.name}» حذف شود؟`, [
      { text: 'انصراف', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: () => {
          deleteLab(l.id);
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
        <Text variant="title">لابراتوارها</Text>
      </View>

      {isManager ? (
        <Button title="افزودن لابراتوار جدید" onPress={() => router.push('/(app)/labs/form')} />
      ) : null}

      <ChipBar items={chips} value={type} onChange={setType} />

      <ScrollView contentContainerStyle={styles.list}>
        {visible.length === 0 ? (
          <EmptyState message="هنوز لابراتواری ثبت نشده است." />
        ) : (
          visible.map((l) => (
            <Card key={l.id}>
              <View style={styles.rowBetween}>
                <Text variant="subtitle">{l.name}</Text>
                <StatusBadge tone="synced" label={LAB_TYPE_LABELS[l.type]} />
              </View>
              {l.phone ? (
                <Text variant="caption" tone="muted">
                  {l.phone}
                </Text>
              ) : null}
              {!l.active ? (
                <View style={styles.badgeRow}>
                  <StatusBadge tone="offline" label="غیرفعال" />
                </View>
              ) : null}
              {isManager ? (
                <View style={styles.actions}>
                  <Pressable onPress={() => router.push(`/(app)/labs/form?id=${l.id}`)} hitSlop={8}>
                    <Text variant="body" tone="primary">
                      ویرایش
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => confirmDelete(l)} hitSlop={8}>
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
  rowBetween: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  badgeRow: { flexDirection: 'row-reverse', marginTop: spacing.sm },
  actions: { flexDirection: 'row-reverse', gap: spacing.lg, marginTop: spacing.md },
});
