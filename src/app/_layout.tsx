import '../../global.css';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import {
  Lexend_100Thin,
  Lexend_200ExtraLight,
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black,
} from '@expo-google-fonts/lexend';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Lexend_100Thin,
    // Lexend_200ExtraLight,
    // Lexend_300Light,
    Lexend_400Regular,
    // Lexend_500Medium,
    Lexend_600SemiBold,
    //   Lexend_700Bold,
    //   Lexend_800ExtraBold,
    //   Lexend_900Black,
    //   Inter_100Thin,
    // Inter_200ExtraLight,
    // Inter_300Light,
    Inter_400Regular,
    // Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    // Inter_800ExtraBold,
    // Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hide();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    />
  );
}
