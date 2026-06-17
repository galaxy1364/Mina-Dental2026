import { Redirect } from 'expo-router';
import { Screen } from '@/design/components/Screen';
import { LoadingState } from '@/design/components/StateViews';
import { useAuth } from '@/features/auth/useAuth';

export default function Index() {
  const { status } = useAuth();

  if (status === 'loading') {
    return (
      <Screen>
        <LoadingState label="در حال آماده‌سازی…" />
      </Screen>
    );
  }

  return <Redirect href={status === 'authenticated' ? '/(app)' : '/(auth)/login'} />;
}
