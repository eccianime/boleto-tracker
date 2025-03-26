import { Text, TouchableOpacity } from 'react-native';
import { ButtonProps } from './types';

export default function Button({ text, variant, ...props }: ButtonProps) {
  const bgColor =
    variant === 'primary' ? 'bg-primary' : 'border bg-boxes border-stroke';
  const textColor =
    variant === 'primary'
      ? 'text-white font-lexend-semibold'
      : 'text-secondary';
  return (
    <TouchableOpacity
      className={`h-14 rounded-md items-center justify-center ${bgColor}`}
      {...props}
    >
      <Text className={`${textColor} font-inter-regular text-lg`}>{text}</Text>
    </TouchableOpacity>
  );
}
