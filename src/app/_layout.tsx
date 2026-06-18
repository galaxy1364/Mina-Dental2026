import { useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Vazirmatn_400Regular,
  Vazirmatn_500Medium,
  Vazirmatn_700Bold,
} from '@expo-google-fonts/vazirmatn';
import { boot } from '@/core/boot';
import { AppProviders } from '@/providers/AppProviders';
import { colors } from '@/design/tokens';

// RTL is realized purely through explicit `flexDirection: 'row-reverse'` +
// `textAlign: 'right'` layouts, NOT via native RTL. `I18nManager.forceRTL` is
// unreliable in Expo Go (it only applies after a reload, so the layout direction
// would oscillate between launches). Pin native RTL OFF so `row-reverse` always
// means right-to-left deterministically across every launch.
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [booted, setBooted] = useState(false);
  const [fontsLoaded] = useFonts({
    Vazirmatn_400Regular,
    Vazirmatn_500Medium,
    Vazirmatn_700Bold,
  });

  useEffect(() => {
    try {
      boot();
    } finally {
      setBooted(true);
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded && booted) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, booted]);

  if (!fontsLoaded || !booted) return null;

  return (
    <AppProviders>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </AppProviders>
  );
}
