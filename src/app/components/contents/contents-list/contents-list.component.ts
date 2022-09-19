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
import { ContentsService } from '@peakitpt/ui-kyrios-api';

import {
  getContentsListEntirely,
  getSelectedContents,
} from './../reducers/contents.selectors';
import { getContentsList } from '../reducers/contents.selectors';
import * as actions from '../reducers/contents.actions';
import { ContentResponse, Content } from '../content.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-contents-list',
  templateUrl: './contents-list.component.html',
})
export class ContentsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'cms';
  modulePath = 'contents';
  viewName = 'Content';
  modelList$: Observable<ContentResponse>;
  selectedRows$: Observable<Content[]>;

  selectorGetList = getContentsList;
  selectorGetSelected = getSelectedContents;
  selectorGetListEntirely = getContentsListEntirely;
  actionSetSelected = actions.SetSelectedContents;
  actionRequestGetAll = actions.RequestGetAllContents;
  actionRequestGetListEntirely = actions.RequestGetEntirelyContents;

  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;
  @ViewChild('onlineFromTemplate') onlineFromTemplate: TemplateRef<any>;

  // Table starts odernated by online_from_date
  sort = 'online_from_date';
  order = 'desc';

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
    public moduleService?: ContentsService
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
          actions.ContentsActionTypes.SuccessPostContent,
          actions.ContentsActionTypes.SuccessPutContent,
          actions.ContentsActionTypes.SuccessDeleteContent
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
        sortable: true,
        filter: false,
      },
      {
        id: 'sections_names',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.sections_names`
        ),
        sortable: true,
        filter: false,
      },
      {
        id: 'online_from_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.online_from_date`
        ),
        sortable: true,
        filter: false,
        template: this.onlineFromTemplate,
      },
      {
        id: 'buttons',
        title: '',
        filter: false,
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
        sortable: true,
        filter: false,
      },
      {
        id: 'sections_names',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.sections_names`
        ),
        sortable: true,
        filter: false,
      },
    ];
  }
}
