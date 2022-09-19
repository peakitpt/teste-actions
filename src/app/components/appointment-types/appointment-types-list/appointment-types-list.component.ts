import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AppointmentTypesService } from '@peakitpt/ui-kyrios-api';
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
  getAppointmentTypesList,
  getAppointmentTypesListEntirely,
  getSelectedAppointmentTypes,
} from '../reducers/appointment-types.selectors';
import * as actions from '../reducers/appointment-types.actions';
import {
  AppointmentTypeResponse,
  AppointmentType,
} from '../appointment-type.model';

@Component({
  selector: 'kyr-appointment-types-list',
  templateUrl: './appointment-types-list.component.html',
})
export class AppointmentTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'appointment-types';
  modelList$: Observable<AppointmentTypeResponse>;
  selectedRows$: Observable<AppointmentType[]>;
  viewName = 'AppointmentType';

  selectorGetList = getAppointmentTypesList;
  selectorGetListEntirely = getAppointmentTypesListEntirely;
  selectorGetSelected = getSelectedAppointmentTypes;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;
  @ViewChild('deletedTemplate') deletedTemplate: TemplateRef<any>;

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
    public moduleService?: AppointmentTypesService
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
          actions.AppointmentTypesActionTypes.SuccessPost,
          actions.AppointmentTypesActionTypes.SuccessPut,
          actions.AppointmentTypesActionTypes.SuccessDelete,
          actions.AppointmentTypesActionTypes.SuccessBulkDelete
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

    if (+localStorage.getItem('userTypeId') === 4) {
      this.tableColumns.splice(3, 0, {
        id: 'deleted',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.deleted`),
        template: this.deletedTemplate,
      });
    }
  }
}
