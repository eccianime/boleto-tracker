import { Dimensions } from 'react-native';

export const currencyFormat = (value: number | string) => {
  let finalValue = value;
  if (typeof finalValue === 'string') {
    finalValue = Number(finalValue.replace(/[^0-9.-]+/g, ''));
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(finalValue);
};

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('screen');

export const formatDateDMY = (date: string) => {
  const [day, month, year] = date.split('/');
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
};
