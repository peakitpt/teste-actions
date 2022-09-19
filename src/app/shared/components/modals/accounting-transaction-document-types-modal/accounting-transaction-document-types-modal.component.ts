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
  getAccountingTransactionDocumentTypes,
} from './reducers/accounting-transaction-document-types-modal.selectors';
import * as actions from './reducers/accounting-transaction-document-types-modal.actions';
import { AccountingTransactionDocumentTypesResponse } from './accounting-transaction-document-types-modal.model';

@Component({
  selector: 'kyr-accounting-transaction-document-types-modal',
  templateUrl: './accounting-transaction-document-types-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionDocumentTypesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-transaction-document-types';
  modelList$: Observable<AccountingTransactionDocumentTypesResponse>;

  selectorGetList = getAccountingTransactionDocumentTypes;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  setTableColumns(): any[] {
    return [
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
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          mainField: true,
          value: null,
        }),
      }),
    });
  }
}
