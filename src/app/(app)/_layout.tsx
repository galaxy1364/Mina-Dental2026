import { Redirect, Stack } from 'expo-router';
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
    <Stack
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
    />
  );
}
