import { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import DeleteSvg from '@/assets/svg/delete.svg';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setBottomSheetVisible } from '@/redux/slices';
import { currencyFormat } from '@/utils';

export default function BottomSheet() {
  const dispatch = useAppDispatch();
  const { data, isVisible } = useAppSelector((state) => state.app.bottomSheet);
  const [viewHeight, setViewHeight] = useState(0);
  const viewPosition = useSharedValue(-viewHeight);

  const handleClose = () => {
    viewPosition.value = withTiming(-viewHeight);
    dispatch(
      setBottomSheetVisible({
        isVisible: false,
        data: null,
      })
    );
  };

  const animatedStyles = useAnimatedStyle(() => ({
    bottom: viewPosition.value,
  }));

  useEffect(() => {
    if (isVisible) {
      viewPosition.value = withTiming(0);
      return;
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      animationType='fade'
      transparent
      onRequestClose={handleClose}
    >
      <View className='flex-1 bg-[rgba(0,0,0,0.6)]'>
        <Animated.View
          style={animatedStyles}
          className={`bg-white absolute h-[${viewHeight}] left-0 right-0`}
        >
          <View
            onLayout={({ nativeEvent }) =>
              setViewHeight(nativeEvent.layout.height)
            }
          >
            <View className='h-[2] w-11 mt-3 mb-6 bg-inputs rounded-sm self-center' />
            <View className='mx-6'>
              <Text className='font-lexend-regular text-center text-2xl'>
                O boleto{' '}
                <Text className='font-lexend-semibold'>{data?.title}</Text> no
                valor de{' '}
                <Text className='font-lexend-semibold'>
                  {currencyFormat(data?.amount || 0)}
                </Text>{' '}
                foi pago?
              </Text>
              <View className='my-6 flex-row justify-between gap-4'>
                <TouchableOpacity
                  className='flex-1 h-14 rounded-md items-center justify-center border bg-boxes border-stroke'
                  onPress={handleClose}
                >
                  <Text className='text-secondary font-inter-regular text-md'>
                    Ainda não
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex-1 h-14 rounded-md items-center justify-center bg-primary'>
                  <Text className='text-white font-inter-regular text-md'>
                    Sim
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity className='border-t border-stroke flex-1 pt-4 flex-row items-center justify-center mb-9 gap-4'>
              <DeleteSvg width={18} height={18} />
              <Text className='text-delete font-inter-regular text-md'>
                Deletar boleto
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
