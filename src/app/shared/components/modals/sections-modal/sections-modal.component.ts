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

import { State } from './reducers/sections-modal.reducer';
import { getError, getSections } from './reducers/sections-modal.selectors';
import * as actions from './reducers/sections-modal.actions';
import { SectionsResponse } from './sections-modal.model';

@Component({
  selector: 'kyr-sections-modal',
  templateUrl: './sections-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SectionsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'sections';
  modelList$: Observable<SectionsResponse>;

  selectorGetList = getSections;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'reference',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.reference`),
        sortable: false,
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
        reference: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.reference`
          ),
          value: null,
        }),
      }),
    });
  }
}
