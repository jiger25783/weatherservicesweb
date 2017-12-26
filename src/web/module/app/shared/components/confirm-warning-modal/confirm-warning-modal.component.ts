import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-warning-modal',
  templateUrl: './confirm-warning-modal.component.html',
})

export class ConfirmWarningModalComponent {
  constructor(private activeModal: NgbActiveModal) {}
}
