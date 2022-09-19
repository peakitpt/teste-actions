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
  getNewslettersLayouts,
} from './reducers/newsletters-layouts-modal.selectors';
import * as actions from './reducers/newsletters-layouts-modal.actions';
import { NewslettersLayoutsResponse } from './newsletters-layouts-modal.model';

@Component({
  selector: 'kyr-newsletters-layouts-modal',
  templateUrl: './newsletters-layouts-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewslettersLayoutsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'newsletters-layouts';
  modelList$: Observable<NewslettersLayoutsResponse>;

  selectorGetList = getNewslettersLayouts;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('layoutTemplate') layoutTemplate: TemplateRef<any>;

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
        id: 'title',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.title`),
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        title: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.title`
          ),
          value: null,
        }),
      }),
    });
  }
}
