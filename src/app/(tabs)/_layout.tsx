import historyActiveSvg from '@/assets/svg/history-active.svg';
import historySvg from '@/assets/svg/history.svg';
import homeActiveSvg from '@/assets/svg/home-active.svg';
import homeSvg from '@/assets/svg/home.svg';
import { router, Tabs } from 'expo-router';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import AddBillSvg from '@/assets/svg/add-bill.svg';
import { Platform, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Routes = 'home' | 'history';

export default function TabLayout() {
  const renderIcon = (routeName: Routes, isFocused: boolean) => {
    const routes = {
      home: isFocused ? homeActiveSvg : homeSvg,
      history: isFocused ? historyActiveSvg : historySvg,
    };
    const Icon: FC<SvgProps> = routes[routeName];
    return <Icon width={24} height={24} />;
  };
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          sceneStyle: { backgroundColor: 'white' },
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) =>
            renderIcon(route.name as Routes, focused),
          tabBarStyle: {
            position: 'absolute',
            bottom: Platform.select({ ios: 0, android: 30 }),
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            zIndex: 10,
            shadowColor: 'transparent',
          },
          tabBarItemStyle: {
            backgroundColor: 'transparent',
          },
        })}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'white', 'white']}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.select({ ios: 140, android: 100 }),
          shadowOpacity: 0,
        }}
      />
      <TouchableOpacity
        className='absolute bottom-12 self-center z-10'
        onPress={() => router.navigate('/(newbill)/capture')}
      >
        <AddBillSvg width={56} height={56} />
      </TouchableOpacity>
    </>
  );
}
