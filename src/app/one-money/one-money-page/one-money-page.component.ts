import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgxCsvParser} from 'ngx-csv-parser';

@Component({
  selector: 'app-one-money-page',
  templateUrl: './one-money-page.component.html',
  styleUrls: ['./one-money-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneMoneyPageComponent implements OnInit {
  private header = false;

  uploadFile(file: string): void {
    console.log('uploadFile', file);
    const json = this.ngxCsvParser.csvStringToArray(file, ',' );
    console.log('json',json);
  }

  ngOnInit(): void {
  }

  constructor(private ngxCsvParser: NgxCsvParser) { }

}
