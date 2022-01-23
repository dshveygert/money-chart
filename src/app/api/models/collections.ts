export interface DataItem {
  id: number;
  name: string;
  parent_id?: number | null;
}

export interface Item extends DataItem {
  active: boolean;
}

export interface Record {
  id: number;
  date: string;
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

export interface ApplicationData {
  data: Record[];
  currency: DataItem[];
  account: DataItem[];
  category: DataItem[];
}

export enum Type {
  in = 'in',
  out = 'out',
  transfer = 'transfer'
}

export interface Limits {
  from: string;
  to: string;
}

export interface LocalStorageData extends ApplicationData {
  app: string;
  file_name?: string;
  created_at: string | Date;
}

export type PeriodUnit = 'year' | 'month' | 'day';
export const DateFormat = 'YYYY.MM.DD'
