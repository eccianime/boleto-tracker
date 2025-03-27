import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { LogoSvg, PersonPng } from '@/assets';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAppDispatch } from '@/hooks';
import { signIn } from '@/redux/actions';
import { StatusBar } from 'expo-status-bar';

export default function Start() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async () => {
    const { payload } = await dispatch(signIn());
    console.log(payload);
    if (payload) {
      router.navigate('/(tabs)/home');
    }
  };

  return (
    <KeyboardAwareScrollView>
      <StatusBar style={'light'} translucent />
      <View className='bg-primary h-[270]' />
      <Image
        className={`w-[258] h-[362] absolute top-[50] self-center`}
        source={PersonPng}
      />
      <View className='mt-[100]'>
        <View className='items-center mb-6'>
          <LogoSvg width={100} height={61} />
        </View>
        <Text className='text-center text-4xl text-heading font-lexend-semibold mb-10'>
          {'Organize seus\nboletos em um\nsó lugar'}
        </Text>
        <View className='mx-6'>
          <Input
            iconName='mail-outline'
            placeholder='Insira seu email'
            value={formData.email}
            onChangeText={(email) => setFormData({ ...formData, email })}
          />
          <Input
            iconName='lock-closed-outline'
            placeholder='Insira sua senha'
            secureTextEntry
            value={formData.password}
            onChangeText={(password) => setFormData({ ...formData, password })}
          />
        </View>
        <View className='mx-6 gap-2'>
          <Button
            text='Entrar'
            variant='primary'
            onPress={() => router.navigate('/(tabs)/home')}
          />
          <Button
            text='Registro'
            variant='secondary'
            onPress={() => router.navigate('/(auth)/register')}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
