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
import { ModuleDocumentationLinksService } from '@peakitpt/ui-kyrios-api';

import {
  getModuleDocumentationLinksListEntirely,
  getSelectedModuleDocumentationLinks,
} from './../reducers/module-documentation-links.selectors';
import { getModuleDocumentationLinksList } from '../reducers/module-documentation-links.selectors';
import * as actions from '../reducers/module-documentation-links.actions';
import {
  ModuleDocumentationLinkResponse,
  ModuleDocumentationLink,
} from '../module-documentation-link.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-module-documentation-links-list',
  templateUrl: './module-documentation-links-list.component.html',
})
export class ModuleDocumentationLinksListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'admin';
  modulePath = 'module-documentation-links';
  viewName = 'ModuleDocumentationLink';
  modelList$: Observable<ModuleDocumentationLinkResponse>;
  selectedRows$: Observable<ModuleDocumentationLink[]>;

  selectorGetList = getModuleDocumentationLinksList;
  selectorGetSelected = getSelectedModuleDocumentationLinks;
  selectorGetListEntirely = getModuleDocumentationLinksListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('resourceTemplate') resourceTemplate: TemplateRef<any>;
  @ViewChild('documentUrlTemplate') documentUrlTemplate: TemplateRef<any>;

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
    public moduleService?: ModuleDocumentationLinksService
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
        id: 'resource',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.resource`),
        template: this.resourceTemplate,
        stopRowClickPropagation: true,
      },
      {
        id: 'documentation_url',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.documentation_url`
        ),
        template: this.documentUrlTemplate,
        stopRowClickPropagation: true,
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
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
      this.tableColumns[0],
      this.tableColumns[1],
      this.tableColumns[2],
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.ModuleDocumentationLinksActionTypes.SuccessPost,
          actions.ModuleDocumentationLinksActionTypes.SuccessPut,
          actions.ModuleDocumentationLinksActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  navigateToModule(data: ModuleDocumentationLink) {
    const url = data.resource.replace(/_/gi, '-');
    window.open(url, '_blank');
  }

  navigateToExternalLink(data: ModuleDocumentationLink) {
    window.open(data.documentation_url, '_blank');
  }
}
