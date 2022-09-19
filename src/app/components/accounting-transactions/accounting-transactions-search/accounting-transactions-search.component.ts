import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { getAccountingTransactionDocumentTypesSelected } from 'src/app/shared/components/modals/accounting-transaction-document-types-modal/reducers/accounting-transaction-document-types-modal.selectors';
import * as AccountingTransactionDocumentTypesState from '../../../shared/components/modals/accounting-transaction-document-types-modal/reducers/accounting-transaction-document-types-modal.reducer';
import { getAccountingJournalsSelected } from 'src/app/shared/components/modals/accounting-journals-modal/reducers/accounting-journals-modal.selectors';
import * as AccountingJournalsState from '../../../shared/components/modals/accounting-journals-modal/reducers/accounting-journals-modal.reducer';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-accounting-transactions-search',
  templateUrl: './accounting-transactions-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-transactions';

  actionRequestPostSearch = RequestPostSearch;

  periodDatasource = [];

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    private accountingTransactionDocumentTypesStore: Store<AccountingTransactionDocumentTypesState.State>,
    private accountingJournalsStore: Store<AccountingJournalsState.State>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.accountingTransactionDocumentTypesStore
        .select(getAccountingTransactionDocumentTypesSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form
              .get('searchFields')
              .get('accounting_transaction_document_type_description')
              .patchValue({
                value: v.model.description,
              });
          }
        })
    );

    this.subs.push(
      this.accountingJournalsStore
        .select(getAccountingJournalsSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form
              .get('searchFields')
              .get('accounting_journal_description')
              .patchValue({
                value: v.model.code,
              });
          }
        })
    );
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        period: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.period`
          ),
          value: null,
          mainField: true,
        }),
        accounting_transaction_document_type_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.accounting_transaction_document_type_description`
          ),
          value: null,
        }),
        transaction_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.transaction_date_start`
          ),
          value: null,
        }),
        transaction_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.transaction_date_end`
          ),
          value: null,
        }),
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
        accounting_journal_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.accounting_journal_description`
          ),
          value: null,
        }),
        doc_archival_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.doc_archival_number`
          ),
          value: null,
        }),
      }),
    });

    this.periodDatasource = [
      {
        label: this.i18nextPipe.transform('translation:all'),
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.opened`
        ),
        value: 0,
      },
      {
        label: '1',
        value: 1,
      },
      {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
      {
        label: '4',
        value: 4,
      },
      {
        label: '5',
        value: 5,
      },
      {
        label: '6',
        value: 6,
      },
      {
        label: '7',
        value: 7,
      },
      {
        label: '8',
        value: 8,
      },
      {
        label: '9',
        value: 9,
      },
      {
        label: '10',
        value: 10,
      },
      {
        label: '11',
        value: 11,
      },
      {
        label: '12',
        value: 12,
      },
      {
        label: '13',
        value: 13,
      },
      {
        label: '14',
        value: 14,
      },
      {
        label: '15',
        value: 15,
      },
      {
        label: '16',
        value: 16,
      },
    ];
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
          this.periodDatasource.find((o) => o.value === value).label
        }) `;
      case 'transaction_date_start':
      case 'transaction_date_end':
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
            this.periodDatasource.find((i) => i.label === newValue)
              ? this.periodDatasource.find((i) => i.label === newValue).value
              : null
          );
        break;
      case 'transaction_date_start':
      case 'transaction_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }

  openSelectionModal(
    modalName: string,
    inputName?: string,
    modalParams: any = {},
    modalTitle = ''
  ) {
    this.router.navigate([modalName], {
      queryParams: {
        modalTitle,
        inputName,
        modalParams: btoa(JSON.stringify(modalParams)),
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
