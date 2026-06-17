import { Component, type ErrorInfo, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@/design/components/Button';
import { Screen } from '@/design/components/Screen';
import { Text } from '@/design/components/Text';
import { spacing } from '@/design/tokens';
import { createLogger } from '../logger/logger';

const log = createLogger('ErrorBoundary');

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  message: string;
}

/** App-wide crash boundary — shows a recoverable Persian fallback instead of a white screen. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    log.error('Unhandled UI error', { message: error.message, stack: info.componentStack });
  }

  private reset = () => this.setState({ hasError: false, message: '' });

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <Screen>
        <View style={styles.box}>
          <Text variant="title" tone="danger">
            خطای غیرمنتظره
          </Text>
          <Text variant="body" tone="secondary" style={styles.center}>
            مشکلی پیش آمد. می‌توانید دوباره تلاش کنید؛ اطلاعات محلی شما حفظ شده است.
          </Text>
          <Button title="تلاش دوباره" onPress={this.reset} />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  center: { textAlign: 'center' },
});
