import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
import { AccountingCostCentersService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingCostCentersList,
  getAccountingCostCentersListEntirely,
} from '../reducers/accounting-cost-centers.selectors';
import { getSelectedAccountingCostCenters } from './../reducers/accounting-cost-centers.selectors';
import * as actions from '../reducers/accounting-cost-centers.actions';
import {
  AccountingCostCenterResponse,
  AccountingCostCenter,
} from '../accounting-cost-center.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-accounting-cost-centers-list',
  templateUrl: './accounting-cost-centers-list.component.html',
})
export class AccountingCostCentersListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-cost-centers';
  modelList$: Observable<AccountingCostCenterResponse>;
  selectedRows$: Observable<AccountingCostCenter[]>;
  viewName = 'AccountingCostCenter';

  selectorGetList = getAccountingCostCentersList;
  selectorGetSelected = getSelectedAccountingCostCenters;
  selectorGetListEntirely = getAccountingCostCentersListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

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
    public moduleService?: AccountingCostCentersService
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
        id: 'code',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.code`),
        display: 'true',
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
        display: 'true',
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
        display: 'true',
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
        display: 'true',
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.AccountingCostCentersActionTypes.SuccessPost,
          actions.AccountingCostCentersActionTypes.SuccessPut,
          actions.AccountingCostCentersActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
