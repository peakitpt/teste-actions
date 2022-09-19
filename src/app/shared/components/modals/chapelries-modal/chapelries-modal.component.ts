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
import { ChapelriesResponse } from './chapelries-modal.model';
import { getError, getChapelries } from './reducers/chapelries-modal.selectors';
import * as actions from './reducers/chapelries-modal.actions';
import { BaseModalListComponent } from '../base-modal-list-component';

@Component({
  selector: 'kyr-chapelries-modal',
  templateUrl: './chapelries-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChapelriesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('validatedColumnTemplate')
  validatedColumnTemplate: TemplateRef<any>;
  @ViewChild('countryColumnTemplate') countryColumnTemplate: TemplateRef<any>;
  @ViewChild('arciprestadoColumnTemplate')
  arciprestadoColumnTemplate: TemplateRef<any>;
  @ViewChild('dioceseColumnTemplate') dioceseColumnTemplate: TemplateRef<any>;
  @ViewChild('nameColumnTemplate') nameColumnTemplate: TemplateRef<any>;
  @ViewChild('paginator') paginator: PaginatorComponent;

  selectorGetList = getChapelries;
  modulePath = 'chapelries';
  modelList$: Observable<ChapelriesResponse>;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  setTableColumns() {
    return [
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          'chapelries:model.entity_description'
        ),
        template: this.nameColumnTemplate,
      },
      {
        id: 'arciprestado_description',
        title: this.i18nextPipe.transform(
          'chapelries:model.entity_relation_attributes.arciprestado_description'
        ),
        template: this.arciprestadoColumnTemplate,
      },
      {
        id: 'diocese_description',
        title: this.i18nextPipe.transform(
          'chapelries:model.entity_relation_attributes.diocese_description'
        ),
        template: this.dioceseColumnTemplate,
      },
      {
        id: 'country_description',
        title: this.i18nextPipe.transform(
          'chapelries:model.country_description'
        ),
        template: this.countryColumnTemplate,
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform('chapelries:model.validated'),
        sortable: false,
        template: this.validatedColumnTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        filterName: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:search_term`
          ),
          value: null,
        }),
        entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_description`
          ),
          value: null,
          valueLabel: null,
          mainField: true,
        }),
        archpriestship_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.archpristship_description`
          ),
          value: null,
          valueLabel: null,
        }),
        diocese_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.diocese_description`
          ),
          value: null,
          valueLabel: null,
        }),
        country_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.country_description`
          ),
          value: null,
        }),
      }),
    });
  }

  getArciprestadoDescription(data: any): String {
    if (
      data &&
      data.entities_relation &&
      data.entities_relation.arciprestado_description
    ) {
      return data.entities_relation.arciprestado_description.split(' > ').pop();
    }
    return '';
  }

  getDioceseDescription(data: any): String {
    if (
      data &&
      data.entities_relation &&
      data.entities_relation.diocese_description
    ) {
      return data.entities_relation.diocese_description.split(' > ').pop();
    }
    return '';
  }
}
