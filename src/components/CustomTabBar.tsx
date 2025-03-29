import {
  AddBillSvg,
  HistoryActiveSvg,
  HistorySvg,
  HomeActiveSvg,
  HomeSvg,
} from '@/assets';
import { useNavigationState } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { cssInterop } from 'nativewind';
import { TouchableOpacity } from 'react-native';

cssInterop(LinearGradient, {
  className: 'style',
});

export default function CustomTabBar() {
  const currentRoute = useNavigationState(
    (state) => state.routes[state.index]?.name
  );

  return (
    <LinearGradient
      colors={['rgba(255,255,255,0)', 'white', 'white']}
      className='absolute bottom-0 left-0 right-0 h-[80] flex-row'
    >
      <TouchableOpacity
        className='flex-1 items-center justify-center'
        onPress={() => router.navigate('/(tabs)/home')}
      >
        {currentRoute === 'home' ? (
          <HomeActiveSvg width={24} height={24} />
        ) : (
          <HomeSvg width={24} height={24} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        className='mb-4'
        onPress={() => router.navigate('/(newbill)/capture')}
      >
        <AddBillSvg width={56} height={56} />
      </TouchableOpacity>
      <TouchableOpacity
        className='flex-1 items-center justify-center'
        onPress={() => router.navigate('/(tabs)/history')}
      >
        {currentRoute === 'history' ? (
          <HistoryActiveSvg width={24} height={24} />
        ) : (
          <HistorySvg width={24} height={24} />
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}
