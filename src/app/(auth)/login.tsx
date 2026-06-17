import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/design/components/Button';
import { Card } from '@/design/components/Card';
import { Input } from '@/design/components/Input';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { spacing } from '@/design/tokens';
import { CLINIC } from '@/core/clinic';
import { AppError } from '@/core/errors/AppError';
import { ERROR_MESSAGES_FA } from '@/core/errors/codes';
import { useAuth } from '@/features/auth/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, cloudConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    if (!email.trim() || !password) {
      setError('ایمیل و رمز عبور را وارد کنید.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/(app)');
    } catch (err) {
      setError(err instanceof AppError ? err.userMessage : ERROR_MESSAGES_FA.UNKNOWN);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.flex}>
          <View style={styles.header}>
            <Text variant="title">مینادنت</Text>
            <Text variant="body" tone="secondary">
              مدیریت کلینیک دندان‌پزشکی {CLINIC.nameFa}
            </Text>
          </View>

          <Card>
            {!cloudConfigured ? (
              <View style={styles.notice}>
                <Text variant="caption" tone="danger">
                  پیکربندی سرویس ابری کامل نیست. ورود نیازمند تنظیم Supabase است؛ داده‌های محلی همچنان حفظ می‌شوند.
                </Text>
              </View>
            ) : null}

            <View style={styles.form}>
              <Input
                label="ایمیل"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="example@clinic.com"
              />
              <Input
                label="رمز عبور"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="••••••••"
              />
              {error ? (
                <Text variant="caption" tone="danger">
                  {error}
                </Text>
              ) : null}
              <Button title="ورود" onPress={onSubmit} loading={loading} />
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { alignItems: 'center', justifyContent: 'center', flex: 1, gap: spacing.sm },
  form: { gap: spacing.md },
  notice: { marginBottom: spacing.md },
});
