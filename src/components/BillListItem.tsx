import { currencyFormat } from '@/utils';
import { Text, TouchableOpacity, View } from 'react-native';
import { BillListItemProps } from './types';

export default function BillListItem({
  id,
  title,
  expireDate,
  amount,
  handleShowBottomSheet,
}: BillListItemProps) {
  return (
    <TouchableOpacity
      className='flex-row justify-between mb-8'
      onPress={handleShowBottomSheet}
    >
      <View className='flex-1'>
        <Text
          className='font-lexend-semibold text-heading text-xl mb-2'
          numberOfLines={2}
        >
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
