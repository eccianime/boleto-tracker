import { Dimensions } from 'react-native';

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
};

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('screen');
