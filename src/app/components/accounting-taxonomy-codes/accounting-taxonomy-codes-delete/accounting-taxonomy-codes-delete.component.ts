import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccountingTaxonomyCode,
  getSelectedAccountingTaxonomyCodes,
} from '../reducers/accounting-taxonomy-codes.selectors';
import * as actions from '../reducers/accounting-taxonomy-codes.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccountingTaxonomyCode } from '../accounting-taxonomy-code.model';

@Component({
  selector: 'kyr-accounting-taxonomy-codes-delete',
  templateUrl: './accounting-taxonomy-codes-delete.component.html',
})
export class AccountingTaxonomyCodesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccountingTaxonomyCode[]>;
  modelList: AccountingTaxonomyCode[] = [];
  returnUrl = ['/accounting-taxonomy-codes'];
  modulePath = 'accounting-taxonomy-codes';

  selectorGetModel = getAccountingTaxonomyCode;
  selectorGetSelected = getSelectedAccountingTaxonomyCodes;
  actionRequestFail = actions.AccountingTaxonomyCodesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete =
    actions.AccountingTaxonomyCodesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
