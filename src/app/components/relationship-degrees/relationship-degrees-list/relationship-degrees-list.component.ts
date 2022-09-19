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
import { RelationshipDegreesService } from '@peakitpt/ui-kyrios-api';

import { getSelectedRelationshipDegrees } from './../reducers/relationship-degrees.selectors';
import { getRelationshipDegreesList } from '../reducers/relationship-degrees.selectors';
import * as actions from '../reducers/relationship-degrees.actions';
import {
  RelationshipDegreeResponse,
  RelationshipDegree,
} from '../relationship-degree.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-relationship-degrees-list',
  templateUrl: './relationship-degrees-list.component.html',
})
export class RelationshipDegreesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'relationship-degrees';
  viewName = 'RelationshipDegree';
  modelList$: Observable<RelationshipDegreeResponse>;
  selectedRows$: Observable<RelationshipDegree[]>;

  selectorGetList = getRelationshipDegreesList;
  selectorGetSelected = getSelectedRelationshipDegrees;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;

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
    public moduleService?: RelationshipDegreesService
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
          actions.RelationshipDegreesActionTypes.SuccessPost,
          actions.RelationshipDegreesActionTypes.SuccessPut,
          actions.RelationshipDegreesActionTypes.SuccessDelete
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
        id: 'locale',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.locale`),
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.validated`),
        template: this.validatedTemplate,
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
        title: this.i18nextPipe.transform(`${this.modulePath}:locale`),
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform(`${this.modulePath}:validated`),
        template: this.validatedTemplate,
      },
    ];
  }
}
