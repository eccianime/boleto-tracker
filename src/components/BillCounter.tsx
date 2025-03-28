import LogoWhiteSvg from '@/assets/svg/logo-white.svg';
import { Text, View } from 'react-native';
import { BillCounterProps } from './types';

export default function BillCounter({ count }: BillCounterProps) {
  const hasBills = count > 0;
  const billText = count === 1 ? 'boleto' : 'boletos';
  const registeredText = count > 2 ? 'cadastrados' : 'cadastrado';

  return (
    <View className='self-center px-8 mt-[-40] h-20 rounded-md bg-secondary justify-center items-center flex-row'>
      <LogoWhiteSvg width={56} height={35} />
      <View className='h-8 border-l border-white mx-6' />
      <View>
        <Text className='text-white font-inter-regular text-md leading-6'>
          Você{' '}
          {hasBills ? (
            <Text>
              tem{' '}
              <Text className='font-inter-bold'>
                {count} {billText}
              </Text>
            </Text>
          ) : (
            <Text className='font-inter-bold'>não tem {billText}</Text>
          )}
          {'\n'}
          {registeredText} para pagar
        </Text>
      </View>
    </View>
  );
}
