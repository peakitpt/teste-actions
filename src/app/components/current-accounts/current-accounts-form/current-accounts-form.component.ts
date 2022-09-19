import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/current-accounts.actions';
import { getCurrentAccount } from '../reducers/current-accounts.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { CurrentAccount, CurrentAccountLine } from '../current-account.model';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { CurrentAccountsService } from '@peakitpt/ui-kyrios-api';
import { maxValueOrZeroValidator } from './custom-validators.directive';

@Component({
  selector: 'kyr-current-accounts-form',
  templateUrl: './current-accounts-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CurrentAccountsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CurrentAccount>;
  modulePath = 'current-accounts';
  preFillWithNew = true;

  selectorGetModel = getCurrentAccount;
  actionRequestFail =
    actions.CurrentAccountsActionTypes.RequestFailCurrentAccounts;
  actionRequestGetAll = actions.RequestGetAllCurrentAccounts;
  actionRequestGetOne = actions.RequestGetCurrentAccount;
  actionRequestPut = actions.RequestPutCurrentAccount;
  actionSuccessPut =
    actions.CurrentAccountsActionTypes.SuccessPutCurrentAccount;
  actionRequestPost = actions.RequestPostCurrentAccount;
  actionSuccessPost =
    actions.CurrentAccountsActionTypes.SuccessPostCurrentAccount;
  actionRequestGetNew = actions.RequestGetNew;

  // PENDING TABLE -----
  currentAccountLineColumns: any[] = [];
  currentAccountLineDS: TableDataSource<any> = new TableDataSource([]);
  currentAccountLineFormArray: FormArray = new FormArray([]);
  newCurrentAccountLine = {
    amount_to_receive: null,
    currency: null,
    current_account_id: null,
    deleted: null,
    document_date: null,
    document_expiration_date: null,
    document_id: null,
    documents_status_description: null,
    documents_status_id: null,
    documents_type_description: null,
    documents_type_id: null,
    entity_ekklesia_location_id: null,
    entity_id: null,
    id: null,
    pending_amount: null,
    serie_number: null,
    total_amount: null,
    virtual_pending_amount: null,
    _destroy: false,
  };
  @ViewChild('amountToReceiveTemplate')
  amountToReceiveTemplate: TemplateRef<any>;
  @ViewChild('virtualPendingAmountTemplate')
  virtualPendingAmountTemplate: TemplateRef<any>;
  @ViewChild('seeDocumentTemplate') seeDocumentTemplate: TemplateRef<any>;
  // PENDING TABLE -----

  @ViewChild('pendingTabsTemplate') pendingTabsTemplate: TemplateRef<any>;
  @ViewChild('receiptsTabsTemplate') receiptsTabsTemplate: TemplateRef<any>;
  formTabs: any[] = [];

  paymentTypes: any[] = [];
  treasuryLocations: any[] = [];

  currentAccountsTypes = [];
  parishionersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  currentAccountTypesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  documentsTypesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  emolumentsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private currentAccountsService: CurrentAccountsService
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
      balance: [],
      created_at: [],
      created_by_user_id: [],
      current_accounts_lines: this.fb.array([]),
      current_accounts_receipts: this.fb.array([]),
      deleted: [],
      deleted_by_user_id: [],
      entity_description: [],
      entity_ekklesia_location_id: [],
      entity_id: [],
      id: [],
      observations: [],
      payment_type_id: [null, Validators.required],
      receipt_date: [],
      total_amount_to_receive: [],
      treasury_location: [],
      updated_at: [],
      updated_by_user_id: [],
    });

    this.currentAccountLineFormArray = this.form.controls
      .current_accounts_lines as FormArray;
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.model = obj;
    this.setCurrentAccountLines(obj.current_accounts_lines);
  }

  onAfterViewInit() {
    this.setFormTabs();
    super.onAfterViewInit();
    this.buildCurrentAccountLinesTableColumns();
    this.getPaymentTypes();
    this.getTreasuryLocations();
    this.subscribeToAmmountToReceive();
  }

  setFormTabs() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.pending'
        ),
        templateContent: this.pendingTabsTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.receipts'
        ),
        templateContent: this.receiptsTabsTemplate,
      },
    ];
  }

  onSubmit() {
    this.isSaving = true;
    const payload = this.appendCurrentAccountsLinesToForm();

    if (this.form.valid && this.currentAccountLineFormArray.valid) {
      this.onFormValid(payload);
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]

  getPaymentTypes() {
    this.paymentTypes = [];
    this.subs.push(
      this.currentAccountsService.getPaymentTypes().subscribe((r: any[]) => {
        r.forEach((paymentType) => {
          this.paymentTypes.push({
            label: this.i18nextPipe.transform(
              `${this.modulePath}:model.payment_type.${paymentType.name}`
            ),
            value: paymentType.id,
          });
        });
      })
    );
  }

  getTreasuryLocations() {
    this.treasuryLocations = [
      {
        label: '',
        value: null,
      },
    ];
    this.subs.push(
      this.currentAccountsService
        .getTreasuryLocations()
        .subscribe((r: any[]) => {
          r.forEach((location) => {
            this.treasuryLocations.push({
              label: location.name,
              value: location.name,
            });
          });
        })
    );
  }

  private setCurrentAccountLines(accountLine: CurrentAccountLine[] = []) {
    this.currentAccountLineFormArray.clear();
    this.currentAccountLineDS.data = this.currentAccountLineFormArray.value;
    if (accountLine?.length) {
      accountLine.forEach((ca: CurrentAccountLine) => {
        if (ca.documents_status_id < 3) {
          this.addPendingReceiptTableLine(
            ca,
            this.currentAccountLineFormArray,
            this.currentAccountLineDS
          );
        }
      });
    }
  }

  addPendingReceiptTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(
      this.fb.group({
        amount_to_receive: [
          0,
          [maxValueOrZeroValidator(+newObj.pending_amount)],
        ],
        currency: [newObj.currency],
        current_account_id: [newObj.current_account_id],
        deleted: [newObj.deleted],
        document_date: [newObj.document_date],
        document_expiration_date: [newObj.document_expiration_date],
        document_id: [newObj.document_id],
        documents_status_description: [newObj.documents_status_description],
        documents_status_id: [newObj.documents_status_id],
        documents_type_description: [newObj.documents_type_description],
        documents_type_id: [newObj.documents_type_id],
        entity_ekklesia_location_id: [newObj.entity_ekklesia_location_id],
        entity_id: [newObj.entity_id],
        id: [newObj.id],
        pending_amount: [+newObj.pending_amount],
        serie_number: [newObj.serie_number],
        total_amount: [newObj.total_amount],
        virtual_pending_amount: [+newObj.virtual_pending_amount],
      })
    );
    tableDS.data = formArray.value;
  }

  private buildCurrentAccountLinesTableColumns() {
    setTimeout(() => {
      this.currentAccountLineColumns = [
        {
          id: 'documents_status_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.documents_status_description`
          ),
          sortable: false,
        },
        {
          id: 'document_date',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.document_date`
          ),
          sortable: false,
        },
        {
          id: 'documents_type_description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.documents_type_description`
          ),
          sortable: false,
        },
        {
          id: 'serie_number',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.serie_number`
          ),
          sortable: false,
        },
        {
          id: 'currency',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.currency`
          ),
          sortable: false,
        },
        {
          id: 'total_amount',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.total_amount`
          ),
          sortable: false,
        },
        {
          id: 'virtual_pending_amount',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.virtual_pending_amount`
          ),
          template: this.virtualPendingAmountTemplate,
          sortable: false,
        },
        {
          id: 'amount_to_receive',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.amount_to_receive`
          ),
          sortable: false,
          template: this.amountToReceiveTemplate,
        },
        {
          id: 'see_document',
          title: '',
          sortable: false,
          template: this.seeDocumentTemplate,
        },
      ];
    });
  }

  openDocument(documentId: number) {
    window.open(`documents/${documentId}/details`, '_blank');
  }

  checkboxSelectionEvent(selectedRows: CurrentAccountLine[]) {
    selectedRows.forEach((line: CurrentAccountLine) => {
      for (let i = 0; i < this.currentAccountLineFormArray.value.length; i++) {
        if (line.id === this.currentAccountLineFormArray.value[i].id) {
          this.currentAccountLineFormArray
            .get([i, 'amount_to_receive'])
            .setValue(line.pending_amount);
          break;
        }
      }
    });
  }

  appendCurrentAccountsLinesToForm() {
    const result = this.form.value;

    const currentAccountLines = this.currentAccountLineFormArray.value;
    result.current_accounts_lines = currentAccountLines;
    result.total_amount_to_receive = this.calculateTotalAmountToReceive(
      this.currentAccountLineFormArray.value
    );
  }

  subscribeToAmmountToReceive() {
    this.subs.push(
      this.currentAccountLineFormArray.valueChanges.subscribe(
        (val: CurrentAccountLine[]) => {
          let balance = 0;
          val.forEach((line: CurrentAccountLine, index) => {
            this.currentAccountLineFormArray
              .get([index, 'virtual_pending_amount'])
              .setValue(+line.pending_amount - +line.amount_to_receive, {
                emitEvent: false,
              });

            const tempVirtualAmmount =
              +line.pending_amount - +line.amount_to_receive;
            balance += +tempVirtualAmmount;
            this.form.get('balance').setValue(balance);
          });
        }
      )
    );
  }

  calculateTotalAmountToReceive(data: CurrentAccountLine[]) {
    let total = 0;
    data.forEach((line: CurrentAccountLine) => {
      if (line.documents_status_id < 3) {
        total = total + +line.amount_to_receive;
      }
    });
    return total;
  }

  receiptDeleted() {
    this.store.dispatch(new this.actionRequestGetOne(this.id));
  }
}
