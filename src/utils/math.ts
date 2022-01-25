import {Record, Type} from '../app/api/models';
import {dateFormat, moment} from './';

export function sumAmountsByDay(list: Record[] = [], timeFormat = dateFormat): {day: string, sum: number}[] {
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
      sum += item.amount;
    } else {
      result.push({day: moment(date).format(timeFormat), sum});
      sum = item.amount;
      date = item.date;
    }
    if (i === length - 1) {
      result.push({day: moment(date).format(timeFormat), sum});
    }
  })
  return result;
  // let sum = list[0].amount;
  // let i = 0;
  // const days: string[] = [list[0].date];
  // const firstDay = moment(list[0].date);
  // const lastDay = moment(list[length-1].date);
  // const daysNumber = getNumberOfDays(list[0].date, list[length-1].date);
  // console.log('daysNumber', daysNumber);
  // for (let step = 1; step < length; step++) {
  //   const period = getNumberOfDays(list[step - 1].date, list[step].date);
  //   if (period > 0) {
  //
  //   }
  //   const date = moment(list[0].date).add(step, 'days').format(dateFormat);
  //
  //   console.log('day', step);
  // }
  // do {
  //   const date = moment(list[0].date).add(i, 'days').format(dateFormat);
  //   days.push(date);
  //   if ()
  //   const record = list[i];
  //   if (record.type === type) {
  //     sum += record.amount;
  //   }
  //
  //   console.log('day', i, date);
  //   i += 1;
  // } while (i < daysNumber);

  // list.forEach(record => {
  //    if (record.type === type) {
  //      sum += record.amount;
  //    }
  // })
  // return {sum, days};
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
