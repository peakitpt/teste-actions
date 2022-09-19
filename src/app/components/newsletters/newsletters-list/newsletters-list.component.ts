import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
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
import { NewslettersService } from '@peakitpt/ui-kyrios-api';

import {
  getNewslettersList,
  getNewslettersListEntirely,
  getSelectedNewsletters,
} from '../reducers/newsletters.selectors';
import * as actions from '../reducers/newsletters.actions';
import { NewsletterResponse, Newsletter } from '../newsletter.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-newsletters-list',
  templateUrl: './newsletters-list.component.html',
})
export class NewslettersListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'newsletter';
  modulePath = 'newsletters';
  modelList$: Observable<NewsletterResponse>;
  selectedRows$: Observable<Newsletter[]>;
  viewName = 'Newsletter';

  selectorGetList = getNewslettersList;
  selectorGetListEntirely = getNewslettersListEntirely;
  selectorGetSelected = getSelectedNewsletters;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  /* This specific's component fields */
  selectedNewsletter: Newsletter;
  openSendNewsletterModal = false;
  frequencyOptions = {
    1: 'unique',
    2: 'daily',
    3: 'weekly',
    4: 'monthly',
    5: 'yearly',
  };

  /* ViewChilds */
  @ViewChild('frequencyTemplate') frequencyTemplate: TemplateRef<any>;
  @ViewChild('sendingDateTemplate') sendingDateTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('forInternalReadTemplate')
  forInternalReadTemplate: TemplateRef<any>;
  @ViewChild('sentTemplate') sentTemplate: TemplateRef<any>;

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
    public moduleService?: NewslettersService
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
          actions.NewslettersActionTypes.SuccessPost,
          actions.NewslettersActionTypes.SuccessPut,
          actions.NewslettersActionTypes.SuccessDelete,
          actions.NewslettersActionTypes.SuccessBulkDelete
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
        id: 'frequency',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.frequency`),
        template: this.frequencyTemplate,
      },
      {
        id: 'sending_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.sending_date`
        ),
        template: this.sendingDateTemplate,
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
      {
        id: 'for_internal_read',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.for_internal_read`
        ),
        template: this.forInternalReadTemplate,
      },
      {
        id: 'sent',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.sent`),
        template: this.sentTemplate,
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
      this.tableColumns[2],
      this.tableColumns[3],
      this.tableColumns[5],
    ];
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
      {
        name: this.i18nextPipe.transform(`${this.modulePath}:action.send_test`),
        value: 'send_test',
        icon: 'send',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
    ];
  }

  menuClick(event: string, data?: Newsletter) {
    switch (event) {
      case 'send_test':
        this.selectedNewsletter = data;
        this.openSendNewsletterModal = true;
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }
}
