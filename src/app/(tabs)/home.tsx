import { useAppSelector } from '@/hooks';
import { View, Text } from 'react-native';

export default function Home() {
  const { givenName } = useAppSelector((state) => state.user);
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>{`Hola, ${givenName}`}</Text>
    </View>
  );
}
