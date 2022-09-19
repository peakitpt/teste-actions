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

import { getError, getGroups } from './reducers/groups-modal.selectors';
import * as actions from './reducers/groups-modal.actions';
import { GroupResponse } from './groups-modal.model';

@Component({
  selector: 'kyr-groups-modal',
  templateUrl: './groups-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GroupsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'groups';
  modelList$: Observable<GroupResponse>;

  selectorGetList = getGroups;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        filterName: this.fb.group({
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
