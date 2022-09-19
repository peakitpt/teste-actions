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

import { getError, getValences } from './reducers/valences-modal.selectors';
import { getValenceTypes } from './reducers/valences-modal.selectors';
import * as actions from './reducers/valences-modal.actions';
import { ValencesResponse } from './valences-modal.model';

@Component({
  selector: 'kyr-valences-modal',
  templateUrl: './valences-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ValencesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'valences';
  modelList$: Observable<ValencesResponse>;

  selectorGetList = getValences;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('valueTemplate') valueTemplate: TemplateRef<any>;
  valenceTypesList$: Observable<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
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
        }),
      }),
    });
  }
}
