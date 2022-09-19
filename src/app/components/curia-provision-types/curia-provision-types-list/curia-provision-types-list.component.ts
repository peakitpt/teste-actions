import { BaseListComponent } from 'src/app/shared/components/base-list-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CuriaProvisionTypesService } from '@peakitpt/ui-kyrios-api';

import {
  getCuriaProvisionTypesList,
  getCuriaProvisionTypesListEntirely,
  getSelectedCuriaProvisionTypes,
} from '../reducers/curia-provision-types.selectors';
import * as actions from '../reducers/curia-provision-types.actions';
import {
  CuriaProvisionTypeResponse,
  CuriaProvisionType,
} from '../curia-provision-type.model';

@Component({
  selector: 'kyr-curia-provision-types-list',
  templateUrl: './curia-provision-types-list.component.html',
})
export class CuriaProvisionTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
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
    public curiaProvisionTypesService?: CuriaProvisionTypesService
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
      curiaProvisionTypesService
    );
  }
  appName = 'archive';
  modulePath = 'curia-provision-types';
  modelList$: Observable<CuriaProvisionTypeResponse>;
  selectedRows$: Observable<CuriaProvisionType[]>;
  viewName = 'CuriaProvisionType';

  selectorGetList = getCuriaProvisionTypesList;
  selectorGetListEntirely = getCuriaProvisionTypesListEntirely;
  selectorGetSelected = getSelectedCuriaProvisionTypes;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.CuriaProvisionTypesActionTypes.SuccessPost,
          actions.CuriaProvisionTypesActionTypes.SuccessPut,
          actions.CuriaProvisionTypesActionTypes.SuccessDelete,
          actions.CuriaProvisionTypesActionTypes.SuccessBulkDelete
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
