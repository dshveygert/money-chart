import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TUI_BUTTON_OPTIONS,
  TuiRootModule,
  TuiDialogModule,
  TuiNotificationsModule
} from '@taiga-ui/core';
import { TuiCalendarMonthModule, TuiInputFileModule, TuiTabsModule,
TuiIslandModule } from '@taiga-ui/kit';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { TimePeriodFilterComponent } from './components/time-period-filter/time-period-filter.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const components = [UploadFileComponent, TimePeriodFilterComponent, CategoryListComponent];
const modules = [CommonModule, ReactiveFormsModule, FormsModule, TuiInputFileModule, TuiTabsModule, NgxCsvParserModule,
  TuiCalendarMonthModule, TuiIslandModule, TuiButtonModule, TuiRootModule, TuiDialogModule, TuiNotificationsModule];

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
