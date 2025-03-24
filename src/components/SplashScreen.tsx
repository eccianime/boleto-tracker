import splashImage from '@/assets/images/splash-icon.png';
import { Image, View } from 'react-native';

export default function SplashScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Image source={splashImage} className='w-[242] h-[374]' />
    </View>
  );
}
