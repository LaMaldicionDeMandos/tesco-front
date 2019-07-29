import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Nueva Cuenta</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <input id="accountNumber" class="form-control" placeholder="Número de cuenta">
      <div class="row">
        <div ngbDropdown class="d-inline-block">
          <button class="btn" id="currency" ngbDropdownToggle>Moneda</button>
          <div ngbDropdownMenu aria-labelledby="currency">
            <button ngbDropdownItem>PESO</button>
            <button ngbDropdownItem>DOLLAR</button>
            <button ngbDropdownItem>EURO</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class AccountModalContentComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  private accounts: any[];
  constructor(private modalService: NgbModal) {
    this.accounts = [
      { id: 1, accountNumber: 1, currency: 'PESO', balance: 1000.4567},
      { id: 2, accountNumber: 2, currency: 'EURO', balance: 100.633}];
  }

  ngOnInit() {
  }

  newAccount() {
    const modalRef = this.modalService.open(AccountModalContentComponent);
    modalRef.componentInstance.name = 'World';
  }

}
