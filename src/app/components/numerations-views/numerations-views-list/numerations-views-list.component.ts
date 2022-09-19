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
import { NumerationsViewsService } from '@peakitpt/ui-kyrios-api';

import {
  getNumerationsViewsListEntirely,
  getSelectedNumerationsViews,
} from './../reducers/numerations-views.selectors';
import { getNumerationsViewsList } from '../reducers/numerations-views.selectors';
import * as actions from '../reducers/numerations-views.actions';
import {
  NumerationsViewResponse,
  NumerationsView,
} from '../numerations-view.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-numerations-views-list',
  templateUrl: './numerations-views-list.component.html',
})
export class NumerationsViewsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'numerations-views';
  viewName = 'NumerationsView';
  modelList$: Observable<NumerationsViewResponse>;
  selectedRows$: Observable<NumerationsView[]>;

  selectorGetList = getNumerationsViewsList;
  selectorGetSelected = getSelectedNumerationsViews;
  selectorGetListEntirely = getNumerationsViewsListEntirely;
  actionSetSelected = actions.SetSelectedNumerationsViews;
  actionRequestGetAll = actions.RequestGetAllNumerationsViews;
  actionRequestGetListEntirely = actions.RequestGetEntirelyNumerationsViews;

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
    public moduleService?: NumerationsViewsService
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
          actions.NumerationsViewsActionTypes.SuccessPostNumerationsView,
          actions.NumerationsViewsActionTypes.SuccessPutNumerationsView,
          actions.NumerationsViewsActionTypes.SuccessDeleteNumerationsView
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
        id: 'view__name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.view`),
      },
      {
        id: 'numeration_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.numeration_description`
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
        id: 'view__name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.view_name`),
      },
      {
        id: 'numeration_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.numeration_description`
        ),
      },
      {
        id: 'ser_year',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.ser_year`),
      },
    ];
  }
}
