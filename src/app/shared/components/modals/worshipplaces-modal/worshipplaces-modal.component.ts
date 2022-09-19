import {
  Component,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { WorshipplacesResponse } from './worshipplaces-modal.model';
import {
  getError,
  getWorshipplaces,
} from './reducers/worshipplaces-modal.selectors';
import * as actions from './reducers/worshipplaces-modal.actions';
import { BaseModalListComponent } from '../base-modal-list-component';

@Component({
  selector: 'kyr-worshipplaces-modal',
  templateUrl: './worshipplaces-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorshipplacesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  subs: any[] = [];

  selectorGetList = getWorshipplaces;
  modulePath = 'worshipplaces';
  modelList$: Observable<WorshipplacesResponse>;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('validatedColumnTemplate')
  validatedColumnTemplate: TemplateRef<any>;
  @ViewChild('nameColumnTemplate') nameColumnTemplate: TemplateRef<any>;
  @ViewChild('paroquiaDescriptionColumnTemplate')
  paroquiaDescriptionColumnTemplate: TemplateRef<any>;
  @ViewChild('arciprestadoDescriptionColumnTemplate')
  arciprestadoDescriptionColumnTemplate: TemplateRef<any>;
  @ViewChild('dioceseDescriptionColumnTemplate')
  dioceseDescriptionColumnTemplate: TemplateRef<any>;
  @ViewChild('countryDescriptionColumnTemplate')
  countryDescriptionColumnTemplate: TemplateRef<any>;

  ngOnInit() {
    // set filters
    this.modalParams = JSON.parse(
      atob(this.route.snapshot.queryParamMap.get('modalParams'))
    );
    if (this.modalParams.chapelry_id) {
      this.filters.chapelry_id = this.modalParams.chapelry_id;
    }
    super.ngOnInit();
  }

  refreshTable() {
    this.isLoading = true;
    this.store.dispatch(
      new this.actionRequestGetAll({
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
      })
    );
  }

  setTableColumns() {
    return [
      {
        id: 'entity_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_description`
        ),
        template: this.nameColumnTemplate,
      },
      {
        id: 'paroquia_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_relation_attributes.paroquia_description`
        ),
        template: this.paroquiaDescriptionColumnTemplate,
      },
      {
        id: 'arciprestado_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_relation_attributes.arciprestado_description`
        ),
        template: this.arciprestadoDescriptionColumnTemplate,
      },
      {
        id: 'diocese_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_relation_attributes.diocese_description`
        ),
        template: this.dioceseDescriptionColumnTemplate,
      },
      {
        id: 'country_description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.country_description`
        ),
        template: this.countryDescriptionColumnTemplate,
      },
      {
        id: 'validated',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.validated`),
        sortable: false,
        template: this.validatedColumnTemplate,
      },
    ];
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
    super.ngOnDestroy();
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
          mainField: true,
        }),
        entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_description`
          ),
          value: null,
          valueLabel: null,
        }),
        chapelry_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.chapelry_description`
          ),
          value: null,
          valueLabel: null,
        }),
        archpriestship_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.arciprestado_description`
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
}
