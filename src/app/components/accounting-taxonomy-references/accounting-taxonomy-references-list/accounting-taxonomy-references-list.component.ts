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
import { AccountingTaxonomyReferencesService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingTaxonomyReferencesListEntirely,
  getSelectedAccountingTaxonomyReferences,
} from './../reducers/accounting-taxonomy-references.selectors';
import { getAccountingTaxonomyReferencesList } from '../reducers/accounting-taxonomy-references.selectors';
import * as actions from '../reducers/accounting-taxonomy-references.actions';
import {
  AccountingTaxonomyReferenceResponse,
  AccountingTaxonomyReference,
} from '../accounting-taxonomy-reference.model';
import { ofType } from '@ngrx/effects';
@Component({
  selector: 'kyr-accounting-taxonomy-references-list',
  templateUrl: './accounting-taxonomy-references-list.component.html',
})
export class AccountingTaxonomyReferencesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-taxonomy-references';
  viewName = 'AccountingTaxonomyReference';
  modelList$: Observable<AccountingTaxonomyReferenceResponse>;
  selectedRows$: Observable<AccountingTaxonomyReference[]>;

  selectorGetList = getAccountingTaxonomyReferencesList;
  selectorGetSelected = getSelectedAccountingTaxonomyReferences;
  selectorGetListEntirely = getAccountingTaxonomyReferencesListEntirely;
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
    public moduleService?: AccountingTaxonomyReferencesService
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
          actions.AccountingTaxonomyReferencesActionTypes.SuccessPost,
          actions.AccountingTaxonomyReferencesActionTypes.SuccessPut,
          actions.AccountingTaxonomyReferencesActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
