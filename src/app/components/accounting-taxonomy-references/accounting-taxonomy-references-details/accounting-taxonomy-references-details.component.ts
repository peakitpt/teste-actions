import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accounting-taxonomy-references.actions';
import { getAccountingTaxonomyReference } from '../reducers/accounting-taxonomy-references.selectors';
import { Observable } from 'rxjs';
import { AccountingTaxonomyReference } from '../accounting-taxonomy-reference.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-accounting-taxonomy-references-details',
  templateUrl: './accounting-taxonomy-references-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTaxonomyReferencesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccountingTaxonomyReference>;
  returnUrl = '/accounting-taxonomy-references';
  modulePath = 'accounting-taxonomy-references';
  viewName = 'AccountingTaxonomyReference';

  selectorGetModel = getAccountingTaxonomyReference;
  actionRequestFail =
    actions.AccountingTaxonomyReferencesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
}
