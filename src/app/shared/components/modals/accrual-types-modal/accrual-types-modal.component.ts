import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModalListComponent } from '../base-modal-list-component';

import {
  getError,
  getAccrualTypes,
} from './reducers/accrual-types-modal.selectors';
import * as actions from './reducers/accrual-types-modal.actions';
import { AccrualTypesResponse } from './accrual-types-modal.model';

@Component({
  selector: 'kyr-accrual-types-modal',
  templateUrl: './accrual-types-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccrualTypesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accruals-types';
  modelList$: Observable<AccrualTypesResponse>;

  selectorGetList = getAccrualTypes;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  periodicityTypeTranslator: any;
  periodicityTypeOptions: any[] = [];
  @ViewChild('validityDateStartTemplate')
  validityDateStartTemplate: TemplateRef<any>;
  @ViewChild('validityDateEndTemplate')
  validityDateEndTemplate: TemplateRef<any>;
  @ViewChild('periodicityTypeTemplate')
  periodicityTypeTemplate: TemplateRef<any>;

  ngAfterViewInit() {
    this.setPeriodicityTypeOptions();
    super.ngAfterViewInit();
  }

  setTableColumns(): any[] {
    return [
      {
        id: 'code',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.code`),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'validity_date_start',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.validity_date_start`
        ),
        template: this.validityDateStartTemplate,
      },
      {
        id: 'validity_date_end',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.validity_date_end`
        ),
        template: this.validityDateEndTemplate,
      },
      {
        id: 'periodicity_type',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.periodicity_type`
        ),
        template: this.periodicityTypeTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        code: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.code`
          ),
          value: null,
          mainField: true,
        }),
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
        validity_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validity_date_start`
          ),
          value: null,
        }),
        validity_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validity_date_end`
          ),
          value: null,
        }),
        periodicity_type: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
      }),
    });
  }

  private setPeriodicityTypeOptions() {
    this.periodicityTypeTranslator = {
      1: this.i18nextPipe.transform(`${this.modulePath}:options.yearly`),
      2: this.i18nextPipe.transform(`${this.modulePath}:options.quarterly`),
      3: this.i18nextPipe.transform(`${this.modulePath}:options.semiannual`),
      4: this.i18nextPipe.transform(`${this.modulePath}:options.monthly`),
      5: this.i18nextPipe.transform(`${this.modulePath}:options.weekly`),
      6: this.i18nextPipe.transform(`${this.modulePath}:options.other`),
    };

    this.periodicityTypeOptions = [
      {
        label: `${this.modulePath}:options.all`,
        value: '',
      },
      {
        label: `${this.modulePath}:options.yearly`,
        value: '1',
      },
      {
        label: `${this.modulePath}:options.quarterly`,
        value: '2',
      },
      {
        label: `${this.modulePath}:options.semiannual`,
        value: '3',
      },
      {
        label: `${this.modulePath}:options.monthly`,
        value: '4',
      },
      {
        label: `${this.modulePath}:options.weekly`,
        value: '5',
      },
      {
        label: `${this.modulePath}:options.other`,
        value: '6',
      },
    ];
  }
}
