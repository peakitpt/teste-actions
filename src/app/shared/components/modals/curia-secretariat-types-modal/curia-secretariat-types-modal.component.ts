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

import { getCuriaSecretariatTypes } from './reducers/curia-secretariat-types-modal.selectors';
import * as actions from './reducers/curia-secretariat-types-modal.actions';
import { CuriaSecretariatTypesResponse } from './curia-secretariat-types-modal.model';

@Component({
  selector: 'kyr-curia-secretariat-types-modal',
  templateUrl: './curia-secretariat-types-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CuriaSecretariatTypesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-secretariat-types';
  modelList$: Observable<CuriaSecretariatTypesResponse>;

  selectorGetList = getCuriaSecretariatTypes;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

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
    ];
  }
}
