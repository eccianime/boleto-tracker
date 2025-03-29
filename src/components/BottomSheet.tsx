import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DeleteSvg from '@/assets/svg/delete.svg';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setBottomSheetVisible } from '@/redux/slices';
import { currencyFormat, SCREEN_HEIGHT } from '@/utils';
import { deleteBill } from '@/redux/actions';
import Button from './Button';

export default function BottomSheet() {
  const dispatch = useAppDispatch();
  const { data, isVisible } = useAppSelector((state) => state.app.bottomSheet);
  const [viewHeight, setViewHeight] = useState(0);

  const backgroundPosition = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  const bottomViewPosition = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const handleClose = () => {
    dispatch(
      setBottomSheetVisible({
        isVisible: false,
        data: null,
      })
    );
  };

  const handleDelete = () => {
    try {
      dispatch(
        setBottomSheetVisible({
          isVisible: false,
          data: null,
        })
      );
      dispatch(deleteBill(data?.id));
    } catch (error) {
      Alert.alert('Atenção', `Ocorreu um erro ao excluir o boleto`);
    }
  };

  useEffect(() => {
    if (isVisible) {
      Animated.sequence([
        Animated.timing(backgroundPosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundPosition, {
          toValue: SCREEN_HEIGHT,
          duration: 0,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isVisible]);

  return (
    <Animated.View
      className='absolute left-0 right-0 bottom-0 bg-black/50 justify-end'
      style={{ top: backgroundPosition, opacity: backgroundOpacity }}
    >
      <Animated.View
        className='bg-white absolute left-0 right-0'
        style={{ bottom: bottomViewPosition }}
      >
        <View className='h-[2] w-11 mt-3 mb-6 bg-inputs rounded-sm self-center' />
        <View className='mx-6'>
          <Text className='font-lexend-regular text-center text-2xl'>
            O boleto <Text className='font-lexend-semibold'>{data?.title}</Text>{' '}
            no valor de{' '}
            <Text className='font-lexend-semibold'>
              {currencyFormat(data?.amount || 0)}
            </Text>{' '}
            foi pago?
          </Text>
          <View className='my-6 flex-row justify-between gap-4'>
            <Button
              text='Ainda nao'
              variant='secondary'
              onPress={handleClose}
              className='flex-1'
            />
            <Button text='Sim' variant='primary' className='flex-1' />
          </View>
        </View>
        <TouchableOpacity
          className=' border-t border-stroke pt-4 flex-row items-center justify-center mb-9 gap-4'
          onPress={handleDelete}
        >
          <DeleteSvg width={18} height={18} />
          <Text className='text-delete font-inter-regular text-lg'>
            Deletar boleto
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}
