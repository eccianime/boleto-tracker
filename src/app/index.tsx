import SplashScreen from '@/components/SplashScreen';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.navigate('/auth');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return <SplashScreen />;
}
