import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {APP_ROUTES_CONFIG} from './app-routes.config';
import {APP_ROUTES} from './app.routes';
import {CanActivateRootService} from './utils/can-activate-root.service';
import {HttpClientModule} from '@angular/common/http';

/**
 * Первичный модуль приложения
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES, APP_ROUTES_CONFIG)
  ],
  exports: [
    RouterModule,
    HttpClientModule
  ],
  providers: [
    CanActivateRootService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
