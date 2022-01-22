import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionLike} from "rxjs";
import {filter, tap } from 'rxjs/operators';
import { TimePeriodFilterService } from '../../share/services/time-period-filter.service';
import {DataRecordService} from "../../share/services/data-record.service";
import {ApplicationNames} from "../../api/models";
import {LocalStorageService} from "../../share/services/local-storage.service";
import {CategoriesService} from "../../share/services/categories.service";

@Component({
  selector: 'app-one-money-statistics-page',
  templateUrl: './one-money-statistics-page.component.html',
  styleUrls: ['./one-money-statistics-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneMoneyStatisticsPageComponent implements OnInit, OnDestroy {
  private dataSub!: SubscriptionLike;

  ngOnInit(): void {
    const data = this.ls.getLocalRecord(ApplicationNames.money)?.data;
    this.data.openStatistics(ApplicationNames.money, data);

    this.dataSub = this.data.data$.pipe(filter(d => d?.length > 0), tap(d => {
      this.timePeriodFilter.init(d[0]?.date, d[d?.length - 1]?.date);
      this.categories.init(ApplicationNames.money);
    })).subscribe();
  }
  ngOnDestroy(): void {
    this.data.destroy();
    this.categories.destroy();
    this.dataSub.unsubscribe();
  }

  constructor(private timePeriodFilter: TimePeriodFilterService, public data: DataRecordService,
              private ls: LocalStorageService, private categories: CategoriesService) { }

}
