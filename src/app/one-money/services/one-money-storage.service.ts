import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {ApplicationData, ApplicationNames, DataItem, Record, Type} from '../../api/models';
import {CsvParser, dateFormat, moment, sortByDate} from '../../../utils';
import {LocalStorageService} from '../../share/services/local-storage.service';
import {DataRecordService} from '../../share/services/data-record.service';

enum EType {
  Expense = 'Expense',
  Income = 'Income',
  Transfer = 'Transfer'
}

@Injectable()
export class OneMoneyStorageService {
  private _loading: boolean = false;
  private _loading$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _headers: string[] = [];
  private _headers$: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  private defaultHeaders: string[] = ['DATE','TYPE','FROM ACCOUNT','TO ACCOUNT / TO CATEGORY','AMOUNT','CURRENCY','AMOUNT 2','CURRENCY 2','TAGS','NOTES'];
  private recordLength = 10;
  private appDateFormat = 'MM/DD/YY';

  get headers(): string[] {
    return this._headers;
  }

  set headers(h: string[]) {
    h.forEach((item, key) => {
      if (item !== this.defaultHeaders[key]) {
        throw new SyntaxError(`OneMoneyStorageService: Header is not valid. Item ${item} not found.`);
      }
    });
    this._headers = h;
    this._headers$.next(this._headers);
  }

  private dataConverter(json: string[][]): ApplicationData {
    const recordItem: any = {};
    const category: DataItem[] = [];
    let categoryLength = 0;
    const account: DataItem[] = [];
    let accountLength = 0;
    const currency: DataItem[] = [];
    let currencyLength = 0;
    const record: Record[] = [];
    json.forEach((item, i) => {
      if (item?.length >= this.recordLength) {
        const indexOfCurrency = currency.findIndex(c => c.name === item[5]);
        const indexOfCurrencyTwo = currency.findIndex(c => c.name === item[7]);
        const indexOfAccount = account.findIndex(c => c.name === item[2]);
        if (indexOfCurrency < 0) {
          console.log('indexOfCurrency', item[5]);
          const cur = {id: currencyLength + 1, name: item[5]};
          currency.push(cur);
          currencyLength++;
          recordItem['currency_id'] = currencyLength;
          recordItem['currency'] = cur.name;
        } else {
          recordItem['currency_id'] = currency[indexOfCurrency].id;
          recordItem['currency'] = currency[indexOfCurrency].name;
        }
        if (indexOfCurrencyTwo < 0) {
          console.log('indexOfCurrencyTwo', item[7]);
          if (indexOfCurrency < 0) {
            recordItem['currency_two_id'] = currency[currencyLength - 1].id;
            recordItem['currency_two'] = currency[currencyLength - 1].name;
          } else {
            const cur = {id: currencyLength + 1, name: item[7]};
            currency.push(cur);
            currencyLength++;
            recordItem['currency_two_id'] = currencyLength;
            recordItem['currency_two'] = cur.name;
          }
        } else {
          recordItem['currency_two_id'] = currency[indexOfCurrencyTwo].id;
          recordItem['currency_two'] = currency[indexOfCurrencyTwo].name;
        }
        if (indexOfAccount < 0) {
          account.push({id: accountLength + 1, name: item[2]});
          accountLength++;
          recordItem['from_account_id'] = accountLength;
        } else {
          recordItem['from_account_id'] = account[indexOfAccount].id;
        }
        if (item[1] === EType.Transfer) {
          const indexOfAccount = account.findIndex(c => c.name === item[3]);
          if (indexOfAccount < 0) {
            account.push({id: accountLength + 1, name: item[3]});
            accountLength++;
            recordItem['to_account_id'] = accountLength;
          } else {
            recordItem['to_account_id'] = account[indexOfAccount].id;
          }
          recordItem['to_category_id'] = null;
        } else {
          const cat = item[3].trim().split(' (');
          const indexOfParentCategory = category.findIndex(c => c.name === cat[0]);
          if (indexOfParentCategory < 0) {
            category.push({id: categoryLength + 1, name: cat[0], parent_id: null});
            categoryLength++;
          }
          if (cat?.length === 2) {
            const indexOfParentCategory = category.findIndex(c => c.name === cat[0]);
            const indexOfCategory = category.findIndex(c => c.name === cat[1].replace(')', ''));
            if (indexOfCategory < 0) {
              category.push({id: categoryLength + 1, name: cat[1].replace(')', ''), parent_id: indexOfParentCategory + 1});
              categoryLength++;
            }
          }
          recordItem['to_category_id'] = category.find(c => c.name === cat[cat.length - 1].replace(')', ''))?.id;
          recordItem['to_account_id'] = null;
        }
        const type = item[1] === EType.Transfer ? Type.transfer : item[1] === EType.Expense ? Type.out : Type.in;
        record.push({
          id: i + 1,
          date: moment(item[0], this.appDateFormat).format(dateFormat),
          type: type,
          amount: +item[4],
          amount_two: +item[6],
          note: item[10],
          ...recordItem
        });
      }
    })
    return {data: sortByDate(record), currency, account, category};
  }

  public init(data: {name: string, fileData: string}, app: ApplicationNames): void {
    const {name, fileData} = data;
    try {
      this.loading = true;
      const json = this.csvParser.csvStringToArray(fileData, ',' );
      this.headers = json?.length > 0 ? json[0] : [];
      json.splice(0, 1);
      const data = this.dataConverter(json);
      this.ls.setLocalRecord(app, data, name);
      this.data.openStatistics(app, data.data);
    } catch (e) {
      console.log('OneMoneyStorageService: File data is not valid.', e);
    } finally {
      this.loading = false;
    }
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(data: boolean) {
    this._loading = data;
    this._loading$.next(this._loading);
  }

  get loading$(): Observable<boolean> {
    return this._loading$.pipe(startWith(this._loading));
  }

  constructor(private csvParser: CsvParser, private ls: LocalStorageService, private data: DataRecordService) { }
}
