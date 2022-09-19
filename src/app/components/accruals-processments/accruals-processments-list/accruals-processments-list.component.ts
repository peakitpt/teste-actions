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
import { AccrualsProcessmentsService } from '@peakitpt/ui-kyrios-api';

import {
  getAccrualsProcessmentsListEntirely,
  getSelectedAccrualsProcessments,
} from './../reducers/accruals-processments.selectors';
import { getAccrualsProcessmentsList } from '../reducers/accruals-processments.selectors';
import * as actions from '../reducers/accruals-processments.actions';
import {
  AccrualsProcessmentResponse,
  AccrualsProcessment,
} from '../accruals-processment.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-accruals-processments-list',
  templateUrl: './accruals-processments-list.component.html',
})
export class AccrualsProcessmentsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'accruals';
  modulePath = 'accruals-processments';
  viewName = 'AccrualsProcessment';
  modelList$: Observable<AccrualsProcessmentResponse>;
  selectedRows$: Observable<AccrualsProcessment[]>;
  selectedRows: AccrualsProcessment[];
  filters: any = this.getDefaultDates();
  sideNavMainButton = false;

  selectorGetList = getAccrualsProcessmentsList;
  selectorGetSelected = getSelectedAccrualsProcessments;
  actionSetSelected = actions.SetSelectedAccrualsProcessments;
  selectorGetListEntirely = getAccrualsProcessmentsListEntirely;
  actionRequestGetAll = actions.RequestGetAllAccrualsProcessments;
  actionRequestGetListEntirely = actions.RequestGetEntirelyAccrualsProcessments;

  @ViewChild('processingNextDateTemplate')
  processingNextDateTemplate: TemplateRef<any>;

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
    public moduleService?: AccrualsProcessmentsService
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

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'client_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.client_name`
        ),
      },
      {
        id: 'accrual_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.accrual_type_description`
        ),
      },
      {
        id: 'processing_next_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.processing_next_date`
        ),
        template: this.processingNextDateTemplate,
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'client_name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.client_name`
        ),
      },
      {
        id: 'accrual_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.accrual_type_description`
        ),
      },
      {
        id: 'processing_next_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.processing_next_date`
        ),
        template: this.processingNextDateTemplate,
      },
    ];
  }

  checkboxSelectionEvent(event: any) {
    this.store.dispatch(new this.actionSetSelected(event));
    this.selectedRows$ = this.store.select(this.selectorGetSelected);

    this.selectedRows$.subscribe((r) => {
      this.selectedRows = r;
    });
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.AccrualsProcessmentsActionTypes.SuccessPostProcessAccrual
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  getDefaultDates() {
    return {
      processing_next_date_start: new Date(new Date().getFullYear(), 0, 1),
      processing_next_date_end: new Date(new Date().getFullYear(), 11, 31),
    };
  }

  processSelected() {
    const idsList: number[] = [];
    this.selectedRows.forEach((row: AccrualsProcessment) => {
      idsList.push(row.id);
    });
    this.store.dispatch(new actions.RequestPostProcessAccrual(idsList));
  }
}
