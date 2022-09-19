import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccountingTaxonomyReference,
  getSelectedAccountingTaxonomyReferences,
} from '../reducers/accounting-taxonomy-references.selectors';
import * as actions from '../reducers/accounting-taxonomy-references.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccountingTaxonomyReference } from '../accounting-taxonomy-reference.model';

@Component({
  selector: 'kyr-accounting-taxonomy-references-delete',
  templateUrl: './accounting-taxonomy-references-delete.component.html',
})
export class AccountingTaxonomyReferencesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccountingTaxonomyReference[]>;
  modelList: AccountingTaxonomyReference[] = [];
  returnUrl = ['/accounting-taxonomy-references'];
  modulePath = 'accounting-taxonomy-references';

  selectorGetModel = getAccountingTaxonomyReference;
  selectorGetSelected = getSelectedAccountingTaxonomyReferences;
  actionRequestFail =
    actions.AccountingTaxonomyReferencesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete =
    actions.AccountingTaxonomyReferencesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
