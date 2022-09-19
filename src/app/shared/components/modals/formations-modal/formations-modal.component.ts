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
import { BaseModalListComponent } from '../base-modal-list-component';
import * as actions from './reducers/formations-modal.actions';
import { FormationsResponse } from './formations-modal.model';
import { getError, getFormations } from './reducers/formations-modal.selectors';

@Component({
  selector: 'kyr-formations-modal',
  templateUrl: './formations-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormationsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<FormationsResponse>;
  modulePath = 'formations';
  selectorGetList = getFormations;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('formationTypeDescriptionColumnTemplate')
  formationTypeDescriptionColumnTemplate: TemplateRef<any>;
  @ViewChild('descriptionColumnTemplate')
  descriptionColumnTemplate: TemplateRef<any>;
  @ViewChild('paginator') paginator: PaginatorComponent;

  setTableColumns() {
    return [
      {
        id: 'description',
        title: this.i18nextPipe.transform('formations:model.description'),
        filter: false,
        sortable: true,
        template: this.descriptionColumnTemplate,
      },
      {
        id: 'formations_type_description',
        title: this.i18nextPipe.transform('formations:model.type'),
        filter: false,
        sortable: true,
        template: this.formationTypeDescriptionColumnTemplate,
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
        formations_type_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.type`
          ),
          value: null,
        }),
      }),
    });
  }
}
