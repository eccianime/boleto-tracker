import {
  BillListItemProps,
  BillListItemPropsFirebase,
} from '@/components/types';
import { AppDispatch } from './store';

export type AppStateProps = {
  bottomSheet: {
    isVisible: boolean;
    data: Omit<BillListItemProps, keyof BillListItemPropsFirebase> | null;
  };
  isLoading: boolean;
};

export type SignInResponseProps = { success: boolean };

export type SignUpInputProps = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: string;
};

export type DispatchAndErrorProps = {
  rejectValue: string;
  dispatch: AppDispatch;
};

export type UserStateProps = {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  photo: string;
  from: 'app' | 'google';
  createdAt: string;
};

export type BillStateProps = {
  current: BillListItemProps[];
  history: BillListItemProps[];
};
