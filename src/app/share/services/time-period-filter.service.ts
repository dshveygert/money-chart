import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DateFormat, Limits, PeriodUnit} from '../../api/models';
import {moment} from "../../../utils/moment";

@Injectable({
  providedIn: 'root'
})

export class TimePeriodFilterService {
  private defaultLimits: Limits = {from: '1970.01.01', to: '2050.12.31'};
  private _limits: Limits = this.defaultLimits;
  private _limits$: ReplaySubject<Limits> = new ReplaySubject<Limits>(1);
  private _selectedPeriod: Limits = this.defaultLimits;
  private _selectedPeriod$: ReplaySubject<Limits> = new ReplaySubject<Limits>(1);
  private _selectedPeriodUnit: PeriodUnit = 'month';
  private nowDate = moment();

  get limits(): Limits {
    return this._limits;
  }

  set limits({from, to}) {
    this._limits = {from, to};
    this._limits$.next(this._limits);
  }

  get limits$(): Observable<Limits> {
    return this._limits$.pipe(startWith(this._limits));
  }

  get selectedPeriod(): Limits {
    return this._selectedPeriod;
  }

  set selectedPeriod(period: Limits) {
    this._selectedPeriod = period;
    this._selectedPeriod$.next(this._selectedPeriod);
  }

  get selectedPeriod$(): Observable<Limits> {
    return this._selectedPeriod$.pipe(startWith(this._selectedPeriod));
  }

  get selectedMonth$(): Observable<string> {
    return this.selectedPeriod$.pipe(map(l => moment(l.to).format('MMMM, YYYY')));
  }

  get selectedPeriodUnit(): PeriodUnit {
    return this._selectedPeriodUnit
  }

  public selectPeriod(): void {

  }

  public changeMonth(type: 'up' | 'down'): void{
    this._selectedPeriodUnit = 'month';
    let newMonth = moment();
    if (type === 'up') {
      newMonth = moment(this.selectedPeriod.from).add(1, 'months');
    } else {
      newMonth = moment(this.selectedPeriod.from).subtract(1, 'months');
    }
    const to = newMonth.endOf('month').format(DateFormat);
    const from = newMonth.startOf('month').format(DateFormat);
    this.selectedPeriod = {from, to};
  }

  get disabledDate$(): Observable<{from: boolean, to: boolean}> {
    return this.selectedPeriod$.pipe(map(d => {
      return {
        from: (+d.from.split('.').join('') - 1) < +this.limits.from.split('.').join(''),
        to: (+d.to.split('.').join('') + 1) > +this.limits.to.split('.').join('')
      }
    }));
  }

  public init(firstDate: string, lastDate: string) {
    this.limits = {from: firstDate, to: lastDate};
    this.selectedPeriod = {
      from: moment(lastDate).startOf('month').format(DateFormat),
      to: moment(lastDate).endOf('month').format(DateFormat)
    };
  }

  constructor() { }
}
