import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CuriaSecretariatTypesService } from '@peakitpt/ui-kyrios-api';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getCuriaSecretariatTypesList,
  getCuriaSecretariatTypesListEntirely,
  getSelectedCuriaSecretariatTypes,
} from '../reducers/curia-secretariat-types.selectors';
import * as actions from '../reducers/curia-secretariat-types.actions';
import {
  CuriaSecretariatTypeResponse,
  CuriaSecretariatType,
} from '../curia-secretariat-type.model';

@Component({
  selector: 'kyr-curia-secretariat-types-list',
  templateUrl: './curia-secretariat-types-list.component.html',
})
export class CuriaSecretariatTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'curia-secretariat-types';
  modelList$: Observable<CuriaSecretariatTypeResponse>;
  selectedRows$: Observable<CuriaSecretariatType[]>;
  viewName = 'CuriaSecretariatType';

  selectorGetList = getCuriaSecretariatTypesList;
  selectorGetListEntirely = getCuriaSecretariatTypesListEntirely;
  selectorGetSelected = getSelectedCuriaSecretariatTypes;
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
    public moduleService?: CuriaSecretariatTypesService
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
          actions.CuriaSecretariatTypesActionTypes.SuccessPost,
          actions.CuriaSecretariatTypesActionTypes.SuccessPut,
          actions.CuriaSecretariatTypesActionTypes.SuccessDelete,
          actions.CuriaSecretariatTypesActionTypes.SuccessBulkDelete
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
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
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

    this.smallScreenTableColumns = [this.tableColumns[0]];
  }
}
