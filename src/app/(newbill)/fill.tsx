import Button from '@/components/Button';
import Input from '@/components/Input';
import colors from '@/config/colors';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { registerBill } from '@/redux/actions';
import { BillRegisterInputProps } from '@/redux/types';
import { currencyFormat, formatDateDMY, isBillFormValid } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';

export default function Fill() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const { isLoading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const defaultStyles = useDefaultStyles();

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
          />

          <Pressable onPress={() => setOpen(true)} accessibilityRole='button'>
            <Input
              iconName='calendar-outline'
              readOnly
              placeholder='Vencimento'
              value={billData.dueDate}
            />
            <Modal
              visible={open}
              transparent
              onRequestClose={() => setOpen(false)}
              animationType='fade'
            >
              <Pressable
                className='flex-1 items-center justify-center bg-black/50'
                onPress={() => setOpen(false)}
              >
                <View
                  className='bg-white p-3 rounded-xl w-4/5'
                  onTouchEnd={(e) => e.stopPropagation()}
                >
                  <DateTimePicker
                    weekdaysFormat='short'
                    monthCaptionFormat='full'
                    styles={{
                      ...defaultStyles,
                      selected: {
                        ...defaultStyles.selected,
                        backgroundColor: colors.primary,
                        borderRadius: 30,
                      },
                    }}
                    locale='pt-BR'
                    mode='single'
                    date={
                      new Date(
                        billData.dueDate.split('/').reverse().join('-') +
                          'T00:00:00'
                      )
                    }
                    onChange={({ date }) => {
                      const targetDate = new Date(
                        date as string
                      ).toLocaleDateString();

                      setOpen(false);

                      setBillData((prev) => ({
                        ...prev,
                        dueDate: formatDateDMY(targetDate),
                      }));
                    }}
                  />
                </View>
              </Pressable>
            </Modal>
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
