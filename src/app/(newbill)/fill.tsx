import Button from '@/components/Button';
import Input from '@/components/Input';
import colors from '@/config/colors';
import { currencyFormat, formatDateDMY } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function Fill() {
  const { code } = useLocalSearchParams<{ code: string }>();

  const [billData, setBillData] = useState({
    name: '',
    dueDate: formatDateDMY(new Date().toLocaleDateString()),
    value: 'R$ 0,00',
    barCode: '',
  });

  const handleCurrency = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const valueWithDecimals = Number(cleanValue) / 100;
    return currencyFormat(valueWithDecimals);
  };

  useEffect(() => {
    if (code) {
      // (async () => {
      //   try {
      //     const resp = await axios.post(
      //       'https://www.veloso.adm.br/checkboleto/php/BoletoWS.php',
      //       {
      //         digitado: code,
      //       }
      //     );

      //     if (resp.data.length > 0) {
      //       const { linha_digitavel, valor } = resp.data[0];
      //       setBillData({
      //         barCode: linha_digitavel,
      //         value: currencyFormat(valor),
      //         dueDate: '',
      //         name: '',
      //       });
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // })();
      setBillData({
        ...billData,
        barCode: code,
      });
    }
  }, [code]);

  return (
    <View className='flex-grow'>
      <StatusBar hidden={false} barStyle={'dark-content'} />
      <View className='flex-grow m-6 mt-[80]'>
        <TouchableOpacity onPress={router.back}>
          <Ionicons name={'arrow-back'} size={24} color={colors.inputs} />
        </TouchableOpacity>
        <Text className='text-center text-3xl text-heading font-lexend-semibold my-6'>
          Registrar boleto
        </Text>
        <View className='my-6 gap-4'>
          <Input
            iconName='document-outline'
            placeholder='Nome do boleto'
            value={billData.name}
            onChangeText={(name: string) => setBillData({ ...billData, name })}
          />
          <Pressable
            onPress={() =>
              DateTimePickerAndroid.open({
                mode: 'date',
                display: 'calendar',
                value: new Date(),
                onChange: (_, date) => {
                  if (date) {
                    setBillData({
                      ...billData,
                      dueDate: formatDateDMY(date.toLocaleDateString()),
                    });
                  }
                },
              })
            }
          >
            <Input
              iconName='calendar-outline'
              readOnly
              placeholder='Vencimento'
              value={billData.dueDate}
              onChangeText={(dueDate: string) =>
                setBillData({ ...billData, dueDate: formatDateDMY(dueDate) })
              }
            />
          </Pressable>
          <Input
            iconName='wallet-outline'
            placeholder='Valor do boleto'
            keyboardType='phone-pad'
            selection={{
              start: billData.value.length,
              end: billData.value.length,
            }}
            value={billData.value}
            onChangeText={(value: string) =>
              setBillData({ ...billData, value: handleCurrency(value) })
            }
          />
          <Input
            iconName='barcode-outline'
            placeholder='Código de barras'
            keyboardType='phone-pad'
            value={billData.barCode}
            onChangeText={(barCode: string) =>
              setBillData({ ...billData, barCode })
            }
          />
        </View>
        <View className='mt-4 gap-4'>
          <Button text='Registrar' variant='primary' />
          <Button text='Cancelar' variant='secondary' onPress={router.back} />
        </View>
      </View>
    </View>
  );
}
