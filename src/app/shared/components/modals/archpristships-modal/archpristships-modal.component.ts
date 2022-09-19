import {
  Component,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { PaginatorComponent } from '@peakitpt/ui-material';
import { Observable } from 'rxjs';
import { BaseModalListComponent } from '../base-modal-list-component';
import * as actions from './reducers/archpristships-modal.actions';
import { ArchpristshipsResponse } from './archpristships-modal.model';
import {
  getError,
  getArchpristships,
} from './reducers/archpristships-modal.selectors';

import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';

import { State } from './reducers/archpristships-modal.reducer';

@Component({
  selector: 'kyr-archpristships-modal',
  templateUrl: './archpristships-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArchpristshipsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<ArchpristshipsResponse>;
  modulePath = 'archpristships';
  selectorGetList = getArchpristships;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('validatedColumnTemplate')
  validatedColumnTemplate: TemplateRef<any>;
  @ViewChild('countryColumnTemplate') countryColumnTemplate: TemplateRef<any>;
  @ViewChild('dioceseColumnTemplate') dioceseColumnTemplate: TemplateRef<any>;
  @ViewChild('nameColumnTemplate') nameColumnTemplate: TemplateRef<any>;
  @ViewChild('paginator') paginator: PaginatorComponent;

  setTableColumns() {
    return [
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          'archpristships:model.entity_description'
        ),
        template: this.nameColumnTemplate,
      },
      {
        id: 'diocese_description',
        title: this.i18nextPipe.transform(
          'archpristships:model.entity_relation_attributes.diocese_description'
        ),
        template: this.dioceseColumnTemplate,
      },
      {
        id: 'country_description',
        title: this.i18nextPipe.transform(
          'archpristships:model.country_description'
        ),
        template: this.countryColumnTemplate,
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform('archpristships:model.validated'),
        sortable: false,
        template: this.validatedColumnTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        filterName: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:search_term`
          ),
          value: null,
        }),
        entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_description`
          ),
          value: null,
          valueLabel: null,
          mainField: true,
        }),
        diocese_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.diocese_description`
          ),
          value: null,
          valueLabel: null,
        }),
        country_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.country_description`
          ),
          value: null,
        }),
      }),
    });
  }
}
