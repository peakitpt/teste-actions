import {
  getSectionsListEntirely,
  getSelectedSections,
} from './../reducers/sections.selectors';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
import { SectionsService } from '@peakitpt/ui-kyrios-api';

import { getSectionsList } from '../reducers/sections.selectors';
import * as actions from '../reducers/sections.actions';
import { SectionResponse, Section } from '../section.model';

@Component({
  selector: 'kyr-sections-list',
  templateUrl: './sections-list.component.html',
})
export class SectionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'cms';
  modulePath = 'sections';
  modelList$: Observable<SectionResponse>;
  selectedRows$: Observable<Section[]>;
  viewName = 'Section';

  selectorGetList = getSectionsList;
  selectorGetSelected = getSelectedSections;
  selectorGetListEntirely = getSectionsListEntirely;
  actionSetSelected = actions.SetSelectedSections;
  actionRequestGetAll = actions.RequestGetAllSections;
  actionRequestGetListEntirely = actions.RequestGetEntirelySections;

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
    public moduleService?: SectionsService
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
    const searchFields = [
      {
        field: 'description',
        type: 'text',
        appearance: 'standard',
        mainField: true,
      },
      {
        field: 'country',
        type: 'text',
        appearance: 'standard',
        mainField: false,
      },
      {
        field: 'district',
        type: 'text',
        appearance: 'standard',
        mainField: false,
      },
      {
        field: 'name',
        type: 'text',
        appearance: 'standard',
        mainField: false,
      },
      {
        field: 'is_arquichiestichip',
        type: 'text',
        appearance: 'standard',
        mainField: false,
      },
      {
        field: 'validated',
        type: 'text',
        appearance: 'standard',
        mainField: false,
      },
    ];

    this.searchFormStructure = [];
    searchFields.forEach((field) => {
      this.searchFormStructure.push({
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.${field.field}`
        ),
        fields: [
          {
            type: 'text',
            appearance: 'standard',
            placeholder: this.i18nextPipe.transform(
              `${this.modulePath}:model.${field.field}`
            ),
            control: '' + field.field,
            initialValue: null,
            searchWordLabel: this.i18nextPipe.transform(
              `${this.modulePath}:model.${field.field}`
            ),
            mainField: field.mainField,
          },
        ],
      });
    });

    this.searchFormStructure = [
      {
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
        fields: [
          {
            type: 'text',
            appearance: 'standard',
            placeholder: this.i18nextPipe.transform(
              `${this.modulePath}:model.description`
            ),
            control: 'description',
            initialValue: null,
            searchWordLabel: this.i18nextPipe.transform(
              `${this.modulePath}:model.description`
            ),
            mainField: true,
          },
        ],
      },
      {
        title: this.i18nextPipe.transform(`${this.modulePath}:reference`),
        fields: [
          {
            type: 'text',
            appearance: 'standard',
            placeholder: this.i18nextPipe.transform(
              `${this.modulePath}:reference`
            ),
            control: 'reference',
            initialValue: null,
            searchWordLabel: this.i18nextPipe.transform(
              `${this.modulePath}:reference`
            ),
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
      },
      {
        id: 'reference',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.reference`),
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
      },
      {
        id: 'reference',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.reference`),
      },
    ];
  }
}
