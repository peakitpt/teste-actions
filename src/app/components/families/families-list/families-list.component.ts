import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FamiliesV1Service } from '@peakitpt/ui-kyrios-api';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getFamiliesList,
  getFamiliesListEntirely,
  getSelectedFamilies,
} from '../reducers/families.selectors';
import * as actions from '../reducers/families.actions';
import { FamilyResponse, Family } from '../family.model';

@Component({
  selector: 'kyr-families-list',
  templateUrl: './families-list.component.html',
})
export class FamiliesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'families';
  modelList$: Observable<FamilyResponse>;
  selectedRows$: Observable<Family[]>;
  viewName = 'Family';

  selectorGetList = getFamiliesList;
  selectorGetSelected = getSelectedFamilies;
  selectorGetListEntirely = getFamiliesListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirelyFamilies;

  @ViewChild('disabledTemplate') disabledTemplate: TemplateRef<any>;

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
    public familiesService?: FamiliesV1Service
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
      familiesService
    );
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.FamiliesActionTypes.SuccessPost,
          actions.FamiliesActionTypes.SuccessPut,
          actions.FamiliesActionTypes.SuccessDelete,
          actions.FamiliesActionTypes.SuccessBulkDelete
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
        id: 'id',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.id`),
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'father_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.father_description`
        ),
        minWidth: '200px',
      },
      {
        id: 'mother_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.mother_description`
        ),
        minWidth: '200px',
      },
      {
        id: 'disabled',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.disabled`),
        template: this.disabledTemplate,
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

    this.smallScreenTableColumns = [this.tableColumns[2], this.tableColumns[3]];
  }
}
