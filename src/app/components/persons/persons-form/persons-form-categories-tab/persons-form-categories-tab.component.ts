import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-persons-form-categories-tab',
  templateUrl: './persons-form-categories-tab.component.html'
})
export class PersonsFormCategoriesTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  constructor() {}
}
