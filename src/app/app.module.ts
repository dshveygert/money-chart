import { TuiRootModule, TuiDialogModule, TuiNotificationsModule } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiNotificationsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
