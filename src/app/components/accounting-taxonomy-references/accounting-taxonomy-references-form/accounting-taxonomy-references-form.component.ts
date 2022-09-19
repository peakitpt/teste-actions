import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/accounting-taxonomy-references.actions';
import { getAccountingTaxonomyReference } from '../reducers/accounting-taxonomy-references.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { AccountingTaxonomyReference } from '../accounting-taxonomy-reference.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-accounting-taxonomy-references-form',
  templateUrl: './accounting-taxonomy-references-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTaxonomyReferencesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AccountingTaxonomyReference>;
  modulePath = 'accounting-taxonomy-references';
  preFillWithNew = true;

  selectorGetModel = getAccountingTaxonomyReference;
  actionRequestFail =
    actions.AccountingTaxonomyReferencesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.AccountingTaxonomyReferencesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost =
    actions.AccountingTaxonomyReferencesActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;

  initializeForm() {
    this.form = this.fb.group({
      code: [null, Validators.required],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      description: [null, Validators.required],
      id: [],
      is_default: [false],
      locale: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }
}
