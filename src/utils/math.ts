import {Record, Type} from '../app/api/models';
import {dateFormat, moment} from './';

export function sumAmountsByDay(list: Record[] = [], timeFormat = dateFormat, currency = 'USD'): {day: string, sum: number}[] {
  const length = list.length
  if (length <= 0) {
    // @ts-ignore
    return [{day: '', sum: 0}];
  }
  const result: {day: string, sum: number}[] = [];
  let date = list[0].date;
  let sum = 0;
  list.forEach((item, i) => {
    if (date === item.date) {
      sum += item.currency === currency ? item.amount : item.currency_two === currency ? item.amount_two : 0;
    } else {
      result.push({day: moment(date).format(timeFormat), sum: +sum.toFixed(2)});
      sum = item.currency === currency ? item.amount : item.currency_two === currency ? item.amount_two : 0;
      date = item.date;
    }
    if (i === length - 1) {
      result.push({day: moment(date).format(timeFormat), sum: +sum.toFixed(2)});
    }
  })
  return result;
}

export function getNumberOfDays(start: string, end: string): number {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.round(diffInTime / oneDay);
}

export function filterByType(list: Record[] = [], type: Type): Record[] {
  return list.filter(item => item.type === type);
}
