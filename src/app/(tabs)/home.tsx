import BillCounter from '@/components/BillCounter';
import BillList from '@/components/BillList';
import Header from '@/components/Header';
import { DATA } from '@/data/mockData';
import { useAppSelector } from '@/hooks';
import { View } from 'react-native';

export default function Home() {
  const { givenName, photo } = useAppSelector((state) => state.user);

  return (
    <View className='flex-1'>
      <Header hasExtraHeight name={givenName} photo={photo} />
      <BillCounter count={14} />
      <BillList data={DATA} title={'Meus boletos'} />
    </View>
  );
}
