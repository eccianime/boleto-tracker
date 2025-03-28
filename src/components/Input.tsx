import colors from '@/config/colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';
import { InputProps } from './types';

export default function Input({
  iconName,
  placeholder,
  isError = false,
  ...props
}: InputProps) {
  return (
    <View
      className={`flex-row border-b mb-4 ${
        isError ? 'border-delete' : 'border-stroke'
      }`}
    >
      <View
        className={`items-center justify-center w-12 h-12 border-r ${
          isError ? 'border-delete' : 'border-stroke'
        }`}
      >
        <Ionicons name={iconName} size={24} color={colors.primary} />
      </View>
      <TextInput
        placeholderTextColor={colors.inputs}
        className={`h-12 p-4  flex-1 font-lexend-regular`}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
}
