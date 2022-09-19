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
import { AccountingTaxonomyCodesService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingTaxonomyCodesListEntirely,
  getSelectedAccountingTaxonomyCodes,
} from './../reducers/accounting-taxonomy-codes.selectors';
import { getAccountingTaxonomyCodesList } from '../reducers/accounting-taxonomy-codes.selectors';
import * as actions from '../reducers/accounting-taxonomy-codes.actions';
import {
  AccountingTaxonomyCodeResponse,
  AccountingTaxonomyCode,
} from '../accounting-taxonomy-code.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-accounting-taxonomy-codes-list',
  templateUrl: './accounting-taxonomy-codes-list.component.html',
})
export class AccountingTaxonomyCodesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-taxonomy-codes';
  viewName = 'AccountingTaxonomyCode';
  modelList$: Observable<AccountingTaxonomyCodeResponse>;
  selectedRows$: Observable<AccountingTaxonomyCode[]>;

  selectorGetList = getAccountingTaxonomyCodesList;
  selectorGetSelected = getSelectedAccountingTaxonomyCodes;
  selectorGetListEntirely = getAccountingTaxonomyCodesListEntirely;
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
    public moduleService?: AccountingTaxonomyCodesService
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
        id: 'taxonomy_reference_code',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.taxonomy_reference_code`
        ),
      },
      {
        id: 'taxonomy_code',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.taxonomy_code`
        ),
      },
      {
        id: 'base_code',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.base_code`),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'observations',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.observations`
        ),
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
        id: 'taxonomy_reference_code',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.taxonomy_reference_code`
        ),
      },
      {
        id: 'taxonomy_reference_id',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.taxonomy_reference_id`
        ),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.AccountingTaxonomyCodesActionTypes.SuccessPost,
          actions.AccountingTaxonomyCodesActionTypes.SuccessPut,
          actions.AccountingTaxonomyCodesActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
