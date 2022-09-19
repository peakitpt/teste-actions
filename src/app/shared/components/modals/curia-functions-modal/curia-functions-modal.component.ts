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
  getCuriaFunctions,
} from './reducers/curia-functions-modal.selectors';
import * as actions from './reducers/curia-functions-modal.actions';
import { CuriaFunctionsResponse } from './curia-functions-modal.model';

@Component({
  selector: 'kyr-curia-functions-modal',
  templateUrl: './curia-functions-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CuriaFunctionsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-functions';
  modelList$: Observable<CuriaFunctionsResponse>;

  selectorGetList = getCuriaFunctions;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('appointmentTypeTemplate')
  appointmentTypeTemplate: TemplateRef<any>;
  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;

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
        appointment_type_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.appointment_type_description`
          ),
          value: null,
          mainField: false,
        }),
        validated: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validated`
          ),
          value: null,
          mainField: false,
        }),
      }),
    });
  }

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
        template: this.nameTemplate,
      },
      {
        id: 'appointment_type_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.appointment_type_description`
        ),
        template: this.appointmentTypeTemplate,
      },
    ];
  }
}
