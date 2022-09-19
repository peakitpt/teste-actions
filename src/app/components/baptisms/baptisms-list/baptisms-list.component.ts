import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { BaptismsService, NumerationsService } from '@peakitpt/ui-kyrios-api';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getBaptismsList,
  getBaptismsListEntirely,
  getSelectedBaptisms,
} from '../reducers/baptisms.selectors';
import * as actions from '../reducers/baptisms.actions';
import { BaptismResponse, Baptism } from '../baptism.model';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-baptisms-list',
  templateUrl: './baptisms-list.component.html',
})
export class BaptismsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'sacraments';
  modulePath = 'baptisms';
  modelList$: Observable<BaptismResponse>;
  selectedRows$: Observable<Baptism[]>;
  viewName = 'Baptism';

  selectorGetList = getBaptismsList;
  selectorGetListEntirely = getBaptismsListEntirely;
  selectorGetSelected = getSelectedBaptisms;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
  @ViewChild('baptismDateTemplate') baptismDateTemplate: TemplateRef<any>;
  @ViewChild('curiaStatusTemplate') curiaStatusTemplate: TemplateRef<any>;

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.BaptismsActionTypes.SuccessPost,
          actions.BaptismsActionTypes.SuccessPut,
          actions.BaptismsActionTypes.SuccessDelete,
          actions.BaptismsActionTypes.SuccessBulkDelete,
          actions.BaptismsActionTypes.SuccessSendToCuria
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

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
    public moduleService?: BaptismsService
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
    this.checkIfHasNumerations();
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'seat_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.seat_number`
        ),
        minWidth: '55px',
      },
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
        minWidth: '200px',
      },
      {
        id: 'date',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.date`),
        template: this.dateTemplate,
      },
      {
        id: 'age_at_subscription',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.age_at_subscription`
        ),
        minWidth: '50px',
      },
      {
        id: 'baptism_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.baptism_date`
        ),
        template: this.baptismDateTemplate,
      },
      {
        id: 'curia_status',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.curia_status`
        ),
        template: this.curiaStatusTemplate,
      },
      {
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
      },
    ];

    this.smallScreenTableColumns = [
      this.tableColumns[2],
      this.tableColumns[5],
      this.tableColumns[6],
    ];
  }

  checkIfHasNumerations(viewName: string = this.viewName) {
    this.subs.push(
      this.numerationsService.checkIfHasNumerations(viewName).subscribe((r) => {
        if (!r.has_numeration) {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(`numerations:message.needs_numeration`),
            this.sharedModule.ERROR_COLOR
          );
        }
      })
    );
  }
}
