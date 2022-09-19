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

import { getError, getPriests } from './reducers/priests-modal.selectors';
import * as actions from './reducers/priests-modal.actions';
import { EntityPriestsResponse } from './priests-modal.model';

@Component({
  selector: 'kyr-priests-modal',
  templateUrl: './priests-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PriestsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'priests';
  modelList$: Observable<EntityPriestsResponse>;

  selectorGetList = getPriests;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('clergyTypeTemplate') clergyTypeTemplate: TemplateRef<any>;
  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'clergy_type.name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.clergy_type.name`
        ),
        template: this.clergyTypeTemplate,
      },
      {
        id: 'entity.name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.name`
        ),
        template: this.nameTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        filterName: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.name`
          ),
          value: null,
          mainField: true,
        }),
      }),
    });
  }
}
