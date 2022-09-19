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
  getAccountingJournals,
} from './reducers/accounting-journals-modal.selectors';
import * as actions from './reducers/accounting-journals-modal.actions';
import { AccountingJournalsResponse } from './accounting-journals-modal.model';

@Component({
  selector: 'kyr-accounting-journals-modal',
  templateUrl: './accounting-journals-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountingJournalsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-journals';
  modelList$: Observable<AccountingJournalsResponse>;

  selectorGetList = getAccountingJournals;
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
