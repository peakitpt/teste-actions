import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accounting-cost-centers.actions';
import { getAccountingCostCenter } from '../reducers/accounting-cost-centers.selectors';
import { Observable } from 'rxjs';
import { AccountingCostCenter } from '../accounting-cost-center.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-accounting-cost-centers-details',
  templateUrl: './accounting-cost-centers-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingCostCentersDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccountingCostCenter>;
  returnUrl = '/accounting-cost-centers';
  modulePath = 'accounting-cost-centers';
  viewName = 'AccountingCostCenter';

  selectorGetModel = getAccountingCostCenter;
  actionRequestFail = actions.AccountingCostCentersActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
}
