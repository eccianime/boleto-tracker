import { BillListItemProps } from '@/components/types';

export type AppStateProps = {
  bottomSheet: {
    isVisible: boolean;
    data: Omit<BillListItemProps, 'expireDate'> | null;
  };
  isLoading: boolean;
};
