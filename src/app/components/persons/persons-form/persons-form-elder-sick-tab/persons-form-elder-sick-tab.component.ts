import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-persons-form-elder-sick-tab',
  templateUrl: './persons-form-elder-sick-tab.component.html'
})
export class PersonsFormElderSickTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() todayDate: Date;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() priestsRightTemplate: TemplateRef<any>;

  constructor() {}
}
