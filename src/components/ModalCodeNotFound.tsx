import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { ModalCodeNotFoundProps } from './types';
import { router } from 'expo-router';

export default function ModalCodeNotFound({
  isVisible,
  onClose,
  restartTimer,
}: ModalCodeNotFoundProps) {
  return (
    <Modal visible={isVisible} animationType='slide' transparent>
      <View className='flex-1 bg-black/50 justify-end'>
        <View className='bg-white h-[180]'>
          <View className='py-10 border-b border-stroke items-center'>
            <Text className='font-inter-bold text-xl text-heading'>
              Não foi possível identificar um código de barras.
            </Text>
            <Text className='font-inter-regular text-xl text-heading'>
              Tente escanear novamente ou digite o código do seu boleto.
            </Text>
          </View>
          <View className='flex-row flex-1'>
            <TouchableOpacity
              className='flex-1 items-center justify-center border-r border-stroke'
              onPress={() => {
                onClose();
                restartTimer();
              }}
            >
              <Text className='font-inter-regular text-lg text-primary'>
                Tentar novamente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex-1 items-center justify-center'
              onPress={() => {
                onClose();
                router.navigate(`/(newbill)/fill`);
              }}
            >
              <Text className='font-inter-regular text-lg text-heading'>
                Digitar código manualmente
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
