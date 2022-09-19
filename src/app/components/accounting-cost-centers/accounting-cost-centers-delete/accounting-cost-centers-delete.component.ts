import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccountingCostCenter,
  getSelectedAccountingCostCenters,
} from '../reducers/accounting-cost-centers.selectors';
import * as actions from '../reducers/accounting-cost-centers.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccountingCostCenter } from '../accounting-cost-center.model';

@Component({
  selector: 'kyr-accounting-cost-centers-delete',
  templateUrl: './accounting-cost-centers-delete.component.html',
})
export class AccountingCostCentersDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccountingCostCenter[]>;
  modelList: AccountingCostCenter[] = [];
  returnUrl = ['/accounting-cost-centers'];
  modulePath = 'accounting-cost-centers';

  selectorGetModel = getAccountingCostCenter;
  selectorGetSelected = getSelectedAccountingCostCenters;
  actionRequestFail = actions.AccountingCostCentersActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.AccountingCostCentersActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
