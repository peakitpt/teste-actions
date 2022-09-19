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
  getNumerations,
} from './reducers/numerations-modal.selectors';
import * as actions from './reducers/numerations-modal.actions';
import { NumerationsResponse } from './numeration-modal.model';

@Component({
  selector: 'kyr-numerations-modal',
  templateUrl: './numerations-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NumerationsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'numerations';
  modelList$: Observable<NumerationsResponse>;

  selectorGetList = getNumerations;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('createdAtTemplate') createdAtTemplate: TemplateRef<any>;

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'ser_year',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.ser_year`),
        sortable: false,
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
        ser_year: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.ser_year`
          ),
          value: null,
        }),
      }),
    });
  }
}
