import Button from '@/components/Button';
import Input from '@/components/Input';
import colors from '@/config/colors';
import { currencyFormat, isValidDate } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

export default function Fill() {
  const { code } = useLocalSearchParams<{ code: string }>();

  const [billData, setBillData] = useState({
    name: '',
    dueDate: '',
    value: '',
    barCode: '',
  });

  const dateRef = useRef<TextInput>(null);

  const formatDate = (date: string) => {
    let cleanText = date.replace(/\D/g, '');

    if (cleanText.length > 8) cleanText = cleanText.slice(0, 8);

    if (cleanText.length <= 2) {
      cleanText = cleanText.replace(/(\d{2})/, '$1');
    } else if (cleanText.length <= 4) {
      cleanText = cleanText.replace(/(\d{2})(\d{2})/, '$1/$2');
    } else {
      cleanText = cleanText.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }

    return cleanText;
  };

  const handleCurrency = (value: string) => {
    // const formattedValue = value.replace(/[^0-9.-]+/g, '');
    // return currencyFormat(formattedValue);
    return value;
  };

  console.log('render', Math.random());

  useEffect(() => {
    if (code) {
      console.log('entra aqui');

      (async () => {
        try {
          const resp = await axios.post(
            'https://www.veloso.adm.br/checkboleto/php/BoletoWS.php',
            {
              digitado: code,
            }
          );

          if (resp.data.length > 0) {
            const { linha_digitavel, valor } = resp.data[0];
            setBillData({
              barCode: linha_digitavel,
              value: currencyFormat(valor),
              dueDate: '',
              name: '',
            });
          }
        } catch (error) {
          console.log(error);
        }
      })();
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
          <Input
            isError={
              billData.dueDate.length > 0 && !isValidDate(billData.dueDate)
            }
            ref={dateRef}
            iconName='calendar-outline'
            maxLength={10}
            placeholder='Vencimento'
            value={billData.dueDate}
            onChangeText={(dueDate: string) =>
              setBillData({ ...billData, dueDate: formatDate(dueDate) })
            }
          />
          <Input
            iconName='wallet-outline'
            placeholder='Valor do boleto'
            value={billData.value}
            onChangeText={(value: string) =>
              setBillData({ ...billData, value: handleCurrency(value) })
            }
          />
          <Input
            iconName='barcode-outline'
            placeholder='Código de barras'
            keyboardType='numeric'
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
