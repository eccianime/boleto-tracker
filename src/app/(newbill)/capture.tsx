import { View, Text, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { cssInterop } from 'nativewind';

cssInterop(CameraView, {
  className: 'style',
});

export default function Capture() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-xl font-lexend-semibold'>
          Precisamos de permisos para usar a camera
        </Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Pedir permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className='flex-1'>
      <View className='bg-primary h-20' />
      <CameraView className='flex-1' facing={'back'}></CameraView>
    </View>
  );
}
