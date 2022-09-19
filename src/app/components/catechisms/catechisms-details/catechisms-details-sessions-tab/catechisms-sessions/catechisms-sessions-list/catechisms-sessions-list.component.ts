import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CatechismsSessionsService } from '@peakitpt/ui-kyrios-api';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import * as actions from '../../../../reducers/catechisms.actions';
import { CatechismSessionResponse } from '../../../../catechism.model';
import { getSessionsList } from '../../../../reducers/catechisms.selectors';
import { MenuHelperService } from 'src/app/components/base/services/menu-helper.service';

@Component({
  selector: 'kyr-catechisms-sessions-list',
  templateUrl: './catechisms-sessions-list.component.html',
})
export class CatechismsSessionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'catechisms';
  modelList$: Observable<CatechismSessionResponse>;
  viewName = 'Catechism';

  selectorGetList = getSessionsList;
  actionRequestGetAll = actions.RequestGetAllSessions;
  actionClearGetAll = actions.ClearGetAllSessions;
  actionSetSelected = actions.SetSelectedSession;

  @Input() modulePath: string;
  @Input() catechismId: number;
  @Input() finalized: boolean;

  sessionId: number;
  isSessionNewOpen = false;
  isSessionEditOpen = false;
  isSessionDetailsOpen = false;
  isSessionDeleteOpen = false;
  duplicateMode = false;

  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;

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
    public moduleService?: CatechismsSessionsService
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
    this.filters = {
      catechism_id: this.catechismId,
    };
    super.ngOnInit();
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechisms_sessions.date`
        ),
        template: this.dateTemplate,
      },
      {
        id: 'presences',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechisms_sessions.presences`
        ),
      },
      {
        id: 'summary',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechisms_sessions.summary`
        ),
        minWidth: '200px',
      },
      {
        id: 'observations',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.catechisms_sessions.observations`
        ),
        minWidth: '200px',
      },
    ];

    if (!this.finalized) {
      this.tableColumns.push({
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
      });
    }
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
          actions.CatechismsActionTypes.SuccessPostSession,
          actions.CatechismsActionTypes.SuccessPutSession,
          actions.CatechismsActionTypes.SuccessDeleteSession
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  menuClick(event: string, data?: any) {
    switch (event) {
      case 'new':
        this.isSessionNewOpen = true;
        break;
      case 'edit':
      case 'duplicate':
        this.duplicateMode = event === 'duplicate' && data?.id != null;
        this.sessionId = data?.id;
        this.isSessionEditOpen = true;
        break;
      case 'details':
        this.sessionId = data.id;
        this.isSessionDetailsOpen = true;
        break;
      case 'delete':
        this.store.dispatch(new this.actionSetSelected([data]));
        this.isSessionDeleteOpen = true;
        break;
      default:
        break;
    }

    this.setLimit(event);
  }

  closeSessionNewModal(saveAndAddNew: boolean) {
    this.isSessionNewOpen = false;

    if (saveAndAddNew) {
      setTimeout(() => {
        this.isSessionNewOpen = true;
      }, 2);
    }
  }

  closeSessionFormModal(saveAndAddNew: boolean) {
    this.isSessionEditOpen = false;
    this.duplicateMode = false;

    if (saveAndAddNew) {
      this.isSessionNewOpen = true;
    }
  }

  closeSessionDetailsModal(event: {
    openSessionEdit: boolean;
    duplicateMode: boolean;
  }) {
    this.isSessionDetailsOpen = false;

    if (event.openSessionEdit) {
      this.duplicateMode = event.duplicateMode;
      this.isSessionEditOpen = true;
    }
  }

  closeSessionDeleteModal(_confirmDelete: boolean) {
    this.isSessionDeleteOpen = false;
  }

  setSideNav() {
    // Must do nothing in order to not interfere with search
  }
}
