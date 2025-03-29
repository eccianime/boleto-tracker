import colors from '@/config/colors';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList, Platform, Text, View } from 'react-native';
import BillListItem from './BillListItem';
import { BillListItemProps, BillListProps } from './types';
import { useAppDispatch } from '@/hooks';
import { setBottomSheetVisible } from '@/redux/slices';

const ListHeader = ({
  title,
  payedNumber,
}: {
  title: string;
  payedNumber: number;
}) => (
  <View className='mt-8'>
    <View className='flex-row justify-between items-center'>
      <Text className='text-2xl font-lexend-semibold text-heading'>
        {title}
      </Text>
      {payedNumber > 0 && (
        <Text className='text-body font-inter-regular text-md'>
          {payedNumber} pagos
        </Text>
      )}
    </View>
    <View className='border-t border-stroke mt-6 mb-8' />
  </View>
);

const EmptyList = ({ isPayed }: { isPayed?: boolean }) => (
  <View className='flex-1 justify-center items-center'>
    <Text className='font-inter-regular text-body text-lg'>
      Nenhum boleto {isPayed ? 'pago' : 'cadastrado'}
    </Text>
  </View>
);

const LoadingIndicator = () => (
  <View className='flex-1 justify-center items-center'>
    <FontAwesome
      name='spinner'
      size={40}
      color={colors.primary}
      className='animate-spin'
    />
  </View>
);

export default function BillList({
  title,
  data,
  isPayed,
  isLoading,
}: BillListProps) {
  const payedNumber = isPayed ? data.length : 0;
  const contentContainerClassName = `flex-grow mx-6 ${
    Platform.OS === 'ios' ? 'pb-[100]' : 'pb-[70]'
  }`;

  const dispatch = useAppDispatch();

  const handleShowBottomSheet = (item: BillListItemProps) => {
    if (!isPayed) {
      const { id, title, amount } = item;
      const data = {
        id,
        title,
        amount,
      };
      dispatch(setBottomSheetVisible({ isVisible: true, data }));
    }
  };

  if (isLoading) {
    return (
      <View className='flex-1 mx-6'>
        <ListHeader title={title} payedNumber={payedNumber} />
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerClassName={contentContainerClassName}
      data={data}
      ListHeaderComponent={() => (
        <ListHeader title={title} payedNumber={payedNumber} />
      )}
      renderItem={({ item }) => (
        <BillListItem
          {...item}
          handleShowBottomSheet={() => handleShowBottomSheet(item)}
        />
      )}
      ListEmptyComponent={() => <EmptyList isPayed={isPayed} />}
      ListFooterComponentClassName='flex-1 justify-center items-center'
    />
  );
}
