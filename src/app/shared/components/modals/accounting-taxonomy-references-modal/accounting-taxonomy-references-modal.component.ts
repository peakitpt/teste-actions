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
  getAccountingTaxonomyReferences,
} from './reducers/accounting-taxonomy-references-modal.selectors';
import * as actions from './reducers/accounting-taxonomy-references-modal.actions';
import { AccountingTaxonomyReferencesResponse } from './accounting-taxonomy-references-modal.model';

@Component({
  selector: 'kyr-accounting-taxonomy-references-modal',
  templateUrl: './accounting-taxonomy-references-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTaxonomyReferencesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-taxonomy-references';
  modelList$: Observable<AccountingTaxonomyReferencesResponse>;

  selectorGetList = getAccountingTaxonomyReferences;
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
        id: 'code',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.code`),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        code: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.code`
          ),
          value: null,
          mainField: true,
        }),
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
        locale: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.locale`
          ),
          value: null,
        }),
      }),
    });
  }
}
