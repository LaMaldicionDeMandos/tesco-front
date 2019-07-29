import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent, AccountModalContentComponent } from './accounts/accounts.component';

import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/es-AR';

registerLocaleData(localeAr, 'es-AR');

@NgModule({
  declarations: [
    AppComponent,
    AccountModalContentComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  exports: [AccountModalContentComponent],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AccountModalContentComponent]
})
export class AppModule { }
