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

import { getCuriaAdministrativeProcessTypes } from './reducers/curia-administrative-process-types-modal.selectors';
import * as actions from './reducers/curia-administrative-process-types-modal.actions';
import { CuriaAdministrativeProcessTypesResponse } from './curia-administrative-process-types-modal.model';

@Component({
  selector: 'kyr-curia-administrative-process-types-modal',
  templateUrl: './curia-administrative-process-types-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CuriaAdministrativeProcessTypesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-administrative-process-types';
  modelList$: Observable<CuriaAdministrativeProcessTypesResponse>;

  selectorGetList = getCuriaAdministrativeProcessTypes;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  subtypeDescriptionOptions = [];

  ngAfterViewInit() {
    this.subtypeDescriptionOptions = [
      {
        label: this.i18nextPipe.transform('translation:all'),
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.option.party_provisions`
        ),
        value: 'Licenças de Festas',
      },
    ];
    super.ngAfterViewInit();
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
        subtype_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.subtype_description`
          ),
          value: null,
        }),
      }),
    });
  }

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'subtype_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.subtype_description`
        ),
      },
    ];
  }
}
