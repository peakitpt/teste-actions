import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-weddings-form-grooms-tab',
  templateUrl: './weddings-form-grooms-tab.component.html',
})
export class WeddingsFormGroomsTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() personsRightTemplate: TemplateRef<any>;

  entityGroomQSP = {
    modal: 'true',
    entity_type: 'Paroquianos',
    sex: 'true',
    serialize: 'parishioners_simple',
  };
  entityBrideQSP = {
    modal: 'true',
    entity_type: 'Paroquianos',
    sex: 'false',
    serialize: 'parishioners_simple',
  };
}
