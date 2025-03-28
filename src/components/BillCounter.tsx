import { View, Text } from 'react-native';
import LogoWhiteSvg from '@/assets/svg/logo-white.svg';
import { BillCounterProps } from './types';

export default function BillCounter({ count }: BillCounterProps) {
  return (
    <View className='self-center px-8 mt-[-40] h-20 rounded-md bg-secondary justify-center items-center flex-row'>
      <LogoWhiteSvg width={56} height={35} />
      <View className='h-8 border-l border-white mx-6' />
      <View>
        <Text className='text-white font-inter-regular text-md leading-6'>
          Você tem <Text className='font-inter-bold'>{count} boletos</Text>
          {'\n'}cadastrados para pagar
        </Text>
      </View>
    </View>
  );
}
