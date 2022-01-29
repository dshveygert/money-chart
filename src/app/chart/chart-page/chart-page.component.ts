import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SettingsService} from '../../share/services/settings.service';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartPageComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit(): void {
  }

}
