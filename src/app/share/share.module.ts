import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TUI_BUTTON_OPTIONS,
  TuiRootModule,
  TuiDialogModule,
  TuiNotificationsModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {TuiLetModule} from "@taiga-ui/cdk";
import { TuiCalendarMonthModule, TuiInputFileModule, TuiTabsModule, TuiBadgeModule,
TuiIslandModule, TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import {TuiAxesModule, TuiBarModule, TuiBarChartModule, TuiLineDaysChartModule} from '@taiga-ui/addon-charts';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { TimePeriodFilterComponent } from './components/time-period-filter/time-period-filter.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';

const components = [UploadFileComponent, TimePeriodFilterComponent, CategoryListComponent, BarChartComponent];
const modules = [CommonModule, ReactiveFormsModule, FormsModule, TuiInputFileModule, TuiTabsModule, NgxCsvParserModule,
  TuiCalendarMonthModule, TuiIslandModule, TuiButtonModule, TuiRootModule, TuiDialogModule, TuiNotificationsModule,
  TuiBadgeModule, TuiBarChartModule, TuiLineDaysChartModule, TuiAxesModule, TuiBarModule, TuiDataListModule,
  TuiDataListWrapperModule, TuiSelectModule, TuiLoaderModule, TuiLetModule, TuiTextfieldControllerModule];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ],
  providers: [
    {
      provide: TUI_BUTTON_OPTIONS,
      useValue: {
        appearance: 'secondary',
        size: 'm',
        shape: 'square'
      },
    },
  ]
})
export class ShareModule { }
