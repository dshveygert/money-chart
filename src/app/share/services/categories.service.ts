import { Injectable } from '@angular/core';
import {ApplicationNames, DataItem, Item, Record} from "../../api/models";
import {Observable, ReplaySubject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
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

  public filteredData$(dataList$: Observable<Record[]>): Observable<Item[]> {
    return dataList$.pipe(map(list => {
      const active: Item[] = [];
      const disabled: Item[] = [];
      this.data?.forEach(item => {
        if (list?.some(d => d.to_category_id === item.id)) {
          active.push({...item, active: true});
        } else {
          disabled.push({...item, active: false});
        }
      });
      return [
        ...active.sort((a, b) => a.name.localeCompare(b.name)),
        ...disabled.sort((a, b) => a.name.localeCompare(b.name))
        ]
    }));
  }

  private clear(): void {
    this.data = [];
  }

  public init(app: ApplicationNames): void {
    this.data = this.ls.getLocalRecord(app)?.category;
  }

  public destroy(): void {
    this.clear();
  }

  constructor(private ls: LocalStorageService) { }
}
