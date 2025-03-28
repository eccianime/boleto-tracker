import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { HeaderProps } from './types';
import { useAppDispatch } from '@/hooks';
import { logOut } from '@/redux/actions';
import { router } from 'expo-router';

export default function Header({ hasExtraHeight, name, photo }: HeaderProps) {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    Alert.alert('Confirmar saída', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: () => {
          router.navigate('/(auth)/start');
          dispatch(logOut());
        },
      },
    ]);
  };
  return (
    <View
      className={`${
        hasExtraHeight ? 'h-[180]' : 'h-[150]'
      }  bg-primary flex-row justify-between px-6 pt-16`}
    >
      <View className='flex-row gap-2'>
        {photo ? (
          <Image
            source={{ uri: photo }}
            className='rounded-md w-12 h-12 mt-2'
          />
        ) : (
          <View className='w-12 h-12 bg-white rounded-md'>
            <Ionicons name='person' size={24} color='black' />
          </View>
        )}
        <View className='gap-1'>
          <Text className='font-lexend-regular text-white text-2xl'>
            Olá, <Text className='font-lexend-semibold'>{name}</Text>
          </Text>
          <Text className='text-white font-inter-regular text-lg'>
            Mantenha suas contas em dia
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogOut}>
        <Ionicons name='power' size={24} color={'white'} className='p-4' />
      </TouchableOpacity>
    </View>
  );
}
