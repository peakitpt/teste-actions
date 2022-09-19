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

import { getError, getPersons } from './reducers/persons-modal.selectors';
import * as actions from './reducers/persons-modal.actions';
import { PersonsResponse } from './persons-modal.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { FormBuilder } from '@angular/forms';
import { SnackBarService } from '@peakitpt/ui-material';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-persons-modal',
  templateUrl: './persons-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PersonsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'persons';
  modelList$: Observable<PersonsResponse>;

  selectorGetList = getPersons;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionClearGetAll = actions.ClearGetAll;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('idTemplate') idTemplate: TemplateRef<any>;
  @ViewChild('taxpayerTemplate') taxpayerTemplate: TemplateRef<any>;
  @ViewChild('addressTemplate') addressTemplate: TemplateRef<any>;
  @ViewChild('birthDateTemplate') birthDateTemplate: TemplateRef<any>;
  @ViewChild('isParishionerTemplate') isParishionerTemplate: TemplateRef<any>;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public fb: FormBuilder,
    public snackBarService: SnackBarService,
    private sharedModule: SharedModule
  ) {
    super(store, router, route, i18nextPipe, fb, snackBarService);
  }

  setTableColumns(): any[] {
    return [
      {
        id: 'entity.name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.name`
        ),
        template: this.nameTemplate,
      },
      {
        id: 'id',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.id`),
        template: this.idTemplate,
      },
      {
        id: 'birth_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.birth_date`
        ),
        template: this.birthDateTemplate,
      },
      {
        id: 'taxpayer',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.taxpayer`
        ),
        template: this.taxpayerTemplate,
      },
      {
        id: 'address',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity.address`
        ),
        template: this.addressTemplate,
      },
      {
        id: 'is_parishioner',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.is_parishioner`
        ),
        template: this.isParishionerTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.name`
          ),
          value: null,
          mainField: true,
        }),
        id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.id`
          ),
          value: null,
        }),
        birth_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.birth_date_start`
          ),
          value: null,
        }),
        birth_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.birth_date_end`
          ),
          value: null,
        }),
        place: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.place`
          ),
          value: null,
        }),
        sex: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.sex`
          ),
          value: null,
        }),
        taxpayer: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.taxpayer`
          ),
          value: null,
        }),
        address: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.address`
          ),
          value: null,
        }),
      }),
    });
  }

  search() {
    const newFilter = {};
    Object.keys(this.form.value.searchFields).forEach((field: string) => {
      newFilter[field] = this.form.value.searchFields[field].value;
    });

    this.filters = newFilter;
    this.modalParamsToFilters();
    this.refreshTable();
  }

  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'birth_date_start':
      case 'birth_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  updateField(field: string, newValue: any) {
    switch (field) {
      case 'birth_date_start':
      case 'birth_date_end':
        if (newValue === null || newValue === undefined) {
          super.updateField(field, null);
        } else {
          super.updateField(field, this.sharedModule.dateToUtc(newValue));
        }
        break;
      default:
        super.updateField(field, newValue);
    }
  }
}
