import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accounting-taxonomy-codes.actions';
import { getAccountingTaxonomyCode } from '../reducers/accounting-taxonomy-codes.selectors';
import { Observable } from 'rxjs';
import { AccountingTaxonomyCode } from '../accounting-taxonomy-code.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-accounting-taxonomy-codes-details',
  templateUrl: './accounting-taxonomy-codes-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTaxonomyCodesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccountingTaxonomyCode>;
  returnUrl = '/accounting-taxonomy-codes';
  modulePath = 'accounting-taxonomy-codes';
  viewName = 'AccountingTaxonomyCode';

  selectorGetModel = getAccountingTaxonomyCode;
  actionRequestFail = actions.AccountingTaxonomyCodesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
}
