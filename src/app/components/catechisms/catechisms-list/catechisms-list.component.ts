import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CatechismsService } from '@peakitpt/ui-kyrios-api';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getCatechismsList,
  getCatechismsListEntirely,
  getSelectedCatechisms,
} from '../reducers/catechisms.selectors';
import * as actions from '../reducers/catechisms.actions';
import { Catechism, CatechismResponse } from '../catechism.model';

@Component({
  selector: 'kyr-catechisms-list',
  templateUrl: './catechisms-list.component.html',
})
export class CatechismsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'catechisms';
  modulePath = 'catechisms';
  modelList$: Observable<CatechismResponse>;
  selectedRows$: Observable<Catechism[]>;
  viewName = 'Catechism';

  selectorGetList = getCatechismsList;
  selectorGetListEntirely = getCatechismsListEntirely;
  selectorGetSelected = getSelectedCatechisms;
  actionRequestFail = actions.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirelyCatechisms;
  actionSetSelected = actions.SetSelected;

  @ViewChild('yearTemplate') yearTemplate: TemplateRef<any>;
  @ViewChild('catechistsTemplate') catechistsTemplate: TemplateRef<any>;
  @ViewChild('weekDayTemplate') weekDayTemplate: TemplateRef<any>;
  @ViewChild('isForAdultsTemplate') isForAdultsTemplate: TemplateRef<any>;
  @ViewChild('finalizedTemplate') finalizedTemplate: TemplateRef<any>;

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
    public moduleService: CatechismsService
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
          actions.CatechismsActionTypes.SuccessPost,
          actions.CatechismsActionTypes.SuccessPut,
          actions.CatechismsActionTypes.SuccessDelete,
          actions.CatechismsActionTypes.SuccessBulkDelete,
          actions.CatechismsActionTypes.SuccessPassGrade,
          actions.CatechismsActionTypes.SuccessFinalize
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
        id: 'class_year',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.class_year`
        ),
      },
      {
        id: 'year',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.year`),
        template: this.yearTemplate,
        minWidth: '60px',
        isColumnStickyStart: true,
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'catechists_names_for_search',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechists_names_for_search`
        ),
        template: this.catechistsTemplate,
        minWidth: '200px',
      },
      {
        id: 'week_day',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.week_day`),
        template: this.weekDayTemplate,
      },
      {
        id: 'start_time',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.start_time`
        ),
      },
      {
        id: 'is_for_adults',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.is_for_adults_abrev`
        ),
        template: this.isForAdultsTemplate,
      },
      {
        id: 'finalized',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.finalized`),
        template: this.finalizedTemplate,
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

    this.smallScreenTableColumns = [
      this.tableColumns[0],
      this.tableColumns[1],
      this.tableColumns[3],
    ];
  }

  getWeekday(data: number): string {
    let day: string;
    switch (data) {
      case 1:
        day = 'monday';
        break;
      case 2:
        day = 'tuesday';
        break;
      case 3:
        day = 'wednesday';
        break;
      case 4:
        day = 'thursday';
        break;
      case 5:
        day = 'friday';
        break;
      case 6:
        day = 'saturday';
        break;
      case 7:
        day = 'sunday';
        break;
    }
    return day ? this.i18nextPipe.transform(`translation:weekdays.${day}`) : '';
  }
}
