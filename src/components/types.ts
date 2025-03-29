import { Ionicons } from '@expo/vector-icons';
import { TextInputProps, TouchableOpacityProps } from 'react-native';

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
  data: readonly BillListItemProps[];
  isPayed?: boolean;
  isLoading: boolean;
};

export type BillListItemPropsFirebase = {
  isPayed: boolean;
  expireDate: string;
  createdAt: string;
  barCode: string;
};

export type BillListItemProps = BillListItemPropsFirebase & {
  id: string;
  title: string;
  amount: number;
};

export type ButtonVariant = 'primary' | 'secondary';

export type InputProps = TextInputProps & {
  iconName: keyof typeof Ionicons.glyphMap;
  isError?: boolean;
};

export type ButtonProps = TouchableOpacityProps & {
  text: string;
  variant: ButtonVariant;
  isLoading?: boolean;
};

export type ModalCodeNotFoundProps = {
  isVisible: boolean;
  onClose: () => void;
  restartTimer: () => void;
};
