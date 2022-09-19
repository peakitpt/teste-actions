import { Component, Input, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { CuriaEconomicCouncilAppointment } from '../../curia-economic-council.model';

@Component({
  selector: 'kyr-curia-economic-councils-form-main-tab',
  templateUrl: './curia-economic-councils-form-main-tab.component.html',
})
export class CuriaEconomicCouncilsFormMainTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() emolumentsRightTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() priestsRightTemplate: TemplateRef<any>;
  @Input() curiaFunctionsRightTemplate: TemplateRef<any>;
  @Input() chapelriesRightTemplate: TemplateRef<any>;

  applicantFunctionQSP = {
    serialize: 'curia_functions_modal',
  };

  priestsAndPersonsQSP = {
    serialize: 'priests_and_persons',
    priests_and_persons: 'true',
  };

  canSignQSP = {
    can_sign: 'true',
  };

  groupId3QSP = {
    group_id: '3',
  };

  newAppointment: CuriaEconomicCouncilAppointment = {
    created_at: null,
    curia_economic_council_id: null,
    curia_function_description: null,
    curia_function_id: null,
    entity_description: null,
    entity_id: null,
    id: null,
    updated_at: null,
    _destroy: false,
  };

  @Input() appointmentsFormArray: FormArray;
  @Input() appointmentsDS: TableDataSource<any>;
  @Input() appointmentsColumns: any[];

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
