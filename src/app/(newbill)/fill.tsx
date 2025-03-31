import Button from '@/components/Button';
import Input from '@/components/Input';
import colors from '@/config/colors';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { registerBill } from '@/redux/actions';
import { BillRegisterInputProps } from '@/redux/types';
import { currencyFormat, formatDateDMY, isBillFormValid } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DatePicker from 'react-native-date-picker';

export default function Fill() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const { isLoading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const [billData, setBillData] = useState<BillRegisterInputProps>({
    name: '',
    dueDate: formatDateDMY(new Date().toLocaleDateString()),
    value: 'R$ 0,00',
    barCode: '',
  });
  const [open, setOpen] = useState(false);

  const handleCurrency = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const valueWithDecimals = Number(cleanValue) / 100;
    return currencyFormat(valueWithDecimals);
  };

  const handleSubmit = async () => {
    try {
      if (!isBillFormValid(billData)) return;

      const result = await dispatch(registerBill(billData)).unwrap();
      if (result.success) {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      Alert.alert('Atenção', `Ocorreu um erro ao registrar o boleto`);
    }
  };

  useEffect(() => {
    if (code) {
      setBillData({
        ...billData,
        barCode: code,
      });
    }
  }, [code]);

  return (
    <View className='flex-grow'>
      <StatusBar hidden={false} style={'dark'} />
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
            onChangeText={(name: string) =>
              setBillData((prev) => ({ ...prev, name }))
            }
            accessibilityLabel='Nome do boleto'
          />

          <Pressable
            onPress={() => setOpen(true)}
            accessibilityLabel='Selecionar data de vencimento'
            accessibilityRole='button'
          >
            <Input
              iconName='calendar-outline'
              readOnly
              placeholder='Vencimento'
              value={billData.dueDate}
              onChangeText={() => {}} // Handled by date picker
              accessibilityLabel='Data de vencimento'
            />
            <DatePicker
              modal
              title={'Selecione a data de vencimento'}
              confirmText='Confirmar'
              cancelText='Cancelar'
              locale='pt-BR'
              mode='date'
              open={open}
              date={
                new Date(
                  new Date(
                    billData.dueDate.split('/').reverse().join('-') +
                      'T00:00:00'
                  )
                )
              }
              onConfirm={(date) => {
                setOpen(false);
                setBillData((prev) => ({
                  ...prev,
                  dueDate: formatDateDMY(date.toLocaleDateString()),
                }));
              }}
              onCancel={() => {
                setOpen(false);
              }}
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
              setBillData((prev) => ({ ...prev, value: handleCurrency(value) }))
            }
            accessibilityLabel='Valor do boleto'
          />

          <Input
            iconName='barcode-outline'
            placeholder='Código de barras'
            keyboardType='phone-pad'
            value={billData.barCode}
            onChangeText={(barCode: string) =>
              setBillData((prev) => ({
                ...prev,
                barCode: barCode.replace(/\D/g, ''),
              }))
            }
            accessibilityLabel='Código de barras'
            accessibilityHint='Digite o código de barras do boleto'
          />
        </View>
        <View className='mt-4 gap-4'>
          <Button
            text='Registrar'
            variant='primary'
            isLoading={isLoading}
            onPress={handleSubmit}
          />
          <Button
            text='Cancelar'
            variant='secondary'
            onPress={router.back}
            disabled={isLoading}
          />
        </View>
      </View>
    </View>
  );
}
