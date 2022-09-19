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
  CuriaWeddingsService,
  NumerationsService,
} from '@peakitpt/ui-kyrios-api';
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
  getCuriaWeddingsList,
  getCuriaWeddingsListEntirely,
  getSelectedCuriaWeddings,
} from '../reducers/curia-weddings.selectors';
import * as actions from '../reducers/curia-weddings.actions';
import { CuriaWeddingResponse, CuriaWedding } from '../curia-wedding.model';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-curia-weddings-list',
  templateUrl: './curia-weddings-list.component.html',
})
export class CuriaWeddingsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'sacraments';
  modulePath = 'curia-weddings';
  modelList$: Observable<CuriaWeddingResponse>;
  selectedRows$: Observable<CuriaWedding[]>;
  viewName = 'CuriaWedding';

  selectorGetList = getCuriaWeddingsList;
  selectorGetListEntirely = getCuriaWeddingsListEntirely;
  selectorGetSelected = getSelectedCuriaWeddings;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestGetListEntirely = actions.RequestGetEntirely;
  actionSetSelected = actions.SetSelected;

  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
  @ViewChild('curiaWeddingDateTemplate')
  curiaWeddingDateTemplate: TemplateRef<any>;
  @ViewChild('curiaStatusTemplate') curiaStatusTemplate: TemplateRef<any>;

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
    public moduleService?: CuriaWeddingsService
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

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.CuriaWeddingsActionTypes.SuccessPost,
          actions.CuriaWeddingsActionTypes.SuccessPut,
          actions.CuriaWeddingsActionTypes.SuccessDelete,
          actions.CuriaWeddingsActionTypes.SuccessBulkDelete,
          actions.CuriaWeddingsActionTypes.SuccessSendToCuria
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
        id: 'entity_groom_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_groom_description`
        ),
      },
      {
        id: 'entity_bride_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_bride_description`
        ),
      },
      {
        id: 'date',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.date`),
        template: this.dateTemplate,
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
      },
    ];

    this.smallScreenTableColumns = [
      this.tableColumns[0],
      this.tableColumns[1],
      this.tableColumns[2],
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
