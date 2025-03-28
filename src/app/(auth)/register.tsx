import Button from '@/components/Button';
import Input from '@/components/Input';
import colors from '@/config/colors';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { emailRegister } from '@/redux/actions';
import { SignInResponseProps } from '@/redux/types';
import { isAllFieldsValid } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';

export default function Register() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.app);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: '',
  });

  const handleRegister = async () => {
    try {
      if (!isAllFieldsValid(formData)) return;

      const result = await dispatch(emailRegister(formData)).unwrap();
      if (result.success) {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      Alert.alert('Atenção', `Ocorreu um erro ao registrar o usuário`);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      legacy: true,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photo: result.assets[0].uri });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <View className='flex-1 m-6 mt-8'>
        <TouchableOpacity onPress={router.back}>
          <Ionicons name={'arrow-back'} size={24} color={colors.inputs} />
        </TouchableOpacity>
        <Text className='text-center text-3xl text-heading font-lexend-semibold mt-6'>
          Registrar usuário
        </Text>
        <View className='my-6 gap-4'>
          {formData.photo ? (
            <View className='self-center my-6'>
              <Image
                source={{ uri: formData.photo }}
                className='h-[150] w-[150] rounded-full items-center justify-center bg-gray-200'
              />
              <TouchableOpacity
                className='absolute right-0 bottom-0 bg-white rounded-full'
                onPress={() => setFormData({ ...formData, photo: '' })}
              >
                <Ionicons name='close-circle' size={40} color={colors.delete} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className='self-center my-6 h-[150] w-[150] rounded-full items-center justify-center bg-gray-200'
              onPress={pickImage}
            >
              <Ionicons name={'image'} size={72} color={colors.inputs} />
              <View className='absolute right-0 bottom-0 bg-white rounded-full'>
                <Ionicons name='add-circle' size={40} color={colors.primary} />
              </View>
            </TouchableOpacity>
          )}
          <Input
            iconName='person-outline'
            placeholder='Nome'
            value={formData.name}
            onChangeText={(name: string) => setFormData({ ...formData, name })}
          />
          <Input
            iconName='person-outline'
            placeholder='Sobrenome'
            value={formData.lastName}
            onChangeText={(lastName: string) =>
              setFormData({ ...formData, lastName })
            }
          />
          <Input
            iconName='mail-outline'
            placeholder='Email'
            value={formData.email}
            onChangeText={(email: string) =>
              setFormData({ ...formData, email })
            }
          />
          <Input
            iconName='lock-closed-outline'
            placeholder='Senha'
            value={formData.password}
            secureTextEntry
            onChangeText={(password: string) =>
              setFormData({ ...formData, password })
            }
          />
          <Input
            iconName='lock-closed-outline'
            placeholder='Repita senha'
            value={formData.confirmPassword}
            secureTextEntry
            onChangeText={(confirmPassword: string) =>
              setFormData({ ...formData, confirmPassword })
            }
          />
        </View>
        <Button
          isLoading={isLoading}
          text='Registrar'
          variant='primary'
          onPress={handleRegister}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
