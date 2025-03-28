import Button from '@/components/Button';
import Input from '@/components/Input';
import colors from '@/config/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register() {
  return (
    <KeyboardAwareScrollView>
      <StatusBar barStyle={'dark-content'} />
      <View className='flex-1 m-6 mt-[60]'>
        <TouchableOpacity onPress={router.back}>
          <Ionicons name={'arrow-back'} size={24} color={colors.inputs} />
        </TouchableOpacity>
        <Text className='text-center text-3xl text-heading font-lexend-semibold mt-6'>
          Registrar usuário
        </Text>
        <View className='my-6 gap-4'>
          <TouchableOpacity className='self-center my-6 h-[150] w-[150] rounded-full items-center justify-center bg-gray-200'>
            <Ionicons name={'person-outline'} size={60} color={colors.inputs} />
          </TouchableOpacity>
          <Input iconName='person-outline' placeholder='Insira nome' />
          <Input iconName='mail-outline' placeholder='Insira email' />
          <Input
            iconName='lock-closed-outline'
            placeholder='Insira sua senha'
          />
          <Input
            iconName='lock-closed-outline'
            placeholder='Repita sua senha'
          />
        </View>
        <Button text='Registrar' variant='primary' />
      </View>
    </KeyboardAwareScrollView>
  );
}
