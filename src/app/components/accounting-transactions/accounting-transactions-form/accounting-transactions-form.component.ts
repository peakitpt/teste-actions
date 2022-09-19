import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/accounting-transactions.actions';
import { getAccountingTransaction } from '../reducers/accounting-transactions.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import {
  AccountingTransaction,
  AccountingTransactionAttachment,
  AccountingTransactionLine,
} from '../accounting-transaction.model';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';

import { getAccountingTransactionDocumentTypesSelected } from 'src/app/shared/components/modals/accounting-transaction-document-types-modal/reducers/accounting-transaction-document-types-modal.selectors';
import * as AccountingTransactionDocumentTypesState from '../../../shared/components/modals/accounting-transaction-document-types-modal/reducers/accounting-transaction-document-types-modal.reducer';
import { getAccountingJournalsSelected } from 'src/app/shared/components/modals/accounting-journals-modal/reducers/accounting-journals-modal.selectors';
import * as AccountingJournalsState from '../../../shared/components/modals/accounting-journals-modal/reducers/accounting-journals-modal.reducer';
import { getAccountingChartAccountsSelected } from 'src/app/shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.selectors';
import * as AccountingChartAccountsState from '../../../shared/components/modals/accounting-chart-accounts-modal/reducers/accounting-chart-accounts-modal.reducer';
import { getAccountingCostCentersSelected } from 'src/app/shared/components/modals/accounting-cost-centers-modal/reducers/accounting-cost-centers-modal.selectors';
import * as AccountingCostCentersState from '../../../shared/components/modals/accounting-cost-centers-modal/reducers/accounting-cost-centers-modal.reducer';

import {
  AccountingTransactionsService,
  FileManagerService,
} from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-accounting-transactions-form',
  templateUrl: './accounting-transactions-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AccountingTransaction>;
  modulePath = 'accounting-transactions';
  preFillWithNew = true;

  selectorGetModel = getAccountingTransaction;
  actionRequestFail = actions.AccountingTransactionsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.AccountingTransactionsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.AccountingTransactionsActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;
  actionRequestSetSelected = actions.SetSelected;

  accountingTransactionsColumns: any[] = [];
  accountingTransactionsDS: TableDataSource<any> = new TableDataSource([]);
  accountingTransactionsFormArray: FormArray = new FormArray([]);
  newAccountingTransactionLine = {
    accounting_chart_account_description: null,
    accounting_chart_account_id: null,
    accounting_cost_center_description: null,
    accounting_cost_center_id: null,
    accounting_transaction_id: null,
    company_id: null,
    created_at: null,
    credit_amount: 0,
    debit_amount: 0,
    description: null,
    id: null,
    period: null,
    trans_date: null,
    transaction_id: null,
    updated_at: null,
    _destroy: false,
  };
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('accountingChartAccountDescriptionTemplate')
  accountingChartAccountDescriptionTemplate: TemplateRef<any>;
  @ViewChild('creditAmountTemplate') creditAmountTemplate: TemplateRef<any>;
  @ViewChild('debitAmountTemplate') debitAmountTemplate: TemplateRef<any>;
  @ViewChild('descriptionTemplate') descriptionTemplate: TemplateRef<any>;
  @ViewChild('accountingCostCenterDescriptionTemplate')
  accountingCostCenterDescriptionTemplate: TemplateRef<any>;

  // Select Options
  periodOptions: any[] = [];
  transactionTypeOptions: any[] = [];

  // Quick Insert Menus
  accountingTransactionDocumentTypesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  accountingJournalsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  accountingChartAccountsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  accountingCostCentersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  // Tabs
  @ViewChild('mainTab') mainTab: TemplateRef<any>;
  @ViewChild('attachmentsTab') attachmentsTab: TemplateRef<any>;
  @ViewChild('deleteAttachmentTemplate')
  deleteAttachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentTemplate') attachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentDescriptionTemplate')
  attachmentDescriptionTemplate: TemplateRef<any>;

  // Attachments Variables
  form: FormGroup;

  attachmentFormControlPlaceholder = new FormControl();
  attachmentsColumns: any[] = [];
  attachmentsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  attachmentsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    public fileManagerService: FileManagerService,
    private accountingTransactionsService: AccountingTransactionsService,
    private accountingTransactionDocumentTypesStore: Store<AccountingTransactionDocumentTypesState.State>,
    private accountingJournalsStore: Store<AccountingJournalsState.State>,
    private accountingChartAccountsStore: Store<AccountingChartAccountsState.State>,
    private accountingCostCentersStore: Store<AccountingCostCentersState.State>
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
    this.setPeriodOptions();
    this.setAccountingTransactionDocumentTypesModal();
    this.setAccountingJournalModal();
    this.setAccountingChartAccountsModal();
    this.setAccountingCostCentersModal();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.setFormTabs();
    this.getTransactionsTypesOptions();
  }

  initializeForm() {
    this.form = this.fb.group({
      accounting_exercise_id: [],
      accounting_journal_description: [null, Validators.required],
      accounting_journal_id: [null, Validators.required],
      accounting_transaction_document_type_description: [
        null,
        Validators.required,
      ],
      accounting_transaction_document_type_id: [null, Validators.required],
      accounting_transaction_lines: this.fb.array([]),
      accounting_transactions_attachments: this.fb.array([]),
      company_id: [],
      created_at: [],
      created_by_user_id: [],
      customer_description: [],
      customer_id: [],
      deleted: [],
      deleted_by_user_id: [],
      description: [null, Validators.required],
      doc_archival_number: [null, Validators.required],
      id: [],
      number_lines: [],
      origin_application_description: [],
      origin_document_link: [],
      origin_document_serie_number: [],
      period: [0, Validators.required],
      supplier_description: [],
      supplier_id: [],
      total_amount: [0, [Validators.required]],
      transaction_credit_amount: [0],
      transaction_date: [],
      transaction_debit_amount: [0],
      transaction_id: [],
      transaction_serie_number: [null, Validators.required],
      transaction_type: ['N', Validators.required],
      updated_at: [],
      updated_by_user_id: [],
      year: [],
    });

    this.accountingTransactionsFormArray = this.form.controls
      .accounting_transaction_lines as FormArray;
    this.attachmentsFormArray = this.form.controls
      .accounting_transactions_attachments as FormArray;

    this.buildSubTablesColumns();
    this.subscribeForTableChange();
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.model = obj;
    this.setAccountingTransactions(obj.accounting_transaction_lines);
    this.setInnerTable(
      obj.accounting_transactions_attachments,
      this.attachmentsFormArray,
      this.attachmentsDS
    );
  }

  onAfterViewInit() {
    super.onAfterViewInit();
    this.buildAccountingTransactionsTableColumns();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_accounting-transaction-document-types_modal': {
        this.form.get(`${inputName}_id`).setValue(null);
        this.form.get(`${inputName}_description`).setValue(null);
        break;
      }
      case 'view_selected_accounting-transaction-document-types': {
        if (this.form.get(`${inputName}_id`).value) {
          this.openDetails(
            'accounting-transaction-document-types',
            this.form.get(`${inputName}_id`).value
          );
        }
        break;
      }
      case 'quick_insertion_accounting-transaction-document-types': {
        this.openQuickInsertionModal(
          'quick-insert-accounting-transaction-document-types-modal',
          inputName
        );
        break;
      }

      case 'clear_accounting-journals_modal': {
        this.form.get(`${inputName}_id`).setValue(null);
        this.form.get(`${inputName}_description`).setValue(null);
        break;
      }
      case 'view_selected_accounting-journals': {
        if (this.form.get(`${inputName}_id`).value) {
          this.openDetails(
            'accounting-journals',
            this.form.get(`${inputName}_id`).value
          );
        }
        break;
      }
      case 'quick_insertion_accounting-journals': {
        this.openQuickInsertionModal(
          'quick-insert-accounting-journals-modal',
          inputName
        );
        break;
      }

      case 'clear_accounting-chart-accounts_modal': {
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          this.accountingTransactionsFormArray.controls[index]
            .get(`accounting_chart_account_id`)
            .setValue(null);
          this.accountingTransactionsFormArray.controls[index]
            .get(`accounting_chart_account_description`)
            .setValue(null);
        }
        break;
      }
      case 'view_selected_accounting-chart-accounts': {
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.accountingTransactionsFormArray.value[index]
              .accounting_chart_account_id
          ) {
            this.openDetails(
              'accounting-chart-accounts',
              this.accountingTransactionsFormArray.value[index]
                .accounting_chart_account_id
            );
          }
        }
        break;
      }
      case 'quick_insertion_accounting-chart-accounts': {
        this.openQuickInsertionModal(
          'quick-insert-accounting-chart-accounts-modal',
          inputName
        );
        break;
      }

      case 'clear_accounting-cost-centers_modal': {
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          this.accountingTransactionsFormArray.controls[index]
            .get('accounting_cost_center_id')
            .setValue(null);
          this.accountingTransactionsFormArray.controls[index]
            .get('accounting_cost_center_id')
            .setValue(null);
        }
        break;
      }
      case 'view_selected_accounting-cost-centers': {
        if (inputName && inputName.includes('#')) {
          const index = this.getInputNameIndex(inputName);
          if (
            this.accountingTransactionsFormArray.value[index]
              .accounting_cost_center_id
          ) {
            this.openDetails(
              'accounting-cost-centers',
              this.accountingTransactionsFormArray.value[index]
                .accounting_cost_center_id
            );
          }
        }
        break;
      }
      case 'quick_insertion_accounting-cost-centers': {
        this.openQuickInsertionModal(
          'quick-insert-accounting-cost-centers-modal',
          inputName
        );
        break;
      }

      default: {
        super.menuClick(event, inputName);
      }
    }
  }

  onSubmit() {
    this.isSaving = true;
    this.convertCommasToDots();
    this.validateAccountingTransactionsFormArray();
    this.validateTotalFormArray();

    if (this.form.valid && this.accountingTransactionsFormArray.valid) {
      this.uploadAttachments(this.attachmentsFormArray, this.attachmentsDS);
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  onFormValid(payload = this.form.getRawValue()) {
    if (this.validateAttachments()) {
      super.onFormValid(payload);
    } else {
      this.snackBarService.openSnackBar(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_invalid_attachments`
        ),
        this.sharedModule.ERROR_COLOR
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setAccountingTransactions(
    accountingTransaction: AccountingTransaction[] = []
  ) {
    this.accountingTransactionsFormArray.clear();
    this.accountingTransactionsDS.data =
      this.accountingTransactionsFormArray.value;
    if (accountingTransaction?.length) {
      accountingTransaction.forEach(
        (accountingTransaction: AccountingTransaction) => {
          if (this.duplicateMode) {
            accountingTransaction.id = null;
          }
          this.addTableLine(
            accountingTransaction,
            this.accountingTransactionsFormArray,
            this.accountingTransactionsDS
          );
        }
      );
    }
  }

  private getTransactionsTypesOptions() {
    this.accountingTransactionsService
      .getTransactionTypes()
      .subscribe((r: any[]) => {
        this.transactionTypeOptions = [];
        r.forEach((element) => {
          this.transactionTypeOptions.push({
            label: element.name,
            value: element.value,
          });
        });
      });
  }

  private setPeriodOptions() {
    this.periodOptions = [
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

  private setAccountingTransactionDocumentTypesModal() {
    this.accountingTransactionDocumentTypesMenuOptions = this.defaultModalMenu(
      'accounting-transaction-document-types'
    );

    // When a row is selected
    this.subs.push(
      this.accountingTransactionDocumentTypesStore
        .select(getAccountingTransactionDocumentTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.description);
          }
        })
    );
  }

  private setAccountingJournalModal() {
    this.accountingJournalsMenuOptions = this.defaultModalMenu(
      'accounting-journals'
    );

    // When a row is selected
    this.subs.push(
      this.accountingJournalsStore
        .select(getAccountingJournalsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.code);
          }
        })
    );
  }

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
            if (row.inputName.includes('#')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.accountingTransactionsFormArray,
                this.accountingTransactionsDS,
                [
                  {
                    control: 'accounting_chart_account_id',
                    value: row.model.id,
                  },
                  {
                    control: 'accounting_chart_account_description',
                    value: `${row.model.account_id_as_text} - ${row.model.account_description}`,
                  },
                ]
              );
            }
          }
        })
    );
  }

  private setAccountingCostCentersModal() {
    this.accountingCostCentersMenuOptions = this.defaultModalMenu(
      'accounting-cost-centers'
    );

    // When a row is selected
    this.subs.push(
      this.accountingCostCentersStore
        .select(getAccountingCostCentersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (row.inputName.includes('#')) {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.accountingTransactionsFormArray,
                this.accountingTransactionsDS,
                [
                  {
                    control: 'accounting_cost_center_id',
                    value: row.model.id,
                  },
                  {
                    control: 'accounting_cost_center_description',
                    value: `${row.model.code} - ${row.model.description}`,
                  },
                ]
              );
            }
          }
        })
    );
  }

  private buildAccountingTransactionsTableColumns() {
    setTimeout(() => {
      this.accountingTransactionsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteTemplate,
        },
        {
          id: 'accounting_chart_account',
          title:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.accounting_chart_account`
            ) + ' *',
          sortable: false,
          template: this.accountingChartAccountDescriptionTemplate,
        },
        {
          id: 'credit_amount',
          title: this.i18nextPipe.transform(`${this.modulePath}:model.credit`),
          sortable: false,
          template: this.creditAmountTemplate,
        },
        {
          id: 'debit_amount',
          title: this.i18nextPipe.transform(`${this.modulePath}:model.debit`),
          sortable: false,
          template: this.debitAmountTemplate,
        },
        {
          id: 'description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          sortable: false,
          template: this.descriptionTemplate,
        },
        {
          id: 'accounting_cost_center',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.accounting_cost_center`
          ),
          sortable: false,
          template: this.accountingCostCenterDescriptionTemplate,
        },
      ];
    });
  }

  subscribeForTableChange() {
    this.subs.push(
      this.accountingTransactionsFormArray.valueChanges.subscribe(
        (value: any) => {
          this.form
            .get('transaction_credit_amount')
            .setValue(this.calculateCredit(value), {
              emitEvent: false,
            });
          this.form
            .get('transaction_debit_amount')
            .setValue(this.calculateDebit(value), {
              emitEvent: false,
            });
          this.form
            .get('total_amount')
            .setValue(
              this.calculateTotal(
                parseFloat(this.form.value.transaction_credit_amount),
                parseFloat(this.form.value.transaction_debit_amount)
              ),
              {
                emitEvent: false,
              }
            );

          this.validateAccountingTransactionsFormArray();
        }
      )
    );
  }

  calculateCredit(list: AccountingTransactionLine[]): number {
    let result: number = 0;

    list.forEach((line: AccountingTransactionLine) => {
      result += this.sharedModule.convertToNumber(line.credit_amount);
    });
    return this.sharedModule.convertToNumber(result);
  }

  calculateDebit(list: AccountingTransactionLine[]): number {
    let result: number = 0;

    list.forEach((line: AccountingTransactionLine) => {
      result += this.sharedModule.convertToNumber(line.debit_amount);
    });
    return this.sharedModule.convertToNumber(result);
  }

  calculateTotal(credit: number, debit: number): number {
    let result: number = 0.0;
    result = credit - debit;
    return this.sharedModule.convertToNumber(result);
  }

  validateAccountingTransactionsFormArray() {
    let valid = true;
    for (let i of this.form.value.accounting_transaction_lines) {
      if (+i.credit_amount !== 0 && +i.debit_amount !== 0) {
        valid = false;
        break;
      }
    }

    if (valid) {
      this.form.get('accounting_transaction_lines').setErrors(null);
      this.accountingTransactionsFormArray.setErrors(null);
    } else {
      this.form.controls['accounting_transaction_lines'].setErrors({
        incorrect: true,
      });
    }
  }

  validateTotalFormArray() {
    if (+this.form.value.total_amount === 0) {
      this.form.controls['total_amount'].setErrors(null);
    } else {
      this.form.controls['total_amount'].setErrors({
        incorrect: true,
      });
    }
  }

  convertCommasToDots() {
    this.accountingTransactionsFormArray.value.forEach(
      (line: AccountingTransactionLine, index: number) => {
        this.accountingTransactionsFormArray
          .get([index, 'credit_amount'])
          .setValue(String(line.credit_amount).replace(',', '.'));
        this.accountingTransactionsFormArray
          .get([index, 'debit_amount'])
          .setValue(String(line.debit_amount).replace(',', '.'));
      }
    );
  }

  // Attachments

  setFormTabs() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.general'
        ),
        templateContent: this.mainTab,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.attachments'
        ),
        templateContent: this.attachmentsTab,
      },
    ];
  }

  private buildSubTablesColumns() {
    setTimeout(() => {
      this.attachmentsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteAttachmentTemplate,
          width: '30px',
        },
        {
          id: 'attachment',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.attachment`
          ),
          sortable: false,
          template: this.attachmentTemplate,
        },
        {
          id: 'description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          sortable: false,
          template: this.attachmentDescriptionTemplate,
        },
      ];
    });
  }

  private validateAttachments(): boolean {
    let attachmentsValid = true;

    this.form.setControl(
      'accounting_transactions_attachments',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.accounting_transactions_attachments
      .filter(
        (obj: AccountingTransactionAttachment) =>
          !obj.hasOwnProperty('_destroy')
      )
      .forEach((obj: AccountingTransactionAttachment) => {
        if (!obj.attachment || !obj.attachment_name) {
          attachmentsValid = false;
        }
      });

    return attachmentsValid;
  }

  addAttachment(event: any) {
    if (event.target.files && event.target.files[0]) {
      const newAttachment: AccountingTransactionAttachment = {
        attachment: null,
        attachment_name: event.target.files[0].name,
        accounting_transaction_id: null,
        created_at: null,
        description: null,
        id: null,
        updated_at: null,
        file_to_upload: event.target.files[0],
      };

      this.addTableLine(
        newAttachment,
        this.attachmentsFormArray,
        this.attachmentsDS
      );
    }
  }
}
