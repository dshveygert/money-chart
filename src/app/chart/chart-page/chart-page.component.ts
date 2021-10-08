import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
