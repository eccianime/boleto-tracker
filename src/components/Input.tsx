import colors from '@/config/colors';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { InputProps } from './types';
import { forwardRef, memo } from 'react';

const Input = forwardRef<TextInput | null, InputProps>(
  ({ iconName, placeholder, isError = false, ...props }: InputProps, ref) => {
    console.log('Reder input', Math.random());

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
          ref={ref && ref}
          placeholderTextColor={colors.inputs}
          className={`h-12 p-4  flex-1 font-lexend-regular`}
          placeholder={placeholder}
          {...props}
        />
      </View>
    );
  }
);

export default Input;
