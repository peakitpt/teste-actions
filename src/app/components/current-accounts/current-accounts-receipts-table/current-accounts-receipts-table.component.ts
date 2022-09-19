import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurrentAccountsService } from '@peakitpt/ui-kyrios-api';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable } from 'rxjs';

import {
  BaseModalListComponent,
  ListResponse,
} from 'src/app/shared/components/modals/base-modal-list-component';
import { environment } from 'src/environments/environment';
import { CurrentAccountReceipt } from '../current-account.model';
import * as actions from '../reducers/current-accounts.actions';
import { getCurrentAccountsReceipts } from '../reducers/current-accounts.selectors';

@Component({
  selector: 'kyr-current-accounts-receipts-table',
  templateUrl: './current-accounts-receipts-table.component.html',
  styleUrls: ['../../../shared/components/modals/modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CurrentAccountsReceiptsTableComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() id: number;
  @Input() edit: boolean = false;
  @Output() receiptDeleted = new EventEmitter();

  sort = 'receipt_date';
  order = 'desc';

  modulePath = 'current-accounts';
  modelList$: Observable<any>;

  selectorGetList = getCurrentAccountsReceipts;
  actionRequestGetAll = actions.RequestGetCurrentAccountsReceipts;

  currentAccountReceiptToDelete: CurrentAccountReceipt;
  @ViewChild('confirmDeleteModal') confirmDeleteModal: DialogComponent;
  @ViewChild('printPDFTemplate') printPDFTemplate: TemplateRef<any>;
  @ViewChild('viewDetailsTemplate') viewDetailsTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('receiptDateTemplate') receiptDateTemplate: TemplateRef<any>;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public fb: FormBuilder,
    public snackBarService: SnackBarService,
    private currentAccountsService: CurrentAccountsService
  ) {
    super(store, router, route, i18nextPipe, fb, snackBarService);
  }

  ngOnInit() {
    this.modelList$ = this.store.select(this.selectorGetList);
    this.buildForm();
    this.refreshTable();
  }

  refreshTable() {
    this.store.dispatch(
      new this.actionRequestGetAll({
        id: this.id,
        payload: {
          query: this.filters,
          page: this.page,
          limit: this.limit,
          sort: this.sort,
          order: this.order,
        },
      })
    );
  }

  ngAfterViewInit() {
    this.tableColumns = this.setTableColumns();
    this.subs.push(
      this.modelList$.subscribe((response: ListResponse) => {
        this.total = response.total;
        this.dataSource.data = response.results;
        this.isLoading = false;
      })
    );
  }

  setTableColumns(): any[] {
    const columns = [
      {
        id: 'print',
        title: '',
        template: this.printPDFTemplate,
        stopRowClickPropagation: true,
      },
      {
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'receipt_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.receipt_date`
        ),
        template: this.receiptDateTemplate,
      },
      {
        id: 'total_amount',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.total_amount`
        ),
      },
      {
        id: 'currency',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.currency`),
      },
      {
        id: 'viewDetails',
        title: '',
        template: this.viewDetailsTemplate,
      },
    ];

    if (this.edit) {
      columns.push({
        id: 'delete',
        title: '',
        template: this.deleteTemplate,
        stopRowClickPropagation: true,
      });
    }
    return columns;
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        serie_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.serie_number`
          ),
          value: null,
          mainField: true,
        }),
        receipt_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.receipt_date_start`
          ),
          value: null,
        }),
        receipt_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.receipt_date_end`
          ),
          value: null,
        }),
        total_amount: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.total_amount`
          ),
          value: null,
        }),
      }),
    });
  }

  openDocument(data: CurrentAccountReceipt) {
    const url = `${environment.railsAppUrl}/current_accounts/${this.id}/current_accounts_receipts/${data.id}/printpdf?format=pdf&file=Recibo_Conta_Corrente`;
    window.open(url);
  }

  openCurrentAccountReceipt(data: CurrentAccountReceipt) {
    this.router.navigate(['current-accounts-receipts/', data.id], {
      relativeTo: this.route,
    });
  }

  deleteDocument(data: CurrentAccountReceipt) {
    this.currentAccountReceiptToDelete = data;
    this.confirmDeleteModal.open();
  }

  confirmDelete() {
    this.currentAccountsService
      .deleteCurrentAccountReceipts(this.currentAccountReceiptToDelete.id)
      .subscribe((r: any) => {
        this.refreshTable();
        this.confirmDeleteModal.close();
        this.receiptDeleted.emit();
        this.currentAccountReceiptToDelete = null;
      });
  }
}
