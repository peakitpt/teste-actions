import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getCurrentAccount,
  getSelectedCurrentAccounts,
} from '../reducers/current-accounts.selectors';
import * as actions from '../reducers/current-accounts.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { CurrentAccount } from '../current-account.model';

@Component({
  selector: 'kyr-current-accounts-delete',
  templateUrl: './current-accounts-delete.component.html',
})
export class CurrentAccountsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<CurrentAccount[]>;
  modelList: CurrentAccount[] = [];
  returnUrl = ['/current-accounts'];
  modulePath = 'current-accounts';

  selectorGetModel = getCurrentAccount;
  selectorGetSelected = getSelectedCurrentAccounts;
  actionRequestFail =
    actions.CurrentAccountsActionTypes.RequestFailCurrentAccounts;
  actionRequestGetAll = actions.RequestGetAllCurrentAccounts;
  actionRequestGetOne = actions.RequestGetCurrentAccount;
  actionRequestDelete = actions.RequestDeleteCurrentAccount;
  actionSuccessDelete =
    actions.CurrentAccountsActionTypes.SuccessDeleteCurrentAccount;
  actionSetSelected = actions.SetSelectedCurrentAccounts;
}
