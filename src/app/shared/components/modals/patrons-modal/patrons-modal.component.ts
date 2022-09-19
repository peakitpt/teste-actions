import {
  Component,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { PaginatorComponent } from '@peakitpt/ui-material';
import { Observable } from 'rxjs';
import { PatronsResponse } from './patrons-modal.model';
import { getError, getPatrons } from './reducers/patrons-modal.selectors';
import * as actions from './reducers/patrons-modal.actions';
import { BaseModalListComponent } from '../base-modal-list-component';

@Component({
  selector: 'kyr-patrons-modal',
  templateUrl: './patrons-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PatronsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('validatedColumnTemplate')
  validatedColumnTemplate: TemplateRef<any>;
  @ViewChild('nameColumnTemplate') nameColumnTemplate: TemplateRef<any>;
  @ViewChild('paginator') paginator: PaginatorComponent;

  modelList$: Observable<PatronsResponse>;
  selectorGetList = getPatrons;
  modulePath = 'chapelries';
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  setTableColumns() {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform('patrons:model.name'),
        template: this.nameColumnTemplate,
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform('patrons:model.validated'),
        sortable: false,
        template: this.validatedColumnTemplate,
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
      }),
    });
  }
}
