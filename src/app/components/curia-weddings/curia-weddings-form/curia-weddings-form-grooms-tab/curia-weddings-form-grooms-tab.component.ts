import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-curia-weddings-form-grooms-tab',
  templateUrl: './curia-weddings-form-grooms-tab.component.html',
})
export class CuriaWeddingsFormGroomsTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() personsRightTemplate: TemplateRef<any>;

  entityGroomQSP = {
    modal: true,
    entity_type: 'Paroquianos',
    sex: true,
    serialize: 'parishioners_simple',
    format: 'json',
    documents: true,
  };
  entityBrideQSP = {
    modal: true,
    entity_type: 'Paroquianos',
    sex: false,
    serialize: 'parishioners_simple',
    format: 'json',
    documents: true,
  };
}
