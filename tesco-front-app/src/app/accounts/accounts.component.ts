import {Component, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast-service';
import {ApiService} from '../services/ApiService';

@Component({
  selector: 'app-account-modal-content',
  template: `
    <div class="modal-header"><h4 class="modal-title">Nueva Cuenta</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()"><span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body"><input #accountNumberInput class="form-control" placeholder="Número de cuenta" type="number">
      <div class="row">
        <div ngbDropdown class="d-inline-block">
          <button class="btn" id="currencyInput" ngbDropdownToggle>Moneda</button>
          <div ngbDropdownMenu aria-labelledby="currency">
            <button ngbDropdownItem (click)="currency = 'PESO'">PESO</button>
            <button ngbDropdownItem (click)="currency = 'DOLLAR'">DOLLAR</button>
            <button ngbDropdownItem (click)="currency = 'EURO'">EURO</button>
          </div>
          <label>{{currency}}</label></div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark"
              (click)="activeModal.close({accountNumber: accountNumberInput.value, currency: currency})">Crear
      </button>
    </div>    `
})
export class AccountModalContentComponent {
  private accountNumber: number;
  public currency: string;
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public accounts: any;
  constructor(private modalService: NgbModal, private toastService: ToastService, private apiService: ApiService) {
    apiService.findAccounts().subscribe((accounts => this.accounts = accounts));
  }

  ngOnInit() {
  }

  newAccount() {
    const modalRef = this.modalService.open(AccountModalContentComponent)
      .result.then((account) => {
        console.log('Account number: ' + account.accountNumber + ' Currency: ' + account.currency);
        if (this.validateNewAccount(account)) {
          this.apiService.newAccount(account).subscribe((newAccount) => this.accounts.push(newAccount));
        }
      }, () => console.log('Close'));
  }

  deleteAccount(account) {
    this.apiService.deleteAccount(account).subscribe(() => this.accounts.splice(this.accounts.indexOf(account, 0), 1),
      (error) => {
        let errorMessage: string;
        if (error.status === 404) {
          errorMessage = `Error: No se encontró la cuenta número ${account.id}`;
        } else if (error.status === 304) {
          errorMessage = `Error: La cuenta número ${account.accountNumber} ya tiene movimientos, no puede ser eliminada.`;
        } else {
          errorMessage = 'Error: Algo pasó y no se pudo eliminar la cuenta';
        }
        this.toastService.show(errorMessage, { classname: 'bg-danger text-light', delay: 5000 });
      });
  }

  private validateNewAccount(account: any): boolean {
    let isValid = true;
    if (account.accountNumber === undefined || account.accountNumber <= 0) {
      isValid = false;
      this.toastService.show('Error: El numero de cuenta debe ser mayor que 0.', { classname: 'bg-danger text-light', delay: 5000 });
    }
    if (account.currency === undefined) {
      isValid = false;
      this.toastService.show('Error: Debes seleccionar una moneda.', { classname: 'bg-danger text-light', delay: 5000 });
    }
    return isValid;
  }

}
