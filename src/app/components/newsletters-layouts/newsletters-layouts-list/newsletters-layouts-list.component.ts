import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NewslettersLayoutsService } from '@peakitpt/ui-kyrios-api';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';
import {
  getNewslettersLayoutsList,
  getSelectedNewslettersLayouts,
  getNewslettersLayoutsListEntirely,
} from '../reducers/newsletters-layouts.selectors';
import * as actions from '../reducers/newsletters-layouts.actions';
import {
  NewslettersLayoutResponse,
  NewslettersLayout,
} from '../newsletters-layout.model';

@Component({
  selector: 'kyr-newsletters-layouts-list',
  templateUrl: './newsletters-layouts-list.component.html',
})
export class NewslettersLayoutsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'newsletter';
  modulePath = 'newsletters-layouts';
  modelList$: Observable<NewslettersLayoutResponse>;
  selectedRows$: Observable<NewslettersLayout[]>;
  viewName = 'NewslettersLayout';

  selectorGetList = getNewslettersLayoutsList;
  selectorGetSelected = getSelectedNewslettersLayouts;
  selectorGetListEntirely = getNewslettersLayoutsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

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
    public moduleService?: NewslettersLayoutsService
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
          actions.NewslettersLayoutsActionTypes.SuccessPost,
          actions.NewslettersLayoutsActionTypes.SuccessPut,
          actions.NewslettersLayoutsActionTypes.SuccessDelete,
          actions.NewslettersLayoutsActionTypes.SuccessBulkDelete
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
        id: 'title',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.title`),
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
