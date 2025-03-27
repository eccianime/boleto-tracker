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

export const isValidDate = (dateString: string): boolean => {
  const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateString.match(datePattern);

  if (!match) return false;

  const [, day, month, year] = match;

  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  if (monthNum < 1 || monthNum > 12 || yearNum < 1000 || yearNum > 9999) {
    return false;
  }

  const daysInMonth = new Date(yearNum, monthNum, 0).getDate();

  if (dayNum < 1 || dayNum > daysInMonth) {
    return false;
  }

  return true;
};
