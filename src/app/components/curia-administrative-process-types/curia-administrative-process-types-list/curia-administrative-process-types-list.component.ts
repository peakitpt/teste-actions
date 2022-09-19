import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CuriaAdministrativeProcessTypesService } from '@peakitpt/ui-kyrios-api';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getCuriaAdministrativeProcessTypesList,
  getCuriaAdministrativeProcessTypesListEntirely,
  getSelectedCuriaAdministrativeProcessTypes,
} from '../reducers/curia-administrative-process-types.selectors';
import * as actions from '../reducers/curia-administrative-process-types.actions';
import {
  CuriaAdministrativeProcessTypeResponse,
  CuriaAdministrativeProcessType,
} from '../curia-administrative-process-type.model';

@Component({
  selector: 'kyr-curia-administrative-process-types-list',
  templateUrl: './curia-administrative-process-types-list.component.html',
})
export class CuriaAdministrativeProcessTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'processes';
  modulePath = 'curia-administrative-process-types';
  modelList$: Observable<CuriaAdministrativeProcessTypeResponse>;
  selectedRows$: Observable<CuriaAdministrativeProcessType[]>;
  viewName = 'CuriaAdministrativeProcessType';

  selectorGetList = getCuriaAdministrativeProcessTypesList;
  selectorGetListEntirely = getCuriaAdministrativeProcessTypesListEntirely;
  selectorGetSelected = getSelectedCuriaAdministrativeProcessTypes;
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
    public moduleService?: CuriaAdministrativeProcessTypesService
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
          actions.CuriaAdministrativeProcessTypesActionTypes.SuccessPost,
          actions.CuriaAdministrativeProcessTypesActionTypes.SuccessPut,
          actions.CuriaAdministrativeProcessTypesActionTypes.SuccessDelete,
          actions.CuriaAdministrativeProcessTypesActionTypes.SuccessBulkDelete
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
        id: 'subtype_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.subtype_description`
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

    this.smallScreenTableColumns = [this.tableColumns[0]];
  }
}
