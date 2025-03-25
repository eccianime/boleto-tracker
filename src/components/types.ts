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
};

export type BillListItemProps = {
  title: string;
  expireDate: string;
  amount: number;
};
