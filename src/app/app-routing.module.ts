import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartPageComponent } from './chart/chart-page/chart-page.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'chart', component: ChartPageComponent, children: [
      {path: '', redirectTo: '1money', pathMatch: 'full'},
      {path: '1money', loadChildren: () => import('./one-money/one-money.module').then(m => m.OneMoneyModule)}
    ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
