import { Injectable } from '@angular/core';
import {ApplicationNames, DataItem} from "../../api/models";
import {Observable, ReplaySubject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {startWith} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private _data: DataItem[] = [];
  private _data$: ReplaySubject<DataItem[]> = new ReplaySubject<DataItem[]>(1);
  private _selected: string;
  private _selected$: ReplaySubject<string> = new ReplaySubject<string>(1);

  get data(): DataItem[] {
    return this._data;
  }
  set data(d: DataItem[]) {
    this._data = d;
    this._data$.next(this._data);
  }
  get data$(): Observable<DataItem[]> {
    return this._data$;
  }
  get selected(): string {
    return this._selected ?? this.data[0]?.name;
  }
  set selected(d: string) {
    this._selected = d;
    this._selected$.next(this._selected);
  }
  get selected$(): Observable<string> {
    return this._selected$.pipe(startWith(this.data[0]?.name));
  }

  private clear(): void {
    this.data = [];
  }

  public init(app: ApplicationNames): void {
    this.data = this.ls.getLocalRecord(app)?.currency;
  }

  public destroy(): void {
    this.clear();
  }

  constructor(private ls: LocalStorageService) { }
}
