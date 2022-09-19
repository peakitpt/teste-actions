import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccountingChartAccount,
  getSelectedAccountingChartAccounts,
} from '../reducers/accounting-chart-accounts.selectors';
import * as actions from '../reducers/accounting-chart-accounts.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccountingChartAccount } from '../accounting-chart-account.model';

@Component({
  selector: 'kyr-accounting-chart-accounts-delete',
  templateUrl: './accounting-chart-accounts-delete.component.html',
})
export class AccountingChartAccountsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccountingChartAccount[]>;
  modelList: AccountingChartAccount[] = [];
  returnUrl = ['/accounting-chart-accounts'];
  modulePath = 'accounting-chart-accounts';

  selectorGetModel = getAccountingChartAccount;
  selectorGetSelected = getSelectedAccountingChartAccounts;
  actionRequestFail = actions.AccountingChartAccountsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete =
    actions.AccountingChartAccountsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
