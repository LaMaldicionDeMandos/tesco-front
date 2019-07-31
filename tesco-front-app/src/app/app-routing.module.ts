import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountsComponent} from "./accounts/accounts.component";
import {AccountComponent} from "./account/account.component";


const routes: Routes = [
  { path: '', component: AccountsComponent },
  { path: 'account/:id', component: AccountComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
