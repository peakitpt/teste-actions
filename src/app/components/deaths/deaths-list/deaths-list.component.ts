import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DeathsService, NumerationsService } from '@peakitpt/ui-kyrios-api';
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
  getDeathsList,
  getDeathsListEntirely,
  getSelectedDeaths,
} from '../reducers/deaths.selectors';
import * as actions from '../reducers/deaths.actions';
import { DeathResponse, Death } from '../death.model';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-deaths-list',
  templateUrl: './deaths-list.component.html',
})
export class DeathsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'archive';
  modulePath = 'deaths';
  modelList$: Observable<DeathResponse>;
  selectedRows$: Observable<Death[]>;
  viewName = 'Death';

  selectorGetList = getDeathsList;
  selectorGetListEntirely = getDeathsListEntirely;
  selectorGetSelected = getSelectedDeaths;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  @ViewChild('deathDateTemplate') deathDateTemplate: TemplateRef<any>;
  @ViewChild('entityBuryDateTemplate') entityBuryDateTemplate: TemplateRef<any>;

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
    public deathsService?: DeathsService
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
      deathsService
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
          actions.DeathsActionTypes.SuccessPost,
          actions.DeathsActionTypes.SuccessPut,
          actions.DeathsActionTypes.SuccessDelete,
          actions.DeathsActionTypes.SuccessBulkDelete
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
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
        minWidth: '200px',
      },
      {
        id: 'seat_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.seat_number`
        ),
      },
      {
        id: 'sheet',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.sheet`),
      },
      {
        id: 'death_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.death_date`
        ),
        template: this.deathDateTemplate,
      },
      {
        id: 'entity_bury_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_bury_date`
        ),
        template: this.entityBuryDateTemplate,
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
      this.tableColumns[4],
      this.tableColumns[5],
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
