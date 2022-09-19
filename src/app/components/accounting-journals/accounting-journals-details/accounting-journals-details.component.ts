import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accounting-journals.actions';
import { getAccountingJournal } from '../reducers/accounting-journals.selectors';
import { Observable } from 'rxjs';
import { AccountingJournal } from '../accounting-journal.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-accounting-journals-details',
  templateUrl: './accounting-journals-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingJournalsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccountingJournal>;
  returnUrl = '/accounting-journals';
  modulePath = 'accounting-journals';
  viewName = 'AccountingJournal';

  selectorGetModel = getAccountingJournal;
  actionRequestFail = actions.AccountingJournalsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
}
