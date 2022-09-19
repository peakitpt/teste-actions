import { Component, Input, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { environment } from 'src/environments/environment';
import { CuriaSecretariatEntity } from '../../curia-secretariat.model';

@Component({
  selector: 'kyr-curia-secretariats-form-documents-tab',
  templateUrl: './curia-secretariats-form-documents-tab.component.html',
})
export class CuriaSecretariatsFormDocumentsTabComponent {
  environment = environment;

  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() priestsRightTemplate: TemplateRef<any>;
  @Input() curiaFunctionsRightTemplate: TemplateRef<any>;

  newEntity: CuriaSecretariatEntity = {
    created_at: null,
    curia_function_description: null,
    curia_function_id: null,
    curia_secretariat_id: null,
    description: null,
    entity_description: null,
    entity_id: null,
    id: null,
    place_description: null,
    place_id: null,
    updated_at: null,
    _destroy: false,
  };
  @Input() entitiesFormArray: FormArray;
  @Input() entitiesDS: TableDataSource<any>;
  @Input() entitiesColumns: any[];

  typesOptions: Array<{ label: string; value: number }> = [];

  constructor(public fb: FormBuilder, public i18nextPipe: I18NextPipe) {}

  addTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(this.fb.group(newObj));
    tableDS.data = formArray.value;
  }
}
