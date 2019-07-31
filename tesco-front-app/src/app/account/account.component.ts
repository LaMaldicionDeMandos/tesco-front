import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from "../services/ApiService";
import {AccountModalContentComponent} from "../accounts/accounts.component";
import {ToastService} from "../services/toast-service";

@Component({
  selector: 'app-order-modal-content',
  template: `
    <div class="modal-header"><h4 class="modal-title">Nuevo Movimiento</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()"><span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <input #amountInput class="form-control" placeholder="Monto" type="number">
      <input #descriptionInput class="form-control" placeholder="Descripción">
      <div class="row">
        <div ngbDropdown class="d-inline-block">
          <button class="btn" id="currencyInput" ngbDropdownToggle>Tipo</button>
          <div ngbDropdownMenu aria-labelledby="currency">
            <button ngbDropdownItem (click)="type = 'CREDIT'">CREDITO</button>
            <button ngbDropdownItem (click)="type = 'DEBIT'">DEBITO</button>
          </div>
          <label>{{type}}</label></div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark"
              (click)="activeModal.close({amount: amountInput.value, type: type, description:descriptionInput.value})">Agregar
      </button>
    </div>    `
})
export class OrderModalContentComponent {
  public type: string;
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public account:any;
  public orders:any[];
  constructor(private modalService: NgbModal, private toastService: ToastService, private route:ActivatedRoute, private service:ApiService) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.account = service.getAccount(id);
    this.service.getOrders(id).subscribe((orders) => this.orders = orders);
  }

  ngOnInit() {
  }

  public newOrder() {
    const modalRef = this.modalService.open(OrderModalContentComponent)
      .result.then((order) => {
        console.log('Order type: ' + order.type + ' mount: ' + order.amount + ' desc: ' + order.description);
        if (this.validateNewOrder(order)) {
          this.service.newOrder(this.account.id, order).subscribe((account) => {
            this.account = account;
            this.service.getOrders(this.account.id).subscribe((orders) => this.orders = orders);
          });
        }
      }, () => console.log('Close'));
  }

  private validateNewOrder(order: any): boolean {
    let isValid = true;
    if (order.amount === undefined || order.amount <= 0) {
      isValid = false;
      this.toastService.show('Error: El monto debe ser mayor que 0.', { classname: 'bg-danger text-light', delay: 5000 });
    }
    if (order.type === undefined) {
      isValid = false;
      this.toastService.show('Error: Debes seleccionar un tipo de movimiento.', { classname: 'bg-danger text-light', delay: 5000 });
    }
    return isValid;
  }
}
