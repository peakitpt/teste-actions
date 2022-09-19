import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/accounting-transaction-types.actions';
import { getAccountingTransactionType } from '../reducers/accounting-transaction-types.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { AccountingTransactionType } from '../accounting-transaction-type.model';

@Component({
  selector: 'kyr-accounting-transaction-types-form',
  templateUrl: './accounting-transaction-types-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AccountingTransactionType>;
  modulePath = 'accounting-transaction-types';
  preFillWithNew = true;

  selectorGetModel = getAccountingTransactionType;
  actionRequestFail = actions.AccountingTransactionTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.AccountingTransactionTypesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.AccountingTransactionTypesActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;

  initializeForm() {
    this.form = this.fb.group({
      code: [null, [Validators.required, Validators.maxLength(1)]],
      code_and_description: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      description: [null, Validators.required],
      id: [],
      is_default: [],
      locale: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }
}
