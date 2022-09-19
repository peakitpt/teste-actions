import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { EntityPersonAppointment } from '../../person.model';

@Component({
  selector: 'kyr-persons-form-curia-tab',
  templateUrl: './persons-form-curia-tab.component.html'
})
export class PersonsFormCuriaTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() appointmentsFormArray: FormArray;
  @Input() appointmentsDS: TableDataSource<any>;
  @Input() appointmentsColumns: any[];

  newAppointment: EntityPersonAppointment = {
    entity_person_id: null,
    start_date: null,
    end_date: null,
    curia_function_id: null,
    curia_function_description: null,
    appointment_place_id: null,
    appointment_place_description: null,
    representing_id: null,
    representing_description: null,
    description: null,
    created_at: null,
    updated_at: null,
    id: null,
    institution_appointment_id: null
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
