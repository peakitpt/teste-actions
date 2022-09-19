import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
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
import { FormationTypesService } from '@peakitpt/ui-kyrios-api';

import {
  getFormationTypesList,
  getFormationTypesListEntirely,
} from '../reducers/formation-types.selectors';
import { getSelectedFormationTypes } from './../reducers/formation-types.selectors';
import * as actions from '../reducers/formation-types.actions';
import { FormationTypeResponse, FormationType } from '../formation-type.model';

@Component({
  selector: 'kyr-formation-types-list',
  templateUrl: './formation-types-list.component.html',
  styleUrls: ['./formations-types-list.component.scss'],
})
export class FormationTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'settings';
  modulePath = 'formation-types';
  modelList$: Observable<FormationTypeResponse>;
  selectedRows$: Observable<FormationType[]>;
  viewName = 'FormationType';

  selectorGetList = getFormationTypesList;
  selectorGetSelected = getSelectedFormationTypes;
  selectorGetListEntirely = getFormationTypesListEntirely;
  actionSetSelected = actions.SetSelectedFormationTypes;
  actionRequestGetAll = actions.RequestGetAllFormationTypes;
  actionRequestGetListEntirely = actions.RequestGetEntirelyFormationTypes;

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
    public moduleService?: FormationTypesService
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

  ngOnInit() {
    super.ngOnInit();

    this.searchFormStructure = [
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:description`),
        fields: [
          {
            type: 'text',
            appearance: 'standard',
            control: 'description',
            initialValue: null,
            searchWordLabel: 'Description',
            mainField: true,
          },
        ],
      },
    ];
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
        display: 'true',
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
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
        display: 'true',
      },
    ];
  }
}
