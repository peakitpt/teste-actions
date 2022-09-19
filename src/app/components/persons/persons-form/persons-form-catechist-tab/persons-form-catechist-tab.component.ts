import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-persons-form-catechist-tab',
  templateUrl: './persons-form-catechist-tab.component.html'
})
export class PersonsFormCatechistTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() todayDate: Date;

  constructor() {}
}
