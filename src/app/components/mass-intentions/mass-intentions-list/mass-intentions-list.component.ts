import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {
  MassIntentionsService,
  NumerationsService,
} from '@peakitpt/ui-kyrios-api';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

import {
  getMassIntentionsList,
  getMassIntentionsListEntirely,
  getSelectedMassIntentions,
} from '../reducers/mass-intentions.selectors';
import * as actions from '../reducers/mass-intentions.actions';
import { MassIntentionResponse, MassIntention } from '../mass-intention.model';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-mass-intentions-list',
  templateUrl: './mass-intentions-list.component.html',
})
export class MassIntentionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'mass-intentions';
  modelList$: Observable<MassIntentionResponse>;
  selectedRows$: Observable<MassIntention[]>;
  viewName = 'MassIntention';

  selectorGetList = getMassIntentionsList;
  selectorGetListEntirely = getMassIntentionsListEntirely;
  selectorGetSelected = getSelectedMassIntentions;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  @ViewChild('intentionDateTemplate') intentionDateTemplate: TemplateRef<any>;
  @ViewChild('paidTemplate') paidTemplate: TemplateRef<any>;

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
    public massIntentionsService?: MassIntentionsService
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
      massIntentionsService
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.checkIfHasNumerations();
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.MassIntentionsActionTypes.SuccessPost,
          actions.MassIntentionsActionTypes.SuccessPut,
          actions.MassIntentionsActionTypes.SuccessDelete,
          actions.MassIntentionsActionTypes.SuccessBulkDelete
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
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'intention_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.intention_description`
        ),
      },
      {
        id: 'type_name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.type_name`),
      },
      {
        id: 'intention_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.intention_date`
        ),
        template: this.intentionDateTemplate,
      },
      {
        id: 'intention_time',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.intention_time`
        ),
      },
      {
        id: 'celebrated_by_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.celebrated_by_description`
        ),
      },
      {
        id: 'location_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.location_description`
        ),
      },
      {
        id: 'paid',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.paid`),
        template: this.paidTemplate,
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
      this.tableColumns[1],
      this.tableColumns[2],
      this.tableColumns[3],
      this.tableColumns[4],
      this.tableColumns[7],
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
