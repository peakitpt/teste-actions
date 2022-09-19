import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CurrentAccountsService } from '@peakitpt/ui-kyrios-api';

import {
  getCurrentAccountsListEntirely,
  getSelectedCurrentAccounts,
} from './../reducers/current-accounts.selectors';
import { getCurrentAccountsList } from '../reducers/current-accounts.selectors';
import * as actions from '../reducers/current-accounts.actions';
import {
  CurrentAccountResponse,
  CurrentAccount,
} from '../current-account.model';
import { ofType } from '@ngrx/effects';
import { SubscriptionSettingsV2Service } from '@peakitpt/ui-kyrios-api';
import { SnackBarService } from '@peakitpt/ui-material';
import { SubscriptionSetting } from '../../subscription-settings/subscription-setting.model';

@Component({
  selector: 'kyr-current-accounts-list',
  templateUrl: './current-accounts-list.component.html',
})
export class CurrentAccountsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'treasury';
  modulePath = 'current-accounts';
  viewName = 'CurrentAccount';
  modelList$: Observable<CurrentAccountResponse>;
  selectedRows$: Observable<CurrentAccount[]>;
  selectedRows = [];
  sideNavMainButton = false;

  isNotifying = false;
  notifySelectedVisible = false;

  selectorGetList = getCurrentAccountsList;
  selectorGetSelected = getSelectedCurrentAccounts;
  selectorGetListEntirely = getCurrentAccountsListEntirely;
  actionSetSelected = actions.SetSelectedCurrentAccounts;
  actionRequestGetAll = actions.RequestGetAllCurrentAccounts;
  actionRequestGetListEntirely = actions.RequestGetEntirelyCurrentAccounts;

  @ViewChild('balanceTemplate') balanceTemplate: TemplateRef<any>;

  constructor(
    public titleService: Title,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public actionSubject: ActionsSubject,
    public store: Store<any>,
    public menuHelperService: MenuHelperService,
    public http: HttpClient,
    public fb: FormBuilder,
    private currentAccountsService: CurrentAccountsService,
    private snackBarService: SnackBarService,
    private subscriptionSettingsV2Service: SubscriptionSettingsV2Service
  ) {
    super(
      titleService,
      router,
      route,
      i18nextPipe,
      sharedModule,
      actionSubject,
      store,
      menuHelperService,
      http,
      fb,
      currentAccountsService
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.setNotifySelectedVisible();
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
      },
      {
        id: 'balance',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.balance`),
        template: this.balanceTemplate,
      },
      {
        id: 'buttons',
        title: '',
        sortable: false,
        isColumnStickyEnd: true,
        template: this.sharedModule.isSmallScreen()
          ? this.buttonsTemplate
          : undefined,
        hoverTemplate: this.sharedModule.isSmallScreen()
          ? undefined
          : this.buttonsTemplate,
        stopRowClickPropagation: true,
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
      },
      {
        id: 'balance',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.balance`),
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.CurrentAccountsActionTypes.SuccessPostCurrentAccount,
          actions.CurrentAccountsActionTypes.SuccessPutCurrentAccount,
          actions.CurrentAccountsActionTypes.SuccessDeleteCurrentAccount
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  checkboxSelectionEvent(event) {
    this.selectedRows = event;
  }

  notifySelected() {
    this.isNotifying = true;
    let payload = 'format=json&message=notify_selected';
    this.selectedRows.forEach((row: CurrentAccount) => {
      payload += '&ids%5B%5D=' + String(row.id);
    });

    this.subs.push(
      this.currentAccountsService
        .notifySelected(payload)
        .subscribe((r: any) => {
          this.isNotifying = false;
          const response = JSON.parse(r.headers.get('X-Flash-Messages'));
          if (response.error) {
            response.error.forEach((error) => {
              this.snackBarService.openSnackBar(
                this.i18nextPipe.transform(error.message),
                this.sharedModule.WARN_COLOR,
                7000
              );
            });
          }
          if (response.success) {
            response.success.forEach((success) => {
              this.snackBarService.openSnackBar(
                this.i18nextPipe.transform(success.message),
                this.sharedModule.SUCCESS_COLOR,
                4000
              );
            });
          }
        })
    );
  }

  setNotifySelectedVisible() {
    this.subs.push(
      this.subscriptionSettingsV2Service
        .getOne()
        .subscribe((r: SubscriptionSetting) => {
          if (r.id && r.current_account_notification_layout_id) {
            this.notifySelectedVisible = true;
          }
        })
    );
  }
}
