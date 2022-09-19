import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-baptisms-form-main-tab',
  templateUrl: './baptisms-form-main-tab.component.html',
})
export class BaptismsFormMainTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() personsRightTemplate: TemplateRef<any>;
  @Input() emolumentsRightTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() worshipplacesRightTemplate: TemplateRef<any>;
  @Input() priestsAndPersonsRightTemplate: TemplateRef<any>;
  @Input() priestsRightTemplate: TemplateRef<any>;

  entityQSP = {
    serialize: 'persons_name_place_birth_date',
  };
}
