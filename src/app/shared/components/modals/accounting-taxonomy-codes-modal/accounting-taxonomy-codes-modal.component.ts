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
  getAccountingTaxonomyCodes,
} from './reducers/accounting-taxonomy-codes-modal.selectors';
import * as actions from './reducers/accounting-taxonomy-codes-modal.actions';
import { AccountingTaxonomyCodesResponse } from './accounting-taxonomy-codes-modal.model';

@Component({
  selector: 'kyr-accounting-taxonomy-codes-modal',
  templateUrl: './accounting-taxonomy-codes-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTaxonomyCodesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-taxonomy-codes';
  modelList$: Observable<AccountingTaxonomyCodesResponse>;

  selectorGetList = getAccountingTaxonomyCodes;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'locale',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.locale`),
      },
      {
        id: 'taxonomy_reference_code',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.taxonomy_reference_code`
        ),
      },
      {
        id: 'taxonomy_code',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.taxonomy_code`
        ),
      },
      {
        id: 'taxonomy_reference_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.taxonomy_reference_description`
        ),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'observations',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.observations`
        ),
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        taxonomy_reference_code: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.taxonomy_reference_code`
          ),
          value: null,
          mainField: true,
        }),
        taxonomy_code: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.taxonomy_code`
          ),
          value: null,
        }),
        base_code: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.base_code`
          ),
          value: null,
        }),
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
        observations: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.observations`
          ),
          value: null,
        }),
      }),
    });
  }
}
