import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-curia-administrative-processes-form-documents-tab',
  templateUrl:
    './curia-administrative-processes-form-documents-tab.component.html',
})
export class CuriaAdministrativeProcessesFormDocumentsTabComponent {
  environment = environment;

  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() priestsRightTemplate: TemplateRef<any>;

  priestsQSP = {
    can_sign: true,
  };
  entityQSP = {
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users: true,
  };
  placeQSP = {
    entity_type: 'Locals',
    translatable: true,
    serialize: 'parishioners_complete_relation',
  };

  constructor(public i18nextPipe: I18NextPipe) {}
}
