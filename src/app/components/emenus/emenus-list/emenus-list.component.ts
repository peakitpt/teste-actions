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
import { EmenusService } from '@peakitpt/ui-kyrios-api';

import {
  getEmenusListEntirely,
  getSelectedEmenus,
} from './../reducers/emenus.selectors';
import { getEmenusList } from '../reducers/emenus.selectors';
import * as actions from '../reducers/emenus.actions';
import { EmenuResponse, Emenu } from '../emenu.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-emenus-list',
  templateUrl: './emenus-list.component.html',
})
export class EmenusListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'cms';
  modulePath = 'emenus';
  viewName = 'Emenu';
  modelList$: Observable<EmenuResponse>;
  selectedRows$: Observable<Emenu[]>;

  selectorGetList = getEmenusList;
  selectorGetSelected = getSelectedEmenus;
  selectorGetListEntirely = getEmenusListEntirely;
  actionSetSelected = actions.SetSelectedEmenus;
  actionRequestGetAll = actions.RequestGetAllEmenus;
  actionRequestGetListEntirely = actions.RequestGetEntirelyEmenus;

  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;

  optionsNoDeleteMenu = [
    {
      name: this.i18nextPipe.transform('translation:action.duplicate'),
      value: 'duplicate',
      icon: 'file_copy',
    },
  ];

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
    public moduleService?: EmenusService
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
          actions.EmenusActionTypes.SuccessPostEmenu,
          actions.EmenusActionTypes.SuccessPutEmenu,
          actions.EmenusActionTypes.SuccessDeleteEmenu
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
        id: 'title',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.title`),
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
        id: 'title',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.title`),
      },
    ];
  }
}
