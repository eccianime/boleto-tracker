import { Text, TouchableOpacity } from 'react-native';
import { ButtonProps } from './types';
import { FontAwesome } from '@expo/vector-icons';

export default function Button({
  text,
  variant,
  isLoading,
  className,
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const bgColor = isPrimary ? 'bg-primary' : 'border bg-boxes border-stroke';
  const textColor = isPrimary
    ? 'text-white font-lexend-semibold'
    : 'text-secondary';
  const spinnerColor = isPrimary ? 'white' : '#555'; // Ajusta el color secundario según tu paleta

  return (
    <TouchableOpacity
      disabled={isLoading}
      className={`h-14 rounded-md items-center justify-center ${bgColor} ${className}`}
      {...props}
    >
      {isLoading ? (
        <FontAwesome
          name='spinner'
          size={24}
          color={spinnerColor}
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
