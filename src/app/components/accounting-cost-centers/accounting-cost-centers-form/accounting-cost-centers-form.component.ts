import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { SharedModule } from 'src/app/shared/shared.module';
import * as modalActions from '../../../shared/components/modals/accounting-cost-centers-modal/reducers/accounting-cost-centers-modal.actions';
import { AccountingCostCenter } from '../accounting-cost-center.model';
import * as actions from '../reducers/accounting-cost-centers.actions';
import { State } from '../reducers/accounting-cost-centers.reducer';
import { getAccountingCostCenter } from '../reducers/accounting-cost-centers.selectors';

@Component({
  selector: 'kyr-accounting-cost-centers-form',
  templateUrl: './accounting-cost-centers-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingCostCentersFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AccountingCostCenter>;
  modulePath = 'accounting-cost-centers';
  preFillWithNew = true;

  selectorGetModel = getAccountingCostCenter;
  actionRequestFail = actions.AccountingCostCentersActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.AccountingCostCentersActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.AccountingCostCentersActionTypes.SuccessPost;
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
      code: [null, Validators.required],
      company_id: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [],
      deleted_by_user_id: [],
      description: [null, Validators.required],
      id: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }
}
