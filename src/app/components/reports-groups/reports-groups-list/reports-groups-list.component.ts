import {
  getReportsGroupsListEntirely,
  getSelectedReportsGroups,
} from './../reducers/reports-groups.selectors';
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
import { ReportsGroupsService } from '@peakitpt/ui-kyrios-api';

import { getReportsGroupsList } from '../reducers/reports-groups.selectors';
import * as actions from '../reducers/reports-groups.actions';
import { ReportsGroupResponse, ReportsGroup } from '../reports-group.model';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'kyr-reports-groups-list',
  templateUrl: './reports-groups-list.component.html',
})
export class ReportsGroupsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'reports-groups';
  modelList$: Observable<ReportsGroupResponse>;
  selectedRows$: Observable<ReportsGroup[]>;
  viewName = 'ReportsGroup';

  selectorGetList = getReportsGroupsList;
  selectorGetSelected = getSelectedReportsGroups;
  selectorGetListEntirely = getReportsGroupsListEntirely;
  actionSetSelected = actions.SetSelectedReportsGroups;
  actionRequestGetAll = actions.RequestGetAllReportsGroups;
  actionRequestGetListEntirely = actions.RequestGetEntirelyReportsGroups;

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
    public moduleService?: ReportsGroupsService
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
        name: this.i18nextPipe.transform('reports-groups:module.name_many'),
        value: 'reports-groups',
      },
      {
        name: this.i18nextPipe.transform('reports:module.name_many'),
        value: 'reports',
      },
      {
        name: this.i18nextPipe.transform('reports-groupers:module.name_many'),
        value: 'reports-groupers',
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
