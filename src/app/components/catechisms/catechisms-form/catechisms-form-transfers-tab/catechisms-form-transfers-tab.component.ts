import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatechismTransfer } from '../../catechism.model';

@Component({
  selector: 'kyr-catechisms-form-transfers-tab',
  templateUrl: './catechisms-form-transfers-tab.component.html',
})
export class CatechismsFormTransfersTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() transfersFormArray: FormArray;
  @Input() transfersDS: TableDataSource<any>;
  @Input() transfersColumns: any[];

  /* This specific's component fields */
  newTransfer: CatechismTransfer = {
    chapelry_description: null,
    chapelry_id: null,
    entity_description: null,
    entity_id: null,
    next_class_year_inscription: false,
    report_url: null,
    transfer_date: this.sharedModule.dateToUtc(new Date()),
    transited: false,
  }; // The object wich will be added to a new line

  constructor(private fb: FormBuilder, private sharedModule: SharedModule) {}

  addTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(this.fb.group(newObj));
    tableDS.data = formArray.value;
  }
}
