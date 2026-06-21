import { StyleSheet, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../tokens';
import { Text } from './Text';

/**
 * MinaDent brand mark — a modern squircle "tooth/enamel" glyph paired with the
 * Persian wordmark. 2026-trend: soft squircle, layered tones, calm teal.
 */
export function Logo({ size = 44, showWordmark = true }: { size?: number; showWordmark?: boolean }) {
  return (
    <View style={styles.row}>
      <View
        style={[
          styles.mark,
          { width: size, height: size, borderRadius: size * 0.32 },
        ]}
      >
        <View style={[styles.crown, { width: size * 0.42, height: size * 0.5 }]} />
        <View style={[styles.crown, styles.crownRight, { width: size * 0.42, height: size * 0.5 }]} />
      </View>
      {showWordmark ? (
        <View style={styles.words}>
          <Text variant="title" style={styles.wordTop}>
            مینادنت
          </Text>
          <Text variant="caption" tone="muted" style={styles.wordSub}>
            MinaDent Clinic
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  mark: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  crown: {
    backgroundColor: colors.textInverse,
    borderTopLeftRadius: radius.pill,
    borderTopRightRadius: radius.pill,
    borderBottomLeftRadius: radius.sm,
    borderBottomRightRadius: radius.sm,
    opacity: 0.95,
  },
  crownRight: { opacity: 0.7 },
  words: { alignItems: 'flex-start' },
  wordTop: { fontFamily: fonts.bold, lineHeight: 30 },
  wordSub: { letterSpacing: 1 },
});
