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
import { AccountingTransactionDocumentTypesService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingTransactionDocumentTypesList,
  getAccountingTransactionDocumentTypesListEntirely,
} from '../reducers/accounting-transaction-document-types.selectors';
import { getSelectedAccountingTransactionDocumentTypes } from './../reducers/accounting-transaction-document-types.selectors';
import * as actions from '../reducers/accounting-transaction-document-types.actions';
import {
  AccountingTransactionDocumentTypeResponse,
  AccountingTransactionDocumentType,
} from '../accounting-transaction-document-type.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-accounting-transaction-document-types-list',
  templateUrl: './accounting-transaction-document-types-list.component.html',
})
export class AccountingTransactionDocumentTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-transaction-document-types';
  modelList$: Observable<AccountingTransactionDocumentTypeResponse>;
  selectedRows$: Observable<AccountingTransactionDocumentType[]>;
  viewName = 'AccountingTransactionDocumentType';

  selectorGetList = getAccountingTransactionDocumentTypesList;
  selectorGetSelected = getSelectedAccountingTransactionDocumentTypes;
  selectorGetListEntirely = getAccountingTransactionDocumentTypesListEntirely;
  actionSetSelected = actions.SetSelectedAccountingTransactionDocumentTypes;
  actionRequestGetAll = actions.RequestGetAllAccountingTransactionDocumentTypes;
  actionRequestGetListEntirely =
    actions.RequestGetEntirelyAccountingTransactionDocumentTypes;

  @ViewChild('movementTypeTemplate') movementTypeTemplate: TemplateRef<any>;
  @ViewChild('selfAssessmentTemplate') selfAssessmentTemplate: TemplateRef<any>;
  @ViewChild('affectsLegalTaxReportsTemplate')
  affectsLegalTaxReportsTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;

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
    public moduleService?: AccountingTransactionDocumentTypesService
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
          actions.AccountingTransactionDocumentTypesActionTypes
            .SuccessPostAccountingTransactionDocumentType,
          actions.AccountingTransactionDocumentTypesActionTypes
            .SuccessPutAccountingTransactionDocumentType,
          actions.AccountingTransactionDocumentTypesActionTypes
            .SuccessDeleteAccountingTransactionDocumentType
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
