import BillList from '@/components/BillList';
import Header from '@/components/Header';
import { useAppSelector } from '@/hooks';
import { View } from 'react-native';

export default function History() {
  const { givenName, photo } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.app);

  return (
    <View className='flex-1'>
      <Header name={givenName} photo={photo} />
      <BillList
        data={[]}
        title={'Meus extratos'}
        isPayed
        isLoading={isLoading}
      />
    </View>
  );
}
