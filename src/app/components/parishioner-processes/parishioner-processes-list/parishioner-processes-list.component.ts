import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
import { ParishionerProcessesService } from '@peakitpt/ui-kyrios-api';

import { getSelectedParishionerProcesses } from './../reducers/parishioner-processes.selectors';
import { getParishionerProcessesList } from '../reducers/parishioner-processes.selectors';
import * as actions from '../reducers/parishioner-processes.actions';
import {
  ParishionerProcessResponse,
  ParishionerProcess,
} from '../parishioner-process.model';

@Component({
  selector: 'kyr-parishioner-processes-list',
  templateUrl: './parishioner-processes-list.component.html',
})
export class ParishionerProcessesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'parishioner-processes';
  viewName = 'ParishionerProcesse';
  modelList$: Observable<ParishionerProcessResponse>;
  selectedRows$: Observable<ParishionerProcess[]>;
  sideNavMainButton = false;

  selectorGetList = getParishionerProcessesList;
  selectorGetSelected = getSelectedParishionerProcesses;
  actionSetSelected = actions.SetSelectedParishionerProcesses;
  actionRequestGetAll = actions.RequestGetAllParishionerProcesses;

  id: number;
  redirectId: number;

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
    public moduleService?: ParishionerProcessesService
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
    this.subs.push(
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.id = +params.id;
        }
      }),
      this.route.queryParams.subscribe((queryParams) => {
        if (queryParams?.id) {
          this.redirectId = queryParams.id;
        }
      })
    );
    super.ngOnInit();
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'view_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.view_description`
        ),
      },
      {
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'process_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.process_description`
        ),
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'view_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.view_description`
        ),
      },
      {
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
    ];
  }

  refreshTable() {
    this.store.dispatch(
      new this.actionRequestGetAll(this.id, {
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
      })
    );
  }

  navigateToProcess(event: ParishionerProcess) {
    const module: string = event.url.replace(/_/gi, '-');
    this.navigate(module + '/details');
  }
}
