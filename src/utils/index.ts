import { SignUpInputProps } from '@/redux/types';
import { Alert, Dimensions } from 'react-native';

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

export const isAllFieldsValid = (data: SignUpInputProps) => {
  const { name, lastName, email, password, confirmPassword } = data;

  const errors: string[] = [];

  if (name.trim().length < 3) {
    errors.push('Por favor, insira um nome maior que 3 caracteres.');
  }

  if (lastName.trim().length < 3) {
    errors.push('Por favor, insira um sobrenome maior que 3 caracteres.');
  }

  if (!isValidEmail(email)) {
    errors.push('Por favor, insira um email válido.');
  }

  const passwordError = isValidPassword(password, confirmPassword);
  if (passwordError) {
    errors.push(passwordError);
  }

  if (errors.length > 0) {
    Alert.alert('Atenção', errors.join('\n'));
    return false;
  }

  return true;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

  if (!password.match(passwordRegex)) {
    return 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*#?&), e ter no mínimo 6 caracteres.';
  }

  if (password !== confirmPassword) {
    return 'As senhas não coincidem.';
  }

  return null;
};

export const handleError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Ocorreu um erro inesperado.';
};
