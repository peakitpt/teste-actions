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
  getPriestsAndPersons,
} from './reducers/priests-and-persons-modal.selectors';
import * as actions from './reducers/priests-and-persons-modal.actions';
import { PriestsAndPersonsResponse } from './priests-and-persons-modal.model';

@Component({
  selector: 'kyr-priests-and-persons-modal',
  templateUrl: './priests-and-persons-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PriestsAndPersonsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'parishioners';
  modelList$: Observable<PriestsAndPersonsResponse>;

  selectorGetList = getPriestsAndPersons;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('birthDateTemplate') birthDateTemplate: TemplateRef<any>;

  refreshTable() {
    this.isLoading = true;
    const modalParams = {
      modal: true,
      serialize: 'priests_and_persons',
      priests_and_persons: true,
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
        id: 'entity_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_type_description`
        ),
      },
      {
        id: 'email',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.email`),
      },
      {
        id: 'birth_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.birth_date`
        ),
        template: this.birthDateTemplate,
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
          value: null,
          mainField: true,
        }),
      }),
    });
  }
}
