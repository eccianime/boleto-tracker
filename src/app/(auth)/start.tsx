import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { GoogleSvg, LogoSvg, PersonPng } from '@/assets';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { emailSignIn, googleSignIn } from '@/redux/actions';
import { StatusBar } from 'expo-status-bar';

export default function Start() {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.app);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleEmailSignIn = async () => {
    try {
      const result = await dispatch(emailSignIn(formData)).unwrap();
      if (result.success) {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      Alert.alert(
        'Atenção',
        'As credenciais inseridas são inválidas. Por favor, tente novamente.'
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await dispatch(googleSignIn()).unwrap();
      if (result.success) {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      Alert.alert('Atenção', `Ocorreu um erro: ${error}`);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerClassName='flex-grow'>
      <StatusBar style={'light'} translucent />
      <View className='bg-primary h-[270]' />
      <Image
        className={`w-[258] h-[362] absolute top-[50] self-center`}
        source={PersonPng}
      />
      <View className='mt-[100]'>
        <View className='items-center'>
          <LogoSvg width={100} height={61} />
        </View>
        <Text className='text-center text-4xl text-heading font-lexend-semibold my-4'>
          {'Organize seus boletos\nem um só lugar'}
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
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <View className='mx-6 gap-2'>
          <Button
            text='Entrar'
            variant='primary'
            isLoading={isLoading}
            onPress={handleEmailSignIn}
          />
          <TouchableOpacity
            disabled={isLoading}
            className=' h-14 border border-stroke bg-boxes rounded flex-row'
            onPress={handleGoogleSignIn}
          >
            <View className='w-14 border-r border-stroke items-center justify-center'>
              <GoogleSvg width={24} height={24} />
            </View>
            <View className='flex-1 items-center justify-center'>
              <Text className='text-base text-heading font-inter-regular'>
                {'Entrar com Google'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className='flex-row items-center justify-center mt-4'
            onPress={() => router.navigate('/(auth)/register')}
          >
            <Text className='font-lexend-regular text-body'>
              Ou se cadastre com seu mail{' '}
              <Text className='font-lexend-semibold text-primary'>AQUI</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
