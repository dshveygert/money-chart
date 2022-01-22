import { Injectable } from '@angular/core';
import {ApplicationNames, DataItem} from "../../api/models";
import {Observable, ReplaySubject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private _data: DataItem[] = [];
  private _data$: ReplaySubject<DataItem[]> = new ReplaySubject<DataItem[]>(1);

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

  private clear(): void {
    this.data = [];
  }

  public init(app: ApplicationNames): void {
    this.data = this.ls.getLocalRecord(app)?.account;
  }

  public destroy(): void {
    this.clear();
  }

  constructor(private ls: LocalStorageService) { }
}
