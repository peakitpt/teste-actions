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
  getNewsletterSubscriptions,
} from './reducers/newsletter-subscriptions-modal.selectors';
import * as actions from './reducers/newsletter-subscriptions-modal.actions';
import { NewsletterSubscriptionsResponse } from './newsletter-subscriptions-modal.model';

@Component({
  selector: 'kyr-newsletter-subscriptions-modal',
  templateUrl: './newsletter-subscriptions-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsletterSubscriptionsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'newsletter-subscriptions';
  modelList$: Observable<NewsletterSubscriptionsResponse>;

  selectorGetList = getNewsletterSubscriptions;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;

  refreshTable() {
    this.isLoading = true;
    const modalParams = {
      modal: true,
      format: 'json',
    };
    this.store.dispatch(
      new this.actionRequestGetAll({
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
        params: modalParams,
      })
    );
  }

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'email',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.email`),
      },
      {
        id: 'mobilephone',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.mobilephone`
        ),
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
          ),
          mainField: true,
          value: null,
        }),
        email: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.email`
          ),
          value: null,
        }),
        mobilephone: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.mobilephone`
          ),
          value: null,
        }),
        active: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.active`
          ),
          value: '',
        }),
      }),
    });
  }
}
