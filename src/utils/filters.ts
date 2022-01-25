import {Record} from '../app/api/models';

export function sortByDate(list: Record[]): Record[] {
   return list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export const dateFormat = 'YYYY.MM.DD';
export const monthFormat = 'MM.DD';
export const dayFormat = 'DD';
