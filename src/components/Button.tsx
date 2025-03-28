import { Text, TouchableOpacity } from 'react-native';
import { ButtonProps } from './types';
import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

export default function Button({
  text,
  variant,
  isLoading,
  ...props
}: ButtonProps) {
  const bgColor =
    variant === 'primary' ? 'bg-primary' : 'border bg-boxes border-stroke';
  const textColor =
    variant === 'primary'
      ? 'text-white font-lexend-semibold'
      : 'text-secondary';
  return (
    <TouchableOpacity
      disabled={isLoading}
      className={`h-14 rounded-md items-center justify-center ${bgColor}`}
      {...props}
    >
      {isLoading ? (
        <FontAwesome
          name='spinner'
          size={24}
          color='white'
          className='animate-spin'
        />
      ) : (
        <Text className={`${textColor} font-inter-regular text-lg`}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
