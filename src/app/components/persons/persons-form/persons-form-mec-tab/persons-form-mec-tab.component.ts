import { Component, Input, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { EntitiesMecsLine } from '../../person.model';

@Component({
  selector: 'kyr-persons-form-mec-tab',
  templateUrl: './persons-form-mec-tab.component.html'
})
export class PersonsFormMecTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() todayDate: Date;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() worshipplacesRightTemplate: TemplateRef<any>;

  @Input() mecRenewalsFormArray: FormArray;
  @Input() mecRenewalsDS: TableDataSource<any>;
  @Input() mecRenewalsColumns: any[];

  newMecLine: EntitiesMecsLine = {
    id: null,
    entity_mec_id: null,
    renewal_date: null
  }; // The object wich will be added to a new line

  constructor(private fb: FormBuilder) {}

  addTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(this.fb.group(newObj));
    tableDS.data = formArray.value;
  }
}
