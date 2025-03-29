import { useCallback } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from 'expo-router';

import BillList from '@/components/BillList';
import Header from '@/components/Header';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { getBills } from '@/redux/actions';
import CustomTabBar from '@/components/CustomTabBar';

export default function History() {
  const { givenName, photo } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.app);
  const { history } = useAppSelector((state) => state.bill);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getBills('history'));
    }, [])
  );

  return (
    <>
      <View className='flex-1'>
        <Header name={givenName} photo={photo} />
        <BillList
          data={history}
          title={'Meus extratos'}
          isPayed
          isLoading={isLoading}
        />
      </View>
      <CustomTabBar />
    </>
  );
}
