import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-curia-baptisms-form-main-tab',
  templateUrl: './curia-baptisms-form-main-tab.component.html',
})
export class CuriaBaptismsFormMainTabComponent {
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
  @Input() chapelriesRightTemplate: TemplateRef<any>;

  entityQSP = {
    modal: true,
    serialize: 'persons_name_place_birth_date',
  };

  entityBaptizedAuthorizationQSP = {
    modal: true,
    entity_type: 'Sacerdote',
    serialize: 'parishioners_simple',
  };

  documentEntityQSP = {
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users: 'true',
  };
}
