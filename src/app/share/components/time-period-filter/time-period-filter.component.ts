import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TimePeriodFilterService} from "../../services/time-period-filter.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-time-period-filter',
  templateUrl: './time-period-filter.component.html',
  styleUrls: ['./time-period-filter.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePeriodFilterComponent {
  get month$(): Observable<string> {
    return this.timePeriodFilter.selectedMonth$;
  }

  constructor(public timePeriodFilter: TimePeriodFilterService) { }

}
