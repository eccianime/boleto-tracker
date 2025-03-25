import BillList from '@/components/BillList';
import Header from '@/components/Header';
import { DATA } from '@/data/mockData';
import { useAppSelector } from '@/hooks';
import { View } from 'react-native';

export default function History() {
  const { givenName, photo } = useAppSelector((state) => state.user);

  return (
    <View className='flex-1'>
      <Header name={givenName} photo={photo} />
      <BillList data={DATA} title={'Meus extratos'} isPayed />
    </View>
  );
}
