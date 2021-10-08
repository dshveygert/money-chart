import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputFileModule, TuiTabsModule } from '@taiga-ui/kit';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

const components = [
  UploadFileComponent
];
const modules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  TuiInputFileModule,
  TuiTabsModule];

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
  ]
})
export class ShareModule { }
