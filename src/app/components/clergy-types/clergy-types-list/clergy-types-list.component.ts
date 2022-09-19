import {
  getClergyTypesListEntirely,
  getSelectedClergyTypes,
} from '../reducers/clergy-types.selectors';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ClergyTypesService } from '@peakitpt/ui-kyrios-api';

import { getClergyTypesList } from '../reducers/clergy-types.selectors';
import * as actions from '../reducers/clergy-types.actions';
import { ClergyTypeResponse, ClergyType } from '../clergy-type.model';

@Component({
  selector: 'kyr-clergy-types-list',
  templateUrl: './clergy-types-list.component.html',
})
export class ClergyTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'clergy-types';
  modelList$: Observable<ClergyTypeResponse>;
  selectedRows$: Observable<ClergyType[]>;
  viewName = 'ClergyType';

  selectorGetList = getClergyTypesList;
  selectorGetSelected = getSelectedClergyTypes;
  selectorGetListEntirely = getClergyTypesListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('localeTemplate') localeTemplate: TemplateRef<any>;

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
    public moduleService?: ClergyTypesService
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
        id: 'group_name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.group_id`),
      },
      {
        id: 'locale',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.locale`),
        template: this.localeTemplate,
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
        id: 'group_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.group_name`
        ),
      },
      {
        id: 'locale',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.locale`),
      },
    ];
  }
}
