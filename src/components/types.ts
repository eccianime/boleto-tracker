import { TextInputProps, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type HeaderProps = {
  hasExtraHeight?: boolean;
  name: string | null;
  photo: string | null;
};

export type BillCounterProps = {
  count: number;
};

export type BillListProps = {
  title: string;
  data: BillListItemProps[];
  isPayed?: boolean;
  isLoading: boolean;
};

export type BillListItemProps = {
  id: string;
  title: string;
  expireDate: string;
  amount: number;
};

export type InputProps = TextInputProps & {
  iconName: keyof typeof Ionicons.glyphMap;
  isError?: boolean;
};

export type ButtonProps = TouchableOpacityProps & {
  text: string;
  variant: 'primary' | 'secondary';
  isLoading?: boolean;
};

export type ModalCodeNotFoundProps = {
  isVisible: boolean;
  onClose: () => void;
  restartTimer: () => void;
};
