import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MassIntentionsTypesService } from '@peakitpt/ui-kyrios-api';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getMassIntentionsTypesList,
  getMassIntentionsTypesListEntirely,
  getSelectedMassIntentionsTypes,
} from '../reducers/mass-intentions-types.selectors';
import * as actions from '../reducers/mass-intentions-types.actions';
import {
  MassIntentionsTypeResponse,
  MassIntentionsType,
} from '../mass-intentions-type.model';

@Component({
  selector: 'kyr-mass-intentions-types-list',
  templateUrl: './mass-intentions-types-list.component.html',
})
export class MassIntentionsTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'mass-intentions-types';
  modelList$: Observable<MassIntentionsTypeResponse>;
  selectedRows$: Observable<MassIntentionsType[]>;
  viewName = 'MassIntentionsType';

  selectorGetList = getMassIntentionsTypesList;
  selectorGetListEntirely = getMassIntentionsTypesListEntirely;
  selectorGetSelected = getSelectedMassIntentionsTypes;
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
    public moduleService?: MassIntentionsTypesService
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
          actions.MassIntentionsTypesActionTypes.SuccessPost,
          actions.MassIntentionsTypesActionTypes.SuccessPut,
          actions.MassIntentionsTypesActionTypes.SuccessDelete,
          actions.MassIntentionsTypesActionTypes.SuccessBulkDelete
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
