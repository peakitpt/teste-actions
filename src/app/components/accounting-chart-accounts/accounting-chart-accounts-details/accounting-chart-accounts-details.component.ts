import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accounting-chart-accounts.actions';
import { getAccountingChartAccount } from '../reducers/accounting-chart-accounts.selectors';
import { Observable } from 'rxjs';
import { AccountingChartAccount } from '../accounting-chart-account.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-accounting-chart-accounts-details',
  templateUrl: './accounting-chart-accounts-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingChartAccountsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccountingChartAccount>;
  returnUrl = '/accounting-chart-accounts';
  modulePath = 'accounting-chart-accounts';
  viewName = 'AccountingChartAccount';

  selectorGetModel = getAccountingChartAccount;
  actionRequestFail = actions.AccountingChartAccountsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/accounting_chart_accounts/${
      this.model?.id ? this.model.id : 'report'
    }/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }
}
