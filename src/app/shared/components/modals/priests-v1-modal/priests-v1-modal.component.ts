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

import { getError, getPriestsV1 } from './reducers/priests-v1-modal.selectors';
import * as actions from './reducers/priests-v1-modal.actions';
import { PriestsV1Response } from './priests-v1-modal.model';

@Component({
  selector: 'kyr-priests-v1-modal',
  templateUrl: './priests-v1-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PriestsV1ModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'priests';
  modelList$: Observable<PriestsV1Response>;

  selectorGetList = getPriestsV1;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('clergyTypeTemplate') clergyTypeTemplate: TemplateRef<any>;
  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('deceasedTemplate') deceasedTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'entity__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.name`
        ),
      },
      {
        id: 'clergy_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.clergy_type_description`
        ),
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
      {
        id: 'deceased',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.deceased`),
        template: this.deceasedTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
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
