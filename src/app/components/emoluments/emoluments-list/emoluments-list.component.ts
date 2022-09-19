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
import { EmolumentsService } from '@peakitpt/ui-kyrios-api';

import {
  getEmolumentsListEntirely,
  getSelectedEmoluments,
} from './../reducers/emoluments.selectors';
import { getEmolumentsList } from '../reducers/emoluments.selectors';
import * as actions from '../reducers/emoluments.actions';
import { EmolumentResponse, Emolument } from '../emolument.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-emoluments-list',
  templateUrl: './emoluments-list.component.html',
})
export class EmolumentsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'emoluments';
  viewName = 'Emolument';
  modelList$: Observable<EmolumentResponse>;
  selectedRows$: Observable<Emolument[]>;

  selectorGetList = getEmolumentsList;
  selectorGetSelected = getSelectedEmoluments;
  selectorGetListEntirely = getEmolumentsListEntirely;
  actionSetSelected = actions.SetSelectedEmoluments;
  actionRequestGetAll = actions.RequestGetAllEmoluments;
  actionRequestGetListEntirely = actions.RequestGetEntirelyEmoluments;

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
    public moduleService?: EmolumentsService
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
          actions.EmolumentsActionTypes.SuccessPostEmolument,
          actions.EmolumentsActionTypes.SuccessPutEmolument,
          actions.EmolumentsActionTypes.SuccessDeleteEmolument
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
        id: 'description_short',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description_short`
        ),
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.type`),
      },
      {
        id: 'value',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.value`),
      },
      {
        id: 'currency',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.currency`),
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
        id: 'description_short',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.view_name`),
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.type`),
      },
      {
        id: 'value',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.value`),
      },
    ];
  }
}
