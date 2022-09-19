import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/accounting-chart-accounts.actions';
import { getAccountingChartAccount } from '../reducers/accounting-chart-accounts.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { AccountingChartAccount } from '../accounting-chart-account.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';
import { getAccountingChartAccountsSelected } from 'src/app/shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.selectors';
import * as AccountingChartAccountsState from '../../../shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.reducer';
import { getAccountingTaxonomyCodesSelected } from 'src/app/shared/components/modals/accounting-taxonomy-codes-modal/reducers/accounting-taxonomy-codes-modal.selectors';
import * as AccountingTaxonomyCodesState from '../../../shared/components/modals/accounting-taxonomy-codes-modal/reducers/accounting-taxonomy-codes-modal.reducer';
import * as modalActions from '../../../shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.actions';

@Component({
  selector: 'kyr-accounting-chart-accounts-form',
  templateUrl: './accounting-chart-accounts-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingChartAccountsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AccountingChartAccount>;
  modulePath = 'accounting-chart-accounts';
  preFillWithNew = true;

  selectorGetModel = getAccountingChartAccount;
  actionRequestFail = actions.AccountingChartAccountsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.AccountingChartAccountsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.AccountingChartAccountsActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;
  actionRequestSetSelected = modalActions.RequestSetSelected;

  accountingChartAccountsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  accountingTaxonomyCodesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  profitLossOptions: any[];

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private accountingChartAccountsStore: Store<AccountingChartAccountsState.State>,
    private accountingTaxonomyCodesStore: Store<AccountingTaxonomyCodesState.State>
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

  ngOnInit() {
    super.ngOnInit();
    this.setAccountingChartAccountsModal();
    this.setProfitLossOptions();
    this.setAccountingTaxonomyCodesModal();
  }

  initializeForm() {
    this.form = this.fb.group({
      account_description: [null, Validators.required],
      account_id: [null, Validators.required],
      account_id_as_text: [null],
      accounting_exercise_id: [],
      active: [true],
      closing_credit_balance: [],
      closing_debit_balance: [],
      company_id: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [],
      deleted_by_user_id: [],
      grouping_category: [],
      grouping_code: [],
      grouping_code_description: [],
      has_childs: [],
      id: [],
      included_on_profit_loss: [false, Validators.required],
      opening_credit_balance: [],
      opening_debit_balance: [],
      profit: [false, Validators.required],
      taxonomy_code: [],
      taxonomy_code_description: [],
      updated_at: [],
      updated_by_user_id: [],
      year: [null, Validators.required],
    });
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.model = obj;
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_accounting-chart-accounts_modal': {
        this.form.get('grouping_code').setValue(null);
        this.form.get('grouping_code_description').setValue(null);
        break;
      }
      case 'view_selected_accounting-chart-accounts': {
        if (this.form.get('grouping_code').value) {
          this.openDetails(
            'accounting-chart-accounts',
            this.form.get('grouping_code').value
          );
        }
        break;
      }
      case 'clear_accounting-taxonomy-codes_modal': {
        this.form.get('taxonomy_code').setValue(null);
        this.form.get('taxonomy_code_description').setValue(null);
        break;
      }
      case 'view_selected_accounting-taxonomy-codes': {
        if (this.form.get('taxonomy_code').value) {
          this.openDetails(
            'accounting-taxonomy-codes',
            this.form.get('taxonomy_code').value
          );
        }
        break;
      }
      default: {
        super.menuClick(event, inputName);
      }
    }
  }

  onSubmit() {
    this.isSaving = true;

    if (this.form.valid) {
      this.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setAccountingChartAccountsModal() {
    this.accountingChartAccountsMenuOptions = this.defaultModalMenu(
      'accounting-chart-accounts'
    );

    // When a row is selected
    this.subs.push(
      this.accountingChartAccountsStore
        .select(getAccountingChartAccountsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}`).setValue(row.model.account_id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(
                `${row.model.account_id_as_text} — ${row.model.account_description}`
              );
          }
        })
    );
  }

  private setAccountingTaxonomyCodesModal() {
    this.accountingTaxonomyCodesMenuOptions = this.defaultModalMenu(
      'accounting-taxonomy-codes'
    );

    // When a row is selected
    this.subs.push(
      this.accountingTaxonomyCodesStore
        .select(getAccountingTaxonomyCodesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(`${row.model.id} — ${row.model.description}`);
          }
        })
    );
  }

  setProfitLossOptions() {
    this.profitLossOptions = [
      {
        value: false,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.loss`
        ),
      },
      {
        value: true,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.profit`
        ),
      },
    ];
  }
}
