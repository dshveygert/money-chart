import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneMoneyPageComponent } from './one-money-page/one-money-page.component';
import { ShareModule } from '../share/share.module';
import { OneMoneyStorageService } from './services/one-money-storage.service';
import { OneMoneyStatisticsPageComponent } from './one-money-statistics-page/one-money-statistics-page.component';


const routes: Routes = [
  {path: '', component: OneMoneyPageComponent},
  {path: 'statistics', component: OneMoneyStatisticsPageComponent}
];

const components = [OneMoneyPageComponent, OneMoneyStatisticsPageComponent];
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
