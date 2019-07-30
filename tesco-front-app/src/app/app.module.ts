import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent, AccountModalContentComponent } from './accounts/accounts.component';

import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/es-AR';
import {ToastsContainer} from "./services/toaster.component";
import {ToastService} from "./services/toast-service";
import {ApiService} from "./services/ApiService";

registerLocaleData(localeAr, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    AccountModalContentComponent,
    AccountsComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [AccountModalContentComponent],
  providers: [ToastService, ApiService],
  bootstrap: [AppComponent],
  entryComponents: [AccountModalContentComponent]
})
export class AppModule { }
