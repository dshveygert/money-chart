import { Injectable } from '@angular/core';
import {ApplicationData, ApplicationNames, LocalStorageData} from "../../api/models";
import {moment} from "../../../utils/moment";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private dateFormat = 'YYYYMMDD_hhmm';

  setLocalRecord(app: ApplicationNames, data: ApplicationData, fileName: string) {
    this.setLocalStorageItem(app, this.prepareChartItem(app, data, fileName))
  }

  getLocalRecord(app: ApplicationNames): LocalStorageData {
    return JSON.parse(this.getLocalStorageItem(app));
  }

  setLocalStorageItem(key: string, data: string | Object): void {
    localStorage.setItem(key, this.toString(data));
  }

  getLocalStorageItem(key: string): string {
    const data = localStorage.getItem(key);
    return data ?? '';
  }

  private toString(data: string | Object): string {
    return typeof data === 'object' && !Array.isArray(data) && data !== null ? JSON.stringify(data) : data?.toString()
  }

  private prepareChartItem(app: ApplicationNames, data: ApplicationData, fileName: string): LocalStorageData {
    const date = moment().format(this.dateFormat);
    const {category, currency, account} = data ?? {};
    return {
      app,
      data: data.data,
      category,
      currency,
      account,
      file_name: fileName,
      created_at: date
    }
  }

  constructor() { }
}
