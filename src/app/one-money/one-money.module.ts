import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneMoneyPageComponent } from './one-money-page/one-money-page.component';
import { ShareModule } from '../share/share.module';
import { OneMoneyStorageService } from "./services/one-money-storage.service";


const routes: Routes = [
  {
    path: '',
    component: OneMoneyPageComponent
  }
];

const components = [OneMoneyPageComponent];
const services = [OneMoneyStorageService];

@NgModule({
  declarations: components,
  imports: [
    RouterModule.forChild(routes),
    ShareModule
  ],
  exports: [
    RouterModule
  ],
  providers: services
})
export class OneMoneyModule { }
