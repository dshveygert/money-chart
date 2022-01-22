import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {startWith} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _adaptive = false;
  private _adaptive$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  get adaptive$(): Observable<boolean> {
    return this._adaptive$.pipe(startWith(this._adaptive));
  }

  public adaptiveToggle(): void {
    this._adaptive = !this._adaptive;
    this._adaptive$.next(this._adaptive);
  }

  constructor() { }
}
