import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccountingJournal,
  getSelectedAccountingJournals,
} from '../reducers/accounting-journals.selectors';
import * as actions from '../reducers/accounting-journals.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccountingJournal } from '../accounting-journal.model';

@Component({
  selector: 'kyr-accounting-journals-delete',
  templateUrl: './accounting-journals-delete.component.html',
})
export class AccountingJournalsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccountingJournal[]>;
  modelList: AccountingJournal[] = [];
  returnUrl = ['/accounting-journals'];
  modulePath = 'accounting-journals';

  selectorGetModel = getAccountingJournal;
  selectorGetSelected = getSelectedAccountingJournals;
  actionRequestFail = actions.AccountingJournalsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.AccountingJournalsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
