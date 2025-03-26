import colors from '@/config/colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput } from 'react-native';
import { InputProps } from './types';

export default function Input({ iconName, placeholder, ...props }: InputProps) {
  return (
    <View className='flex-row'>
      <View className='items-center justify-center w-12 h-12 border-r border-b border-stroke'>
        <Ionicons name={iconName} size={24} color={colors.primary} />
      </View>
      <TextInput
        placeholderTextColor={colors.inputs}
        className='h-12 p-4 mb-4 border-b border-stroke flex-1 font-lexend-regular'
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
}
