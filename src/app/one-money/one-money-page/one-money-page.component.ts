import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {OneMoneyStorageService} from "../services/one-money-storage.service";

@Component({
  selector: 'app-one-money-page',
  templateUrl: './one-money-page.component.html',
  styleUrls: ['./one-money-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneMoneyPageComponent implements OnInit {

  uploadFile(file: string): void {
    this.storage.init(file);
  }

  ngOnInit(): void {
  }

  constructor(private storage: OneMoneyStorageService) { }

}
