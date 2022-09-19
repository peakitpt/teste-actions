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
import { ValencesService } from '@peakitpt/ui-kyrios-api';

import {
  getValencesListEntirely,
  getSelectedValences,
} from './../reducers/valences.selectors';
import { getValencesList } from '../reducers/valences.selectors';
import * as actions from '../reducers/valences.actions';
import { ValenceResponse, Valence } from '../valence.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-valences-list',
  templateUrl: './valences-list.component.html',
})
export class ValencesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'places';
  modulePath = 'valences';
  viewName = 'Valence';
  modelList$: Observable<ValenceResponse>;
  selectedRows$: Observable<Valence[]>;

  selectorGetList = getValencesList;
  selectorGetSelected = getSelectedValences;
  selectorGetListEntirely = getValencesListEntirely;
  actionSetSelected = actions.SetSelectedValences;
  actionRequestGetAll = actions.RequestGetAllValences;
  actionRequestGetListEntirely = actions.RequestGetEntirelyValences;

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
    public moduleService?: ValencesService
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
          actions.ValencesActionTypes.SuccessPostValence,
          actions.ValencesActionTypes.SuccessPutValence,
          actions.ValencesActionTypes.SuccessDeleteValence
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
        id: 'validated',
        title: this.i18nextPipe.transform(this.modulePath + ':model.validated'),
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
        id: 'validated',
        title: this.i18nextPipe.transform(this.modulePath + ':model.validated'),
        template: this.validatedTemplate,
      },
    ];
  }
}
