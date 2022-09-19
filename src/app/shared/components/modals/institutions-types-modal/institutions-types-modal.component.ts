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

import { getInstitutionsTypes } from './reducers/institutions-types-modal.selectors';
import * as actions from './reducers/institutions-types-modal.actions';
import { InstitutionTypeResponse } from './institutions-types-modal.model';

@Component({
  selector: 'kyr-institutions-types-modal',
  templateUrl: './institutions-types-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstitutionsTypesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'institutions';
  modelList$: Observable<InstitutionTypeResponse>;

  selectorGetList = getInstitutionsTypes;
  actionRequestGetAll = actions.RequestGetAll;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('localeTemplate') localeTemplate: TemplateRef<any>;

  localeOptions: any[] = [];

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.institutions_types_modal.name`
        ),
        // template: this.nameTemplate,
      },
      {
        id: 'locale',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.institutions_types_modal.locale`
        ),
        template: this.localeTemplate,
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
        locale: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.institutions_types_modal.locale`
          ),
          value: null,
          mainField: false,
        }),
      }),
    });

    this.localeOptions = [
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.localeOptions.portuguese`
        ),
        value: 'pt',
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.localeOptions.spanish`
        ),
        value: 'es',
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.localeOptions.english`
        ),
        value: 'en',
      },
    ];
  }
}
