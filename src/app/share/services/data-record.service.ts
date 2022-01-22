import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {ApplicationNames, Record} from '../../api/models';
import {TimePeriodFilterService} from './time-period-filter.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataRecordService { // Storage for data
  private _data: Record[] = [];
  private _data$: ReplaySubject<Record[]> = new ReplaySubject<Record[]>(1);

  get data(): Record[] {
    return this._data;
  }
  set data(d: Record[]) {
    this._data = d;
    this._data$.next(this._data);
  }
  get data$(): Observable<Record[]> {
    return this._data$;
  }

  get filteredData$(): Observable<Record[]> {
    return this.periodFilter.selectedPeriod$.pipe(map(filter => {
      const from = new Date(filter.from);
      const to = new Date(filter.to);
      return this.data?.filter(item => {
        const date = new Date(item.date);
        return date >= from && date <= to
      });
    }))
  }

  private clear(): void {
    this.data = [];
  }

  public init(d: Record[]): void {
    this.data = d;
  }

  public destroy(): void {
    this.clear();
  }

  public openStatistics(app: ApplicationNames, data: Record[]): void {
    this.init(data);
  }

  constructor(private periodFilter: TimePeriodFilterService) { }
}
