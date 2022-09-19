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
import { AccountingTransactionTypesService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingTransactionTypesListEntirely,
  getSelectedAccountingTransactionTypes,
} from './../reducers/accounting-transaction-types.selectors';
import { getAccountingTransactionTypesList } from '../reducers/accounting-transaction-types.selectors';
import * as actions from '../reducers/accounting-transaction-types.actions';
import {
  AccountingTransactionTypeResponse,
  AccountingTransactionType,
} from '../accounting-transaction-type.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-accounting-transaction-types-list',
  templateUrl: './accounting-transaction-types-list.component.html',
})
export class AccountingTransactionTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-transaction-types';
  viewName = 'AccountingTransactionType';
  modelList$: Observable<AccountingTransactionTypeResponse>;
  selectedRows$: Observable<AccountingTransactionType[]>;

  selectorGetList = getAccountingTransactionTypesList;
  selectorGetSelected = getSelectedAccountingTransactionTypes;
  selectorGetListEntirely = getAccountingTransactionTypesListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('isDefaultTemplate') isDefaultTemplate: TemplateRef<any>;

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
    public moduleService?: AccountingTransactionTypesService
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
      moduleService
    );
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'locale',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.locale`),
      },
      {
        id: 'code',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.code`),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'is_default',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.is_default`
        ),
        template: this.isDefaultTemplate,
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
        id: 'code',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.code`),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'is_default',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.is_default`
        ),
        template: this.isDefaultTemplate,
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.AccountingTransactionTypesActionTypes.SuccessPost,
          actions.AccountingTransactionTypesActionTypes.SuccessPut,
          actions.AccountingTransactionTypesActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
