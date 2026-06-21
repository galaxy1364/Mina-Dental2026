import { View, StyleSheet } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { BottomTabBar } from '@/design/components/BottomTabBar';
import { Screen } from '@/design/components/Screen';
import { LoadingState } from '@/design/components/StateViews';
import { colors } from '@/design/tokens';
import { useAuth } from '@/features/auth/useAuth';

export default function AppLayout() {
  const { status } = useAuth();

  if (status === 'loading') {
    return (
      <Screen>
        <LoadingState />
      </Screen>
    );
  }

  if (status === 'unauthenticated') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={styles.root}>
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      />
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, direction: 'rtl' },
});
