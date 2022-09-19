import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { GestdocumentsService } from '@peakitpt/ui-kyrios-api';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getGestdocumentsList,
  getGestdocumentsListEntirely,
  getSelectedGestdocuments,
} from '../reducers/gestdocuments.selectors';
import * as actions from '../reducers/gestdocuments.actions';
import { GestdocumentResponse, Gestdocument } from '../gestdocument.model';

@Component({
  selector: 'kyr-gestdocuments-list',
  templateUrl: './gestdocuments-list.component.html',
})
export class GestdocumentsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'dms';
  modulePath = 'gestdocuments';
  modelList$: Observable<GestdocumentResponse>;
  selectedRows$: Observable<Gestdocument[]>;
  viewName = 'Gestdocument';

  selectorGetList = getGestdocumentsList;
  selectorGetListEntirely = getGestdocumentsListEntirely;
  selectorGetSelected = getSelectedGestdocuments;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

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
    public moduleService?: GestdocumentsService
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

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.GestdocumentsActionTypes.SuccessPost,
          actions.GestdocumentsActionTypes.SuccessPut,
          actions.GestdocumentsActionTypes.SuccessDelete,
          actions.GestdocumentsActionTypes.SuccessBulkDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'document_title',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.document_title`
        ),
      },
      {
        id: 'institution_subject',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.institution_subject`
        ),
      },
      {
        id: 'buttons',
        title: '',
        sortable: false,
        template: this.sharedModule.isSmallScreen()
          ? this.buttonsTemplate
          : undefined,
        hoverTemplate: this.sharedModule.isSmallScreen()
          ? undefined
          : this.buttonsTemplate,
        stopRowClickPropagation: true,
        width: '50px',
      },
    ];

    this.smallScreenTableColumns = [this.tableColumns[0], this.tableColumns[1]];
  }
}
