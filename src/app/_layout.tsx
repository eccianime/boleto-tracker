import '../../global.css';

import { Stack } from 'expo-router';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import {
  Lexend_400Regular,
  Lexend_600SemiBold,
} from '@expo-google-fonts/lexend';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      >
        <Stack.Screen name='index' />
      </Stack>
    </Provider>
  );
}
