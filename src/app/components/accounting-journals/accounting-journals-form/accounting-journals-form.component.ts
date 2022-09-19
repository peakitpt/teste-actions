import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/accounting-journals.actions';
import { getAccountingJournal } from '../reducers/accounting-journals.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { AccountingJournal } from '../accounting-journal.model';

import * as modalActions from '../../../shared/components/modals/accounting-journals-modal/reducers/accounting-journals-modal.actions';

@Component({
  selector: 'kyr-accounting-journals-form',
  templateUrl: './accounting-journals-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingJournalsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AccountingJournal>;
  modulePath = 'accounting-journals';
  preFillWithNew = true;

  selectorGetModel = getAccountingJournal;
  actionRequestFail = actions.AccountingJournalsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.AccountingJournalsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.AccountingJournalsActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;
  actionRequestSetSelected = modalActions.RequestSetSelected;

  initializeForm() {
    this.form = this.fb.group({
      accounting_exercise_id: [],
      code: [null, Validators.required],
      company_id: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      description: [null, Validators.required],
      id: [],
      serie_number: [],
      updated_at: [],
      updated_by_user_id: [],
      year: [],
    });
  }
}
