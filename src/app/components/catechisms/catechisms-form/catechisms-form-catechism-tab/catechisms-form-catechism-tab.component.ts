import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatechismCatechist, CatechismStudent } from '../../catechism.model';

@Component({
  selector: 'kyr-catechisms-form-catechism-tab',
  templateUrl: './catechisms-form-catechism-tab.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CatechismsFormCatechismTabComponent implements OnInit {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() catechistsFormArray: FormArray;
  @Input() catechistsDS: TableDataSource<any>;
  @Input() catechistsColumns: any[];

  @Input() studentsFormArray: FormArray;
  @Input() studentsDS: TableDataSource<any>;
  @Input() studentsColumns: any[];

  /* This specific's component fields */
  yearsOptions: Array<{ value: number; label: string }> = [];
  weekdaysOptions: Array<{ value: number; label: string }> = [];

  newCatechist: CatechismCatechist = {
    catechism_id: null,
    entity_description: null,
    entity_id: null,
    id: null,
  }; // The object wich will be added to a new line

  newStudent: CatechismStudent = {
    catechism_id: null,
    created_at: null,
    deleted: false,
    education_sponsor_description: null,
    education_sponsor_id: null,
    entity_description: null,
    entity_id: null,
    id: null,
    inscription_date: this.sharedModule.dateToUtc(new Date()),
    observations: null,
    transferred: false,
    updated_at: null,
  }; // The object wich will be added to a new line

  constructor(
    private i18nextPipe: I18NextPipe,
    private fb: FormBuilder,
    private sharedModule: SharedModule
  ) {}

  ngOnInit() {
    this.yearsOptions = [
      {
        label: this.i18nextPipe.transform('translation:all'),
        value: null,
      },
      {
        value: 1,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.1_year`
        ),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.2_year`
        ),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.3_year`
        ),
      },
      {
        value: 4,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.4_year`
        ),
      },
      {
        value: 5,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.5_year`
        ),
      },
      {
        value: 6,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.6_year`
        ),
      },
      {
        value: 7,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.7_year`
        ),
      },
      {
        value: 8,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.8_year`
        ),
      },
      {
        value: 9,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.9_year`
        ),
      },
      {
        value: 10,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:catechism_years.10_year`
        ),
      },
    ];

    this.weekdaysOptions = [
      {
        label: '----',
        value: null,
      },
      {
        value: 1,
        label: this.i18nextPipe.transform('translation:weekdays.monday'),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform('translation:weekdays.tuesday'),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform('translation:weekdays.wednesday'),
      },
      {
        value: 4,
        label: this.i18nextPipe.transform('translation:weekdays.thursday'),
      },
      {
        value: 5,
        label: this.i18nextPipe.transform('translation:weekdays.friday'),
      },
      {
        value: 6,
        label: this.i18nextPipe.transform('translation:weekdays.saturday'),
      },
      {
        value: 7,
        label: this.i18nextPipe.transform('translation:weekdays.sunday'),
      },
    ];
  }

  addTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(this.fb.group(newObj));
    tableDS.data = formArray.value;
  }
}
