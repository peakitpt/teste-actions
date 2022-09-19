import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  NumerationsService,
  PendingEntitiesService,
} from '@peakitpt/ui-kyrios-api';
import { SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Observable, Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import {
  PendingEntityEntity,
  PendingEntityResponse,
} from '../pending-entity.model';
import * as actions from '../reducers/pending-entities.actions';
import {
  getPendingEntitiesEntirely,
  getPendingEntitiesList,
  getSelectedPendingEntity,
} from '../reducers/pending-entities.selectors';

@Component({
  selector: 'kyr-pending-entities-list',
  templateUrl: './pending-entities-list.component.html',
})
export class PendingEntitiesListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'pending-entities';
  modelList$: Observable<PendingEntityResponse>;
  selectedRows$: Observable<PendingEntityEntity[]>;
  viewName = 'Group';

  selectorGetList = getPendingEntitiesList;
  selectorGetListEntirely = getPendingEntitiesEntirely;
  selectorGetSelected = getSelectedPendingEntity;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('emailTemplate') emailTemplate: TemplateRef<any>;
  @ViewChild('sexTemplate') sexTemplate: TemplateRef<any>;
  @ViewChild('statusTemplate') statusTemplate: TemplateRef<any>;

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
    public numerationsService: NumerationsService,
    public snackBarService: SnackBarService,
    public pendingEntitiesService?: PendingEntitiesService
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
      pendingEntitiesService
    );
  }

  ngOnInit() {
    super.ngOnInit();

    //HIDE ADD BUTTON
    this.sideNavMainButton = false;
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.PendingEntitiesActionTypes.SuccessPost,
          actions.PendingEntitiesActionTypes.SuccessPut,
          actions.PendingEntitiesActionTypes.SuccessDelete,
          actions.PendingEntitiesActionTypes.SuccessBulkDelete
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
        isColumnStickyStart: true,
        template: this.nameTemplate,
        minWidth: '200px',
      },
      {
        id: 'status',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.status`),
        isColumnStickyStart: true,
        template: this.statusTemplate,
      },
      {
        id: 'sex',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.sex`),
        template: this.sexTemplate,
      },
      {
        id: 'email',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.email`),
        template: this.emailTemplate,
      },
    ];

    this.smallScreenTableColumns = [
      this.tableColumns[1],
      this.tableColumns[2],
      this.tableColumns[3],
      this.tableColumns[4],
    ];
  }
}
