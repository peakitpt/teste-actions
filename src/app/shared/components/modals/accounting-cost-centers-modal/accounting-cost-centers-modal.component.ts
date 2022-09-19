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
  getAccountingCostCenters,
} from './reducers/accounting-cost-centers-modal.selectors';
import * as actions from './reducers/accounting-cost-centers-modal.actions';
import { AccountingCostCentersResponse } from './accounting-cost-centers-modal.model';

@Component({
  selector: 'kyr-accounting-cost-centers-modal',
  templateUrl: './accounting-cost-centers-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountingCostCentersModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-cost-centers';
  modelList$: Observable<AccountingCostCentersResponse>;

  selectorGetList = getAccountingCostCenters;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

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
          mainField: true,
          value: null,
        }),
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
      }),
    });
  }
}
