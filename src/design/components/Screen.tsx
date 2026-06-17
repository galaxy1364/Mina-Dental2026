import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors, spacing } from '../tokens';

interface ScreenProps {
  children: ReactNode;
  padded?: boolean;
  edges?: readonly Edge[];
  style?: ViewStyle;
}

/** Base screen: SafeAreaView, app background, RTL container. */
export function Screen({ children, padded = true, edges = ['top', 'bottom'], style }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <View style={[styles.container, padded && styles.padded, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, direction: 'rtl' },
  padded: { padding: spacing.lg },
});
