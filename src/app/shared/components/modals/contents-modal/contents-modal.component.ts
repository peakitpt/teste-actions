import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModalListComponent } from '../base-modal-list-component';

import { getError, getContents } from './reducers/contents-modal.selectors';
import * as actions from './reducers/contents-modal.actions';
import { ContentsResponse } from './contents-modal.model';

@Component({
  selector: 'kyr-contents-modal',
  templateUrl: './contents-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'contents';
  modelList$: Observable<ContentsResponse>;

  selectorGetList = getContents;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  setTableColumns(): any[] {
    return [
      {
        id: 'title',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.title`),
      },
      {
        id: 'sections_names',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.sections_names`
        ),
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        title: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.title`
          ),
          value: null,
          mainField: true,
        }),
        sections_names: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.sections_names`
          ),
          value: null,
        }),
      }),
    });
  }
}
