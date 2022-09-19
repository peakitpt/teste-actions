import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { BaseModalListComponent } from '../base-modal-list-component';

import { State } from './reducers/bishoprics-modal.reducer';
import { getError, getBishoprics } from './reducers/bishoprics-modal.selectors';
import * as actions from './reducers/bishoprics-modal.actions';
import { BishopricsResponse } from './bishoprics-modal.model';

@Component({
  selector: 'kyr-bishoprics-modal',
  templateUrl: './bishoprics-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BishopricsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'bishoprics';
  modelList$: Observable<BishopricsResponse>;

  selectorGetList = getBishoprics;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('countryTemplate') countryTemplate: TemplateRef<any>;
  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'country_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.country_description`
        ),
        template: this.countryTemplate,
      },
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
        template: this.nameTemplate,
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.validated`),
        sortable: false,
        template: this.validatedTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_description`
          ),
          value: null,
          mainField: true,
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
