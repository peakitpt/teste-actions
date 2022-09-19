import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModalListComponent } from '../base-modal-list-component';

import {
  getError,
  getAccountingChartAccounts,
} from './reducers/accounting-chart-accounts-modal.selectors';
import * as actions from './reducers/accounting-chart-accounts-modal.actions';
import { AccountingChartAccountsResponse } from './accounting-chart-accounts-modal.model';

@Component({
  selector: 'kyr-accounting-chart-accounts-modal',
  templateUrl: './accounting-chart-accounts-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountingChartAccountsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-chart-accounts';
  modelList$: Observable<AccountingChartAccountsResponse>;

  selectorGetList = getAccountingChartAccounts;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;

  queryStringParams: any = {};
  groupingCategoryOptions = [];

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('queryStringParams')) {
      this.queryStringParams = JSON.parse(
        atob(this.route.snapshot.queryParamMap.get('queryStringParams'))
      );
    }
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.setGroupingCategoryOptions();
    super.ngAfterViewInit();
  }

  setTableColumns(): any[] {
    return [
      {
        id: 'account_id_as_text',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.account_id_as_text`
        ),
      },
      {
        id: 'account_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.account_description`
        ),
      },
      {
        id: 'grouping_category',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.grouping_category`
        ),
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        grouping_category: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.grouping_category`
          ),
          value: null,
        }),
        account_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.account_id`
          ),
          value: null,
          mainField: true,
        }),
        account_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.account_description`
          ),
          value: null,
        }),
      }),
    });
  }

  refreshTable() {
    this.isLoading = true;
    const modalParams = {
      modal: 1,
    };
    if (this.queryStringParams?.ochilds) {
      modalParams['ochilds'] = this.queryStringParams.ochilds;
    }

    this.store.dispatch(
      new this.actionRequestGetAll({
        params: modalParams,
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
      })
    );
  }

  setGroupingCategoryOptions() {
    this.groupingCategoryOptions = [
      {
        label: 'GR',
        value: 'GR',
      },
      {
        label: 'GA',
        value: 'GA',
      },
      {
        label: 'GM',
        value: 'GM',
      },
    ];
  }
}
