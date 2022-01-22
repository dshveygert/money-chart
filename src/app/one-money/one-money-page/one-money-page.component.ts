import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationNames} from '../../api/models';
import {OneMoneyStorageService} from '../services/one-money-storage.service';
import {LocalStorageService} from '../../share/services/local-storage.service';

@Component({
  selector: 'app-one-money-page',
  templateUrl: './one-money-page.component.html',
  styleUrls: ['./one-money-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneMoneyPageComponent {

  uploadFile(data: {fileData: string, name: string}): void {
    this.storage.init(data, ApplicationNames.money);
    this.router.navigate([`/chart/1money/statistics`]).then();
  }

  get hasDataInLocalStorage(): boolean {
    return !!this.ls.getLocalStorageItem(ApplicationNames.money)
  }

  get fileName(): string {
    return this.hasDataInLocalStorage && this.ls.getLocalRecord(ApplicationNames.money)?.file_name || '';
  }

  constructor(private storage: OneMoneyStorageService, private ls: LocalStorageService, private router: Router) { }

}
