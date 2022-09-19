import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CuriaFunctionsService } from '@peakitpt/ui-kyrios-api';
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
  getCuriaFunctionsList,
  getCuriaFunctionsListEntirely,
  getSelectedCuriaFunctions,
} from '../reducers/curia-functions.selectors';
import * as actions from '../reducers/curia-functions.actions';
import { CuriaFunctionResponse, CuriaFunction } from '../curia-function.model';

@Component({
  selector: 'kyr-curia-functions-list',
  templateUrl: './curia-functions-list.component.html',
})
export class CuriaFunctionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'curia-functions';
  modelList$: Observable<CuriaFunctionResponse>;
  selectedRows$: Observable<CuriaFunction[]>;
  viewName = 'CuriaFunction';

  selectorGetList = getCuriaFunctionsList;
  selectorGetListEntirely = getCuriaFunctionsListEntirely;
  selectorGetSelected = getSelectedCuriaFunctions;
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
    public curiaFunctionsService?: CuriaFunctionsService
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
      curiaFunctionsService
    );
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.CuriaFunctionsActionTypes.SuccessPost,
          actions.CuriaFunctionsActionTypes.SuccessPut,
          actions.CuriaFunctionsActionTypes.SuccessDelete,
          actions.CuriaFunctionsActionTypes.SuccessBulkDelete
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
        id: 'abbreviated_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.abbreviated_name`
        ),
      },
      {
        id: 'appointment_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.appointment_type_description`
        ),
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

    this.smallScreenTableColumns = [this.tableColumns[1], this.tableColumns[4]];

    if (+localStorage.getItem('userTypeId') === 4) {
      this.tableColumns.splice(5, 0, {
        id: 'deleted',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.deleted`),
        template: this.deletedTemplate,
      });
    }
  }
}
