import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ceil} from '@taiga-ui/cdk';
import {BarChart} from "../../../../api/models";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent implements OnInit {
  @Input() data: BarChart = {} as BarChart;

  get max(): number {
    return this.data?.max ?? 500000;
  }

  getHeight(max: number): number {
    return (max / ceil(max, -3)) * 100;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
