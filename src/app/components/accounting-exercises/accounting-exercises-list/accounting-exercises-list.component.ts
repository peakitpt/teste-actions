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
import { AccountingExercisesService } from '@peakitpt/ui-kyrios-api';

import {
  getAccountingExercisesListEntirely,
  getSelectedAccountingExercises,
} from './../reducers/accounting-exercises.selectors';
import { getAccountingExercisesList } from '../reducers/accounting-exercises.selectors';
import * as actions from '../reducers/accounting-exercises.actions';
import {
  AccountingExerciseResponse,
  AccountingExercise,
} from '../accounting-exercise.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-accounting-exercises-list',
  templateUrl: './accounting-exercises-list.component.html',
})
export class AccountingExercisesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accounting';
  modulePath = 'accounting-exercises';
  viewName = 'AccountingExercise';
  modelList$: Observable<AccountingExerciseResponse>;
  selectedRows$: Observable<AccountingExercise[]>;

  selectorGetList = getAccountingExercisesList;
  selectorGetSelected = getSelectedAccountingExercises;
  selectorGetListEntirely = getAccountingExercisesListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('startDateTemplate')
  startDateTemplate: TemplateRef<any>;
  @ViewChild('endDateTemplate')
  endDateTemplate: TemplateRef<any>;

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
    public moduleService?: AccountingExercisesService
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

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'year',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.year`),
      },
      {
        id: 'start_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.start_date`
        ),
        template: this.startDateTemplate,
      },
      {
        id: 'end_date',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.end_date`),
        template: this.endDateTemplate,
      },
      {
        id: 'taxonomy_reference_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.taxonomy_reference_description`
        ),
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
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
        id: 'year',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.year`),
      },
      {
        id: 'taxonomy_reference_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.taxonomy_reference_description`
        ),
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.AccountingExercisesActionTypes.SuccessPost,
          actions.AccountingExercisesActionTypes.SuccessPut,
          actions.AccountingExercisesActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
