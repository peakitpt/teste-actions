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
import { DocumentsTypesService } from '@peakitpt/ui-kyrios-api';

import {
  getDocumentsTypesList,
  getDocumentsTypesListEntirely,
} from '../reducers/documents-types.selectors';
import { getSelectedDocumentsTypes } from './../reducers/documents-types.selectors';
import * as actions from '../reducers/documents-types.actions';
import { DocumentsTypeResponse, DocumentsType } from '../documents-type.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-documents-types-list',
  templateUrl: './documents-types-list.component.html',
})
export class DocumentsTypesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'treasury';
  modulePath = 'documents-types';
  modelList$: Observable<DocumentsTypeResponse>;
  selectedRows$: Observable<DocumentsType[]>;
  viewName = 'DocumentsType';

  selectorGetList = getDocumentsTypesList;
  selectorGetSelected = getSelectedDocumentsTypes;
  selectorGetListEntirely = getDocumentsTypesListEntirely;
  actionSetSelected = actions.SetSelectedDocumentsTypes;
  actionRequestGetAll = actions.RequestGetAllDocumentsTypes;
  actionRequestGetListEntirely = actions.RequestGetEntirelyDocumentsTypes;

  @ViewChild('movementTypeTemplate') movementTypeTemplate: TemplateRef<any>;
  @ViewChild('selfAssessmentTemplate') selfAssessmentTemplate: TemplateRef<any>;
  @ViewChild('affectsLegalTaxReportsTemplate')
  affectsLegalTaxReportsTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;

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
    public moduleService?: DocumentsTypesService
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
        display: 'true',
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
        display: 'true',
      },
      {
        id: 'movement_type',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.movement_type`
        ),
        display: 'true',
        template: this.movementTypeTemplate,
      },
      {
        id: 'self_assessment',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.self_assessment`
        ),
        display: 'true',
        template: this.selfAssessmentTemplate,
      },
      {
        id: 'affects_legal_tax_reports',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.affects_legal_tax_reports`
        ),
        display: 'true',
        template: this.affectsLegalTaxReportsTemplate,
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        display: 'true',
        template: this.activeTemplate,
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
        display: 'true',
      },
      {
        id: 'movement_type',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.movement_type`
        ),
        display: 'true',
        template: this.movementTypeTemplate,
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.DocumentsTypesActionTypes.SuccessPostDocumentsType,
          actions.DocumentsTypesActionTypes.SuccessPutDocumentsType,
          actions.DocumentsTypesActionTypes.SuccessDeleteDocumentsType
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
