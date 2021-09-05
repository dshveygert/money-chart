import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneMoneyPageComponent } from './one-money-page/one-money-page.component';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OneMoneyModule { }
