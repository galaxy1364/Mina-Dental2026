import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { colors, radius } from './tokens';

/**
 * Motion primitives for the banking foundation, built on React Native's core
 * `Animated` API (no Reanimated babel plugin required — safe in Expo Go SDK 54).
 * Provides: press-scale feedback, skeleton shimmer, count-up numerals, and a
 * fade/slide entrance for staggered lists.
 */

/** Press-to-scale wrapper (banking tap feedback). Wraps any pressable content. */
export function PressableScale({
  children,
  style,
  scaleTo = 0.97,
  ...rest
}: PressableProps & { children: ReactNode; style?: StyleProp<ViewStyle>; scaleTo?: number }) {
  const scale = useRef(new Animated.Value(1)).current;
  const to = (v: number) =>
    Animated.spring(scale, { toValue: v, useNativeDriver: true, speed: 40, bounciness: 6 }).start();
  return (
    <Pressable
      onPressIn={() => to(scaleTo)}
      onPressOut={() => to(1)}
      {...rest}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

/** A single shimmering placeholder block. */
export function Skeleton({
  width,
  height = 14,
  style,
}: {
  width?: number | `${number}%`;
  height?: number;
  style?: ViewStyle;
}) {
  const pulse = useRef(new Animated.Value(0.4)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);
  return (
    <Animated.View
      style={[
        { width: width ?? '100%', height, borderRadius: radius.sm, backgroundColor: colors.surfaceAlt, opacity: pulse },
        style,
      ]}
    />
  );
}

/** A list of skeleton "cards" matching the banking list-row footprint. */
export function SkeletonList({ rows = 6 }: { rows?: number }) {
  return (
    <View style={styles.skList}>
      {Array.from({ length: rows }).map((_, i) => (
        <View key={i} style={styles.skRow}>
          <View style={styles.skTexts}>
            <Skeleton width="55%" height={15} />
            <Skeleton width="35%" height={12} />
          </View>
          <Skeleton width={40} height={40} style={{ borderRadius: radius.md }} />
        </View>
      ))}
    </View>
  );
}

/**
 * Animated count-up for numerals. `format` maps the live number to the displayed
 * string (e.g. Toman + Persian digits). Driven in JS via rAF so the formatted
 * text updates each frame; cheap for the handful of dashboard figures.
 */
export function useCountUp(value: number, duration = 650): number {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    const start = Date.now();
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = Math.round(from + (to - from) * eased);
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      fromRef.current = to;
    };
  }, [value, duration]);
  return display;
}

/** Fade + slide-up entrance; pass `index` to stagger items within a list. */
export function FadeInUp({
  children,
  index = 0,
  style,
}: {
  children: ReactNode;
  index?: number;
  style?: ViewStyle;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 360,
      delay: Math.min(index, 8) * 45,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [progress, index]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  skList: { gap: 12 },
  skRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  skTexts: { flex: 1, gap: 8 },
});
