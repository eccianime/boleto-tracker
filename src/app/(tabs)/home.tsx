import { View } from 'react-native';

import BillCounter from '@/components/BillCounter';
import BillList from '@/components/BillList';
import BottomSheet from '@/components/BottomSheet';
import Header from '@/components/Header';

import { DATA } from '@/data/mockData';
import { useAppSelector } from '@/hooks';

export default function Home() {
  const { givenName, photo } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.app);

  return (
    <View className='flex-1'>
      <Header hasExtraHeight name={givenName} photo={photo} />
      <BillCounter count={14} />
      <BillList data={DATA} title={'Meus boletos'} isLoading={isLoading} />
      <BottomSheet />
    </View>
  );
}
