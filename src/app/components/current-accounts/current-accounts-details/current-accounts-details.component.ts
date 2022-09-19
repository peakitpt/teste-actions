import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/current-accounts.actions';
import { getCurrentAccount } from '../reducers/current-accounts.selectors';
import { Observable } from 'rxjs';
import { CurrentAccount, CurrentAccountLine } from '../current-account.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import { CurrentAccountsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-current-accounts-details',
  templateUrl: './current-accounts-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CurrentAccountsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<CurrentAccount>;
  returnUrl = '/current-accounts';
  modulePath = 'current-accounts';
  viewName = 'CurrentAccount';

  selectorGetModel = getCurrentAccount;
  actionRequestFail =
    actions.CurrentAccountsActionTypes.RequestFailCurrentAccounts;
  actionRequestGetOne = actions.RequestGetCurrentAccount;

  currentAccountsTypes: any = {};
  detailsTabs: any[] = [];
  @ViewChild('pendingTabsTemplate') pendingTabsTemplate: TemplateRef<any>;
  @ViewChild('historyTabsTemplate') historyTabsTemplate: TemplateRef<any>;
  @ViewChild('receiptsTabsTemplate') receiptsTabsTemplate: TemplateRef<any>;
  paymentTypes: any;
  treasuryLocations: any;
  currentAccountsLinesSorted = [];
  virtualBalance: number = 0;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService,
    private currentAccountsService: CurrentAccountsService
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      matDialog,
      i18nextPipe,
      http,
      actionSubject,
      snackBarService
    );
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.detailsTabs.push(
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.pending'
        ),
        templateContent: this.pendingTabsTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.history'
        ),
        templateContent: this.historyTabsTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.receipts'
        ),
        templateContent: this.receiptsTabsTemplate,
      }
    );
    this.getPaymentTypes();
    this.getTreasuryLocations();
  }

  calculateTotalAmountToReceive(list: CurrentAccountLine[]): number {
    let result: number = 0;

    list.forEach((line: CurrentAccountLine) => {
      if (line.documents_status_id < 3) {
        result += +line.amount_to_receive;
      }
    });
    return result;
  }

  openDocument(documentId: number) {
    window.open(`documents/${documentId}/details`, '_blank');
  }

  getPaymentTypes() {
    this.paymentTypes = {};
    this.subs.push(
      this.currentAccountsService.getPaymentTypes().subscribe((r: any[]) => {
        r.forEach((paymentType) => {
          this.paymentTypes[paymentType.id] = this.i18nextPipe.transform(
            `${this.modulePath}:model.payment_type.${paymentType.name}`
          );
        });
      })
    );
  }

  getTreasuryLocations() {
    this.treasuryLocations = {};
    this.subs.push(
      this.currentAccountsService
        .getTreasuryLocations()
        .subscribe((r: any[]) => {
          r.forEach((location) => {
            this.paymentTypes[location.id] = location.name;
          });
        })
    );
  }

  afterGetModel() {
    super.afterGetModel();
    this.setCurrentAccountsLinesSorted();
    this.virtualBalance = this.getBalanceValue();
  }

  setCurrentAccountsLinesSorted() {
    this.currentAccountsLinesSorted = this.model.current_accounts_lines
      .slice()
      .sort((a, b) => {
        if (a['document_date'] < b['document_date']) {
          return 1;
        }
        if (a['document_date'] > b['document_date']) {
          return -1;
        }
        return 0;
      });
  }

  getBalanceValue() {
    let balance = 0;

    this.model.current_accounts_lines.forEach((line: CurrentAccountLine) => {
      if (line.documents_status_id < 3) {
        const tempVirtualAmmount =
          +line.pending_amount - +line.amount_to_receive;
        balance += +tempVirtualAmmount;
      }
    });

    return balance;
  }
}
