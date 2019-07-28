import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  private accounts: any[];
  constructor() {
    this.accounts = [{ id: 1, accountNumber: 1, currency: 'PESO', balance: 1000.4567}, { id: 2, accountNumber: 2, currency: 'EURO', balance: 100.633}]
  }

  ngOnInit() {
  }

}
