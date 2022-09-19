import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kyr-clergy-types-search',
  templateUrl: './clergy-types-search.component.html',
})
export class ClergyTypesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'clergy-types';

  actionRequestPostSearch = RequestPostSearch;

  groupOptions: any[] = [];
  localeOptions: any[] = [];

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
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
        abbreviated_name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.abbreviated_name`
          ),
          value: null,
          mainField: false,
        }),
        group_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.group_id`
          ),
          value: null,
          mainField: false,
        }),
        locale: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.locale`
          ),
          value: null,
          mainField: false,
        }),
      }),
    });

    this.groupOptions = [
      { value: null, label: this.i18nextPipe.transform(`translation:all`) },
      {
        value: '1',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.types.presbiterals`
        ),
      },
      {
        value: '2',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.types.deacons`
        ),
      },
      {
        value: '3',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.types.bishops`
        ),
      },
    ];

    this.localeOptions = [
      {
        value: 'pt',
        label: this.i18nextPipe.transform(`translation:_languages.pt`),
      },
      {
        value: 'es',
        label: this.i18nextPipe.transform(`translation:_languages.es`),
      },
      {
        value: 'en',
        label: this.i18nextPipe.transform(`translation:_languages.en`),
      },
    ];
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
