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
import { PastoralAgentsTypesService } from '@peakitpt/ui-kyrios-api';

import {
  getPastoralAgentsTypesListEntirely,
  getSelectedPastoralAgentsTypes,
} from './../reducers/pastoral-agents-types.selectors';
import { getPastoralAgentsTypesList } from '../reducers/pastoral-agents-types.selectors';
import * as actions from '../reducers/pastoral-agents-types.actions';
import {
  PastoralAgentsTypeResponse,
  PastoralAgentsType,
} from '../pastoral-agents-type.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-pastoral-agents-types-list',
  templateUrl: './pastoral-agents-types-list.component.html',
})
export class PastoralAgentsTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'pastoral-agents-types';
  viewName = 'PastoralAgentsType';
  modelList$: Observable<PastoralAgentsTypeResponse>;
  selectedRows$: Observable<PastoralAgentsType[]>;

  selectorGetList = getPastoralAgentsTypesList;
  selectorGetSelected = getSelectedPastoralAgentsTypes;
  selectorGetListEntirely = getPastoralAgentsTypesListEntirely;
  actionSetSelected = actions.SetSelectedPastoralAgentsTypes;
  actionRequestGetAll = actions.RequestGetAllPastoralAgentsTypes;
  actionRequestGetListEntirely = actions.RequestGetEntirelyPastoralAgentsTypes;

  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;

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
    public moduleService?: PastoralAgentsTypesService
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
          actions.PastoralAgentsTypesActionTypes.SuccessPostPastoralAgentsType,
          actions.PastoralAgentsTypesActionTypes.SuccessPutPastoralAgentsType,
          actions.PastoralAgentsTypesActionTypes.SuccessDeletePastoralAgentsType
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
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'group_translate',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.group_translate`
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
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'group_translate',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.group_translate`
        ),
      },
    ];
  }
}
