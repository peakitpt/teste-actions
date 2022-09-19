import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/accounting-transaction-document-types.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/accounting-transaction-document-types.actions';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { getAccountingTransactionDocumentType } from '../reducers/accounting-transaction-document-types.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { AccountingTransactionDocumentType } from '../accounting-transaction-document-type.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { Numeration } from '../../numerations/numeration.model';
import * as modalActions from '../../../shared/components/modals/accounting-transaction-document-types-modal/reducers/accounting-transaction-document-types-modal.actions';

@Component({
  selector: 'kyr-accounting-transaction-document-types-form',
  templateUrl: './accounting-transaction-document-types-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionDocumentTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AccountingTransactionDocumentType>;
  modulePath = 'accounting-transaction-document-types';
  preFillWithNew = true;

  selectorGetModel = getAccountingTransactionDocumentType;
  actionRequestFail =
    actions.AccountingTransactionDocumentTypesActionTypes
      .RequestFailAccountingTransactionDocumentTypes;
  actionRequestGetAll = actions.RequestGetAllAccountingTransactionDocumentTypes;
  actionRequestGetOne = actions.RequestGetAccountingTransactionDocumentType;
  actionRequestPut = actions.RequestPutAccountingTransactionDocumentType;
  actionSuccessPut =
    actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessPutAccountingTransactionDocumentType;
  actionRequestPost = actions.RequestPostAccountingTransactionDocumentType;
  actionSuccessPost =
    actions.AccountingTransactionDocumentTypesActionTypes
      .SuccessPostAccountingTransactionDocumentType;
  actionRequestGetNew = actions.RequestGetNew;
  actionRequestSetSelected = modalActions.RequestSetSelected;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      fb,
      i18nextPipe,
      snackBarService,
      actionSubject
    );
  }

  initializeForm() {
    this.form = this.fb.group({
      company_id: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      description: [null, Validators.required],
      id: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }
}
