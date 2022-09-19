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
import { NumerationsService } from '@peakitpt/ui-kyrios-api';

import {
  getNumerationsListEntirely,
  getSelectedNumerations,
} from './../reducers/numerations.selectors';
import { getNumerationsList } from '../reducers/numerations.selectors';
import * as actions from '../reducers/numerations.actions';
import { NumerationResponse, Numeration } from '../numeration.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-numerations-list',
  templateUrl: './numerations-list.component.html',
})
export class NumerationsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'numerations';
  viewName = 'Numeration';
  modelList$: Observable<NumerationResponse>;
  selectedRows$: Observable<Numeration[]>;

  selectorGetList = getNumerationsList;
  selectorGetSelected = getSelectedNumerations;
  selectorGetListEntirely = getNumerationsListEntirely;
  actionSetSelected = actions.SetSelectedNumerations;
  actionRequestGetAll = actions.RequestGetAllNumerations;
  actionRequestGetListEntirely = actions.RequestGetEntirelyNumerations;

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
    public moduleService?: NumerationsService
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
          actions.NumerationsActionTypes.SuccessPostNumeration,
          actions.NumerationsActionTypes.SuccessPutNumeration,
          actions.NumerationsActionTypes.SuccessDeleteNumeration
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
        id: 'serie',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.serie`),
      },
      {
        id: 'ser_year',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.ser_year`),
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
        id: 'serie',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.serie`),
      },
      {
        id: 'ser_year',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.ser_year`),
      },
    ];
  }
}
