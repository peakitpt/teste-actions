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
  getFormationTypes,
} from './reducers/formation-types-modal.selectors';
import * as actions from './reducers/formation-types-modal.actions';
import { FormationTypesResponse } from './formation-types-modal.model';

@Component({
  selector: 'kyr-formation-types-modal',
  templateUrl: './formation-types-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormationTypesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'formation-types';
  modelList$: Observable<FormationTypesResponse>;

  selectorGetList = getFormationTypes;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('createdAtTemplate') createdAtTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'created_at',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.created_at`
        ),
        sortable: false,
        template: this.createdAtTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
          mainField: true,
        }),
      }),
    });
  }
}
