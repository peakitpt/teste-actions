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

import { getClergyTypes } from './reducers/clergy-types-modal.selectors';
import * as actions from './reducers/clergy-types-modal.actions';
import { ClergyTypeResponse } from './clergy-types-modal.model';

@Component({
  selector: 'kyr-clergy-types-modal',
  templateUrl: './clergy-types-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClergyTypesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modulePath = 'clergy-types';
  modelList$: Observable<ClergyTypeResponse>;

  selectorGetList = getClergyTypes;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  groupOptions: any[] = [];

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
        // template: this.nameTemplate,
      },
      {
        id: 'abbreviated_name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.abbreviated_name`),
      },
      {
        id: 'group_name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.group_id`),
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
        abbreviated_name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.abbreviated_name`
          ),
          value: null,
          mainField: false,
        }),
        group_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.group_id`
          ),
          value: null,
          mainField: false,
        }),
      }),
    });

    this.groupOptions = [
      { value: null, label: this.i18nextPipe.transform(`translation:all`) },
      { value: '1', label: this.i18nextPipe.transform(`${this.modulePath}:model.types.presbiterals`) },
      { value: '2', label: this.i18nextPipe.transform(`${this.modulePath}:model.types.deacons`) },
      { value: '3', label: this.i18nextPipe.transform(`${this.modulePath}:model.types.bishops`) }
    ];
  }
}
