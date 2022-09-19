import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-curia-provisions-form-main-tab',
  templateUrl: './curia-provisions-form-main-tab.component.html',
})
export class CuriaProvisionsFormMainTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() emolumentsRightTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() priestsRightTemplate: TemplateRef<any>;
  @Input() curiaFunctionsRightTemplate: TemplateRef<any>;
  @Input() chapelriesRightTemplate: TemplateRef<any>;
  @Input() curiaProvisionTypesRightTemplate: TemplateRef<any>;

  priestsAndPersonsQSP = {
    serialize: 'priests_and_persons',
    priests_and_persons: 'true',
  };

  canSignQSP = {
    can_sign: 'true',
  };

  group3QSP = {
    group_id: '3',
  };

  placeQSP = {
    entity_type: 'Locals',
    translatable: 'true',
    serialize: 'parishioners_complete_relation',
  };
}
