import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
  CuriaSecretariatsService,
  NumerationsService,
} from '@peakitpt/ui-kyrios-api';

import {
  getCuriaSecretariatsList,
  getCuriaSecretariatsListEntirely,
} from '../reducers/curia-secretariats.selectors';
import { getSelectedCuriaSecretariats } from './../reducers/curia-secretariats.selectors';
import * as actions from '../reducers/curia-secretariats.actions';
import {
  CuriaSecretariatResponse,
  CuriaSecretariat,
} from '../curia-secretariat.model';
import { ofType } from '@ngrx/effects';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-curia-secretariats-list',
  templateUrl: './curia-secretariats-list.component.html',
})
export class CuriaSecretariatsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'processes';
  modulePath = 'curia-secretariats';
  modelList$: Observable<CuriaSecretariatResponse>;
  selectedRows$: Observable<CuriaSecretariat[]>;
  viewName = 'CuriaSecretariat';

  selectorGetList = getCuriaSecretariatsList;
  selectorGetSelected = getSelectedCuriaSecretariats;
  selectorGetListEntirely = getCuriaSecretariatsListEntirely;
  actionSetSelected = actions.SetSelectedCuriaSecretariats;
  actionRequestGetAll = actions.RequestGetAllCuriaSecretariats;
  actionRequestGetListEntirely = actions.RequestGetEntirelyCuriaSecretariats;

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
    public moduleService?: CuriaSecretariatsService
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
        id: 'title',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.title`),
      },
      {
        id: 'curia_secretariat_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.curia_secretariat_type_description`
        ),
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
        id: 'title',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.title`),
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.CuriaSecretariatsActionTypes.SuccessPostCuriaSecretariat,
          actions.CuriaSecretariatsActionTypes.SuccessPutCuriaSecretariat,
          actions.CuriaSecretariatsActionTypes.SuccessDeleteCuriaSecretariat
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
