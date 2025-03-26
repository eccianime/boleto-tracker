import { View, Text, TouchableOpacity } from 'react-native';
import { BillListItemProps } from './types';
import { currencyFormat } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { setBottomSheetVisible } from '@/redux/slices';

export default function BillListItem({
  id,
  title,
  expireDate,
  amount,
}: BillListItemProps) {
  const dispatch = useAppDispatch();

  const handleShowBottomSheet = () => {
    const data = {
      id,
      title,
      amount,
    };
    dispatch(setBottomSheetVisible({ isVisible: true, data }));
  };

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
