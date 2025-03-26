import colors from '@/config/colors';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  View,
} from 'react-native';
import BillListItem from './BillListItem';
import { BillListProps } from './types';

export default function BillList({
  title,
  data,
  isPayed,
  isLoading,
}: BillListProps) {
  return (
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerClassName={`flex-grow mx-6 ${
        Platform.OS === 'ios' ? 'pb-[100]' : 'pb-[70]'
      }`}
      data={data}
      ListHeaderComponent={() => (
        <View className='mt-8'>
          <View className='flex-row justify-between items-center'>
            <Text className='text-2xl font-lexend-semibold text-heading'>
              {title}
            </Text>
            {isPayed && (
              <Text className='text-body font-inter-regular text-md'>
                {data.length} pagos
              </Text>
            )}
          </View>
          <View className='border-t border-stroke mt-6 mb-8' />
        </View>
      )}
      renderItem={({ item }) => <BillListItem {...item} />}
      ListEmptyComponent={() =>
        !isLoading && (
          <View className='flex-1 justify-center items-center'>
            <Text className='font-inter-regular text-body text-lg'>
              Nenhum boleto {isPayed ? 'pago' : 'cadastrado'}
            </Text>
          </View>
        )
      }
      ListFooterComponentClassName='flex-1 justify-center items-center'
      ListFooterComponent={() =>
        isLoading && <ActivityIndicator size='large' color={colors.primary} />
      }
    />
  );
}
