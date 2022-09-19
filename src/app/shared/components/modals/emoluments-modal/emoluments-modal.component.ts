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

import { getError, getEmoluments } from './reducers/emoluments-modal.selectors';
import { getEmolumentTypes } from './reducers/emoluments-modal.selectors';
import * as actions from './reducers/emoluments-modal.actions';
import { EmolumentsResponse } from './emoluments-modal.model';

@Component({
  selector: 'kyr-emoluments-modal',
  templateUrl: './emoluments-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmolumentsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'emoluments';
  modelList$: Observable<EmolumentsResponse>;

  selectorGetList = getEmoluments;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('valueTemplate') valueTemplate: TemplateRef<any>;
  emolumentTypesList$: Observable<any>;
  emolumentTypesSelectOptions: any[] = [];

  setTableColumns(): any[] {
    return [
      {
        id: 'description_short',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description_short`
        ),
      },
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.type`),
      },
      {
        id: 'value',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.value`),
        template: this.valueTemplate,
      },
      {
        id: 'currency',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.currency`),
      },
    ];
  }

  buildForm() {
    this.getEmolumentTypes();
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        description_short: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description_short`
          ),
          value: null,
          mainField: true,
        }),
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.type`
          ),
          value: null,
        }),
        value: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.value`
          ),
          value: null,
        }),
        currency: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.currency`
          ),
          value: null,
        }),
      }),
    });
  }

  getEmolumentTypes() {
    this.store.dispatch(
      new actions.RequestGetAllEmolumentTypes({
        limit: '100',
        page: '0',
      })
    );
    // this.emolumentTypesList$ = this.store.select(getEmolumentTypes);
    this.store.select(getEmolumentTypes).subscribe((r) => {
      this.emolumentTypesSelectOptions = [];
      if (r.results.length > 0) {
        r.results.forEach((element) => {
          this.emolumentTypesSelectOptions.push({
            label: element.name,
            value: element.name,
          });
        });
      }
    });
  }
}
