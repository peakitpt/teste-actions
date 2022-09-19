import {
  getReportsGroupersListEntirely,
  getSelectedReportsGroupers,
} from './../reducers/reports-groupers.selectors';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ReportsGroupersService } from '@peakitpt/ui-kyrios-api';

import { getReportsGroupersList } from '../reducers/reports-groupers.selectors';
import * as actions from '../reducers/reports-groupers.actions';
import {
  ReportsGrouperResponse,
  ReportsGrouper,
} from '../reports-grouper.model';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'kyr-reports-groupers-list',
  templateUrl: './reports-groupers-list.component.html',
})
export class ReportsGroupersListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'reports-groupers';
  modelList$: Observable<ReportsGrouperResponse>;
  selectedRows$: Observable<ReportsGrouper[]>;
  viewName = 'ReportsGrouper';

  selectorGetList = getReportsGroupersList;
  selectorGetSelected = getSelectedReportsGroupers;
  selectorGetListEntirely = getReportsGroupersListEntirely;
  actionSetSelected = actions.SetSelectedReportsGroupers;
  actionRequestGetAll = actions.RequestGetAllReportsGroupers;
  actionRequestGetListEntirely = actions.RequestGetEntirelyReportsGroupers;

  modulesModel = [];
  @ViewChild('enabledTemplate') enabledTemplate: TemplateRef<any>;

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
    public moduleService?: ReportsGroupersService
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

  ngOnInit() {
    super.ngOnInit();
    this.modulesModel = [
      {
        name: this.i18nextPipe.transform('reports-groupers:module.name_many'),
        value: 'reports-groupers',
      },
      {
        name: this.i18nextPipe.transform('reports:module.name_many'),
        value: 'reports',
      },
      {
        name: this.i18nextPipe.transform('reports-groups:module.name_many'),
        value: 'reports-groups',
      },
    ];
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'locale',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.locale`),
      },
      {
        id: 'enabled',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.enabled`),
        template: this.enabledTemplate,
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
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'locale',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.locale`),
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.enabledTemplate,
      },
    ];
  }

  modulesMenuClick(event: any) {
    this.router.navigate([event]);
  }
}
