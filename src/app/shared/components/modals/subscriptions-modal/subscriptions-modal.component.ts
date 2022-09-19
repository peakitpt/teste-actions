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
  getSubscriptions,
} from './reducers/subscriptions-modal.selectors';
import * as actions from './reducers/subscriptions-modal.actions';
import { SubscriptionsResponse } from './subscriptions-modal.model';
import { TableDataSource } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-subscriptions-modal',
  templateUrl: './subscriptions-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubscriptionsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'subscriptions';
  modelList$: Observable<SubscriptionsResponse>;

  selectorGetList = getSubscriptions;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('nameTranslateTemplate') nameTranslateTemplate: TemplateRef<any>;

  ngAfterViewInit() {
    this.tableColumns = this.setTableColumns();
    this.modal.open();
    this.subs.push(
      this.modal.modalClosed.subscribe(() => {
        this.redirectToParentPage();
      })
    );
    this.subs.push(
      this.modelList$.subscribe((response: any) => {
        let data = [];
        if (response) {
          if (response.default) {
            data.push(response.default);
          }
          if (response.subscriptions) {
            data = data.concat(response.subscriptions);
          }
        }
        this.dataSource = new TableDataSource(data);
        this.isLoading = false;
      })
    );
  }

  setTableColumns(): any[] {
    return [
      {
        id: 'entity_type_name_translate',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity2_type`
        ),
        sortable: false,
        template: this.nameTranslateTemplate,
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity1_name`
        ),
        template: this.nameTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        entity1_name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity1_name`
          ),
          value: null,
          mainField: true,
        }),
      }),
    });
  }
}
