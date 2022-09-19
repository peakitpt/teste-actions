import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-weddings-form-seat-duplicate-tab',
  templateUrl: './weddings-form-seat-duplicate-tab.component.html',
})
export class WeddingsFormSeatDuplicateTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() priestsAndPersonsRightTemplate: TemplateRef<any>;

  witnessesQSP = {
    modal: true,
    serialize: 'persons_name_place_birth_date',
  };
}
