import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-one-money-page',
  templateUrl: './one-money-page.component.html',
  styleUrls: ['./one-money-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneMoneyPageComponent implements OnInit {

  uploadFile(file: string): void {
    console.log('uploadFile', file);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
