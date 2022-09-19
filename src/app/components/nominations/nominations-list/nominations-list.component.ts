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
import {
  NominationsService,
  NumerationsService,
} from '@peakitpt/ui-kyrios-api';

import {
  getNominationsListEntirely,
  getSelectedNominations,
} from './../reducers/nominations.selectors';
import { getNominationsList } from '../reducers/nominations.selectors';
import * as actions from '../reducers/nominations.actions';
import { NominationResponse, Nomination } from '../nomination.model';
import { ofType } from '@ngrx/effects';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-nominations-list',
  templateUrl: './nominations-list.component.html',
})
export class NominationsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'processes';
  modulePath = 'nominations';
  viewName = 'Nomination';
  modelList$: Observable<NominationResponse>;
  selectedRows$: Observable<Nomination[]>;

  selectorGetList = getNominationsList;
  selectorGetSelected = getSelectedNominations;
  selectorGetListEntirely = getNominationsListEntirely;
  actionSetSelected = actions.SetSelected;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;

  @ViewChild('enabledTemplate')
  enabledTemplate: TemplateRef<any>;
  @ViewChild('nominationDateTemplate')
  nominationDateTemplate: TemplateRef<any>;

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
    public moduleService?: NominationsService
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
        id: 'entity_priest_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_priest_description`
        ),
      },
      {
        id: 'function_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.function_description`
        ),
      },
      {
        id: 'place_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.place_description`
        ),
      },
      {
        id: 'nomination_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.nomination_date`
        ),
        template: this.nominationDateTemplate,
      },
      {
        id: 'enabled',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.enabled`),
        template: this.enabledTemplate,
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
        id: 'serie_number',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.serie_number`
        ),
      },
      {
        id: 'entity_priest_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_priest_description`
        ),
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.NominationsActionTypes.SuccessPost,
          actions.NominationsActionTypes.SuccessPut,
          actions.NominationsActionTypes.SuccessDelete
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
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
