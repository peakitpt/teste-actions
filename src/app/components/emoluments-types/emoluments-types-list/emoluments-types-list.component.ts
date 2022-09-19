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
  getEmolumentsTypesListEntirely,
  getSelectedEmolumentsTypes,
} from './../reducers/emoluments-types.selectors';
import { getEmolumentsTypesList } from '../reducers/emoluments-types.selectors';
import * as actions from '../reducers/emoluments-types.actions';
import { EmolumentTypeResponse, EmolumentType } from '../emoluments-type.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-emoluments-types-list',
  templateUrl: './emoluments-types-list.component.html',
})
export class EmolumentsTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'emoluments-types';
  viewName = 'Emolument';
  modelList$: Observable<EmolumentTypeResponse>;
  selectedRows$: Observable<EmolumentType[]>;

  selectorGetList = getEmolumentsTypesList;
  selectorGetSelected = getSelectedEmolumentsTypes;
  selectorGetListEntirely = getEmolumentsTypesListEntirely;
  actionSetSelected = actions.SetSelectedEmolumentsTypes;
  actionRequestGetAll = actions.RequestGetAllEmolumentsTypes;
  actionRequestGetListEntirely = actions.RequestGetEntirelyEmolumentsTypes;

  @ViewChild('isDonationEmolumentTemplate')
  isDonationEmolumentTemplate: TemplateRef<any>;

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
          actions.EmolumentsTypesActionTypes.SuccessPostEmolumentType,
          actions.EmolumentsTypesActionTypes.SuccessPutEmolumentType,
          actions.EmolumentsTypesActionTypes.SuccessDeleteEmolumentType
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
        id: 'is_donation_emolument',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.is_donation_emolument`
        ),
        template: this.isDonationEmolumentTemplate,
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
