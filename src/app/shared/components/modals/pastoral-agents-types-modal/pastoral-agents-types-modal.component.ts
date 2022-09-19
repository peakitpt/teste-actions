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
  getPastoralAgentsTypes,
} from './reducers/pastoral-agents-types-modal.selectors';
import * as actions from './reducers/pastoral-agents-types-modal.actions';
import { PastoralAgentsTypesResponse } from './pastoral-agents-types-modal.model';

@Component({
  selector: 'kyr-pastoral-agents-types-modal',
  templateUrl: './pastoral-agents-types-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PastoralAgentsTypesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'pastoral-agents-types';
  modelList$: Observable<PastoralAgentsTypesResponse>;

  selectorGetList = getPastoralAgentsTypes;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('descriptionTemplate') descriptionTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
        template: this.descriptionTemplate,
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
