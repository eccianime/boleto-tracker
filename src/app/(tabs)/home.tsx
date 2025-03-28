import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

import BillCounter from '@/components/BillCounter';
import BillList from '@/components/BillList';
import BottomSheet from '@/components/BottomSheet';
import Header from '@/components/Header';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { getBills } from '@/redux/actions';

export default function Home() {
  const { givenName, photo } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.app);
  const { current: myBills } = useAppSelector((state) => state.bill);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getBills('current'));
    }, [])
  );

  return (
    <View className='flex-1'>
      <Header hasExtraHeight name={givenName} photo={photo} />
      <BillCounter count={myBills.length} />
      <BillList data={myBills} title={'Meus boletos'} isLoading={isLoading} />
      <BottomSheet />
    </View>
  );
}
