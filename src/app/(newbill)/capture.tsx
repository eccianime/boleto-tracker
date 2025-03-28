import ModalCodeNotFound from '@/components/ModalCodeNotFound';
import { Ionicons } from '@expo/vector-icons';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { router, useFocusEffect } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { cssInterop } from 'nativewind';
import { useCallback, useRef, useState } from 'react';
import {
  Platform,
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

cssInterop(CameraView, {
  className: 'style',
});

export default function Capture() {
  const [permission, requestPermission] = useCameraPermissions();
  const isScanning = useRef(false);
  const cameraRef = useRef<CameraView>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { bottom } = useSafeAreaInsets();

  const startTimer = useCallback(() => {
    isScanning.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setModalVisible(true);
      isScanning.current = false;
    }, 10000);
  }, []);

  const restartTimer = () => {
    setModalVisible(false);
    startTimer();
  };

  const handleBarCodeScan = (scanResult: BarcodeScanningResult) => {
    if (
      scanResult.type === 'itf14' &&
      isScanning.current &&
      scanResult.data.length === 44
    ) {
      isScanning.current = false;
      ScreenOrientation.unlockAsync();
      router.navigate(`/(newbill)/fill?code=${scanResult.data}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      startTimer(); // Iniciar el temporizador cuando se monta
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [startTimer])
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const permission = await requestPermission();
        if (permission?.granted) {
          const orientation = await ScreenOrientation.getOrientationAsync();

          if (orientation !== ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE
            );
            isScanning.current = true;
          }
        }
      })();

      return () => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      };
    }, [])
  );

  if (!permission?.granted) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-xl font-lexend-semibold mb-[100]'>
          Precisamos de permisos para usar a camera
        </Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text className='font-lexend-semibold text-xl'>Pedir permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <CameraView
      ref={cameraRef}
      className={`flex-1 flex-row`}
      style={Platform.OS === 'android' ? { paddingBottom: bottom } : {}}
      facing={'back'}
      onCameraReady={() => {
        isScanning.current = true;
      }}
      onBarcodeScanned={handleBarCodeScan}
    >
      <StatusBar hidden />
      <View className='w-16 bg-primary h-full' />
      <View className='flex-1'>
        <View className=' bg-[rgba(0,0,0,.7)] h-[120] justify-center pt-6'>
          <TouchableOpacity
            className='absolute top-[60] left-6'
            onPress={router.back}
          >
            <Ionicons name={'arrow-back'} size={24} color={'white'} />
          </TouchableOpacity>
          <Text className=' text-white font-inter-regular text-lg self-center  '>
            Escaneie o código de barras do boleto
          </Text>
        </View>
        <View className={`mt-auto h-14 bg-[rgba(0,0,0,.7)]`} />
        <TouchableHighlight
          onPress={() => router.navigate(`/(newbill)/fill`)}
          className={`bg-white items-center  ${
            Platform.OS === 'ios' ? 'pt-4 h-[70]' : 'justify-center h-16'
          }`}
        >
          <Text className='font-inter-regular text-xl text-heading'>
            Inserir código do boleto
          </Text>
        </TouchableHighlight>
      </View>
      <ModalCodeNotFound
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        restartTimer={restartTimer}
      />
    </CameraView>
  );
}
