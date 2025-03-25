import LogoWhiteSvg from '@/assets/svg/logo-white.svg';
import { useAppSelector } from '@/hooks';
import { currencyFormat } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const DATA = [
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2023',
    amount: 120,
  },
  {
    title: 'Conta de luz',
    expireDate: '12/12/2024',
    amount: 120,
  },
];

export default function Home() {
  const { givenName, photo } = useAppSelector((state) => state.user);

  return (
    <View className='flex-1'>
      <View className='h-[180] bg-primary flex-row justify-between px-6 pt-16'>
        <View className='gap-1'>
          <Text className='font-lexend-regular text-white text-2xl'>
            Olá, <Text className='font-lexend-semibold'>{givenName}</Text>
          </Text>
          <Text className='text-white font-inter-regular text-lg'>
            Mantenha suas contas em dia
          </Text>
        </View>
        {photo ? (
          <Image source={{ uri: photo }} className='rounded-md w-12 h-12' />
        ) : (
          <View className='w-12 h-12 bg-white rounded-md'>
            <Ionicons name='person' size={24} color='black' />
          </View>
        )}
      </View>

      <View className='mx-6 mt-[-40] h-20 rounded-md bg-secondary justify-center items-center flex-row'>
        <LogoWhiteSvg width={56} height={35} />
        <View className='h-8 border-l border-white mx-6' />
        <View>
          <Text className='text-white font-inter-regular text-md leading-6'>
            Você tem <Text className='font-inter-bold'>14 boletos</Text>
            {'\n'}cadastrados para pagar
          </Text>
        </View>
      </View>

      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerClassName='flex-grow mx-6'
        data={DATA}
        ListHeaderComponent={() => (
          <View className='mt-8'>
            <Text className='text-2xl font-lexend-semibold text-heading'>
              Meus Boletos
            </Text>
            <View className='border-t border-stroke mt-6 mb-8' />
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity className='flex-row justify-between mb-8'>
            <View>
              <Text className='font-lexend-semibold text-heading text-xl mb-2'>
                {item.title}
              </Text>
              <Text className='font-inter-regular text-body text-md'>
                Vence em {item.expireDate}
              </Text>
            </View>
            <Text className='font-inter-semibold text-heading text-lg'>
              {currencyFormat(item.amount)}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className='flex-1 justify-center items-center'>
            <Text className='font-inter-regular text-body text-lg'>
              Nenhum boleto cadastrado
            </Text>
          </View>
        )}
      />
    </View>
  );
}
