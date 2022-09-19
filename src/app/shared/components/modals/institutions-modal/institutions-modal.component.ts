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
  getInstitutions,
} from './reducers/institutions-modal.selectors';
import * as actions from './reducers/institutions-modal.actions';
import { InstitutionsResponse } from './institutions-modal.model';

@Component({
  selector: 'kyr-institutions-modal',
  templateUrl: './institutions-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstitutionsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'institutions';
  modelList$: Observable<InstitutionsResponse>;

  selectorGetList = getInstitutions;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  setTableColumns(): any[] {
    return [
      {
        id: 'entity__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity__name`
        ),
        sortable: true,
      },
      {
        id: 'chapelry_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.chapelry_description`
        ),
        sortable: true,
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
        chapelry_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.chapelry_description`
          ),
          value: null,
        }),
      }),
    });
  }
}
