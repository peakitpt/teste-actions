import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import {
  getCuriaProvisionsList,
  getCuriaProvisionsListEntirely,
} from '../reducers/curia-provisions.selectors';
import { getSelectedCuriaProvisions } from './../reducers/curia-provisions.selectors';
import * as actions from '../reducers/curia-provisions.actions';
import {
  CuriaProvisionResponse,
  CuriaProvision,
} from '../curia-provision.model';
import { ofType } from '@ngrx/effects';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CuriaProvisionsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-curia-provisions-list',
  templateUrl: './curia-provisions-list.component.html',
})
export class CuriaProvisionsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'processes';
  modulePath = 'curia-provisions';
  modelList$: Observable<CuriaProvisionResponse>;
  selectedRows$: Observable<CuriaProvision[]>;
  viewName = 'CuriaProvision';

  selectorGetList = getCuriaProvisionsList;
  selectorGetSelected = getSelectedCuriaProvisions;
  selectorGetListEntirely = getCuriaProvisionsListEntirely;
  actionSetSelected = actions.SetSelectedCuriaProvisions;
  actionRequestGetAll = actions.RequestGetAllCuriaProvisions;
  actionRequestGetListEntirely = actions.RequestGetEntirelyCuriaProvisions;

  @ViewChild('expiration_dateTemplate')
  expiration_dateTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;

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
    public curiaProvisionsService?: CuriaProvisionsService
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
      curiaProvisionsService
    );
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
        id: 'provision_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.provision_type_description`
        ),
      },
      {
        id: 'place_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.place_description`
        ),
      },
      {
        id: 'expiration_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.expiration_date`
        ),
        template: this.expiration_dateTemplate,
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
        id: 'provision_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.provision_type_description`
        ),
      },
    ];
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.CuriaProvisionsActionTypes.SuccessPostCuriaProvision,
          actions.CuriaProvisionsActionTypes.SuccessPutCuriaProvision,
          actions.CuriaProvisionsActionTypes.SuccessDeleteCuriaProvision
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }
}
