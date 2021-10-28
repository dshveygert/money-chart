export interface DataItem {
  id: number;
  name: string;
  parent_id?: number | null;
}

export interface Record {
  id: number;
  date: Date | string;
  type: Type;
  from_account_id: number;
  to_account_id: number;
  to_category_id: number;
  amount: number;
  currency_id: number;
  currency: string;
  amount_two: number;
  currency_two_id: number;
  currency_two: string;
  note: string;
}

export enum Type {
  in = 'in',
  out = 'out',
  transfer = 'transfer'
}
