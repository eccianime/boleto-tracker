import { View, Text, TouchableOpacity } from 'react-native';
import { BillListItemProps } from './types';
import { currencyFormat } from '@/utils';

export default function BillListItem({
  title,
  expireDate,
  amount,
}: BillListItemProps) {
  return (
    <TouchableOpacity className='flex-row justify-between mb-8'>
      <View>
        <Text className='font-lexend-semibold text-heading text-xl mb-2'>
          {title}
        </Text>
        <Text className='font-inter-regular text-body text-md'>
          Vence em {expireDate}
        </Text>
      </View>
      <Text className='font-inter-semibold text-heading text-lg'>
        {currencyFormat(amount)}
      </Text>
    </TouchableOpacity>
  );
}
