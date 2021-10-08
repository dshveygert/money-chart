import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneMoneyPageComponent } from './one-money-page/one-money-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from "../share/share.module";


const routes: Routes = [
  {
    path: '',
    component: OneMoneyPageComponent
  }
];

@NgModule({
  declarations: [
    OneMoneyPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  exports: [
    RouterModule
  ]
})
export class OneMoneyModule { }
