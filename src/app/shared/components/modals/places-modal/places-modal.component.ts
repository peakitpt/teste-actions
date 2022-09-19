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

import { getError, getPlaces } from './reducers/places-modal.selectors';
import * as actions from './reducers/places-modal.actions';
import { PlacesResponse } from './places-modal.model';

@Component({
  selector: 'kyr-places-modal',
  templateUrl: './places-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlacesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'places';
  modelList$: Observable<PlacesResponse>;

  selectorGetList = getPlaces;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('completeRelationTemplate')
  completeRelationTemplate: TemplateRef<any>;
  @ViewChild('entityTypeNameTemplate') entityTypeNameTemplate: TemplateRef<any>;

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        filterName: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.complete_relation`
          ),
          value: null,
          mainField: true,
        }),
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
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
        id: 'entity_type.name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_type.name`
        ),
        template: this.entityTypeNameTemplate,
      },
      {
        id: 'completeRelationTemplate',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
        template: this.completeRelationTemplate,
      },
    ];
  }
}
