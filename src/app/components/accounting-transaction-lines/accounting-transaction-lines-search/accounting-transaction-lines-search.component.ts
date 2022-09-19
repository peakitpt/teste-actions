import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import * as AccountingChartAccountsState from '../../../shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.reducer';
import * as AccountingChartAccountsSelectors from '../../../shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kyr-accounting-transaction-lines-search',
  templateUrl: './accounting-transaction-lines-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionLinesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-transaction-lines';

  actionRequestPostSearch = RequestPostSearch;

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public accountingChartAccountsStore: Store<AccountingChartAccountsState.State>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  periodOptions = [];

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.accountingChartAccountsStore
        .select(
          AccountingChartAccountsSelectors.getAccountingChartAccountsSelected
        )
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form
              .get('searchFields')
              .get('accounting_chart_account_id')
              .patchValue({ value: v.model.id });
            this.form
              .get('searchFields')
              .get('accounting_chart_account_description')
              .patchValue({
                value: `${v.model.account_id_as_text} - ${v.model.account_description}`,
              });
          }
        })
    );
  }

  afterSideNavLoaded() {
    this.onSearchClick();
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        accounting_chart_account_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.accounting_chart_account_id`
          ),
          mainField: true,
          value: null,
        }),
        accounting_chart_account_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.accounting_chart_account_description`
          ),
          value: null,
        }),
        period: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.period`
          ),
          value: null,
        }),
        trans_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.trans_date_start`
          ),
          value: '',
        }),
        trans_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.trans_date_end`
          ),
          value: '',
        }),
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
      }),
    });

    this.periodOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.abertura`
        ),
        value: '0',
      },
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
      {
        label: '3',
        value: '3',
      },
      {
        label: '4',
        value: '4',
      },
      {
        label: '5',
        value: '5',
      },
      {
        label: '6',
        value: '6',
      },
      {
        label: '7',
        value: '7',
      },
      {
        label: '8',
        value: '8',
      },
      {
        label: '9',
        value: '9',
      },
      {
        label: '10',
        value: '10',
      },
      {
        label: '11',
        value: '11',
      },
      {
        label: '12',
        value: '12',
      },
      {
        label: '13',
        value: '13',
      },
      {
        label: '14',
        value: '14',
      },
      {
        label: '15',
        value: '15',
      },
      {
        label: '16',
        value: '16',
      },
    ];

    this.subs.push(
      this.route.queryParamMap.subscribe((queryParams: any) => {
        this.fillFormWithParams(queryParams.params);
      })
    );
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'period':
        return `${searchWordLabel}:(${
          this.periodOptions.find((o) => o.value === value).label
        }) `;
      case 'trans_date_start':
      case 'trans_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'period':
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(
            this.periodOptions.find((i) => i.label === newValue)
              ? this.periodOptions.find((i) => i.label === newValue).value
              : null
          );
        break;
      case 'trans_date_start':
      case 'trans_date_end':
        if (newValue === null || newValue === undefined) {
          super.updateField(field, null);
        } else {
          super.updateField(field, this.sharedModule.dateToUtc(newValue));
        }
        break;
      default:
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(newValue);
    }
  }

  openSelectionModal(
    modalName: string,
    inputName?: string,
    modalParams: any = {},
    modalTitle = '',
    queryStringParams: any = {}
  ) {
    this.router.navigate([modalName], {
      queryParams: {
        modalTitle,
        inputName,
        modalParams: btoa(JSON.stringify(modalParams)),
        queryStringParams: btoa(JSON.stringify(queryStringParams)),
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }

  fillFormWithParams(params: any) {
    Object.keys(params).forEach((key) => {
      this.updateField(key, params[key]);
    });
    this.onSearchClick();
  }
}
