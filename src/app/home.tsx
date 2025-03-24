import personImage from '@/assets/images/person.png';
import { useEffect } from 'react';
import {
  BackHandler,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import logoImage from '@/assets/images/logo.png';
import googleImage from '@/assets/images/google.png';

export default function Home() {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

    return () => backHandler.remove(); // Limpia el evento al desmontar
  }, []);

  return (
    <View className='flex-1'>
      <StatusBar barStyle={'light-content'} />
      <View className='bg-primary h-[320]' />
      <Image
        className='w-[258] h-[362] absolute top-[80] self-center'
        source={personImage}
      />
      <View className='items-center mt-[150]'>
        <Image source={logoImage} className='w-[72] h-[44] mb-6' />
        <Text className='text-center text-4xl text-heading font-lexend-semibold mb-10'>
          {'Organize seus\nboletos em um\nsó lugar'}
        </Text>
        <TouchableOpacity className='w-[300] h-14 border border-stroke bg-boxes rounded flex-row'>
          <View className='w-14 border-r border-stroke items-center justify-center'>
            <Image source={googleImage} className='h-6 w-6' />
          </View>
          <View className='flex-1 items-center justify-center'>
            <Text className='text-base text-heading font-inter-regular'>
              {'Entrar com Google'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
