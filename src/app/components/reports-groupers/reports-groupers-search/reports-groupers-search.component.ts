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
  selector: 'kyr-reports-groupers-search',
  templateUrl: './reports-groupers-search.component.html',
})
export class ReportsGroupersSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'reports-groupers';

  actionRequestPostSearch = RequestPostSearch;

  localeFormOptions = [];

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
        locale: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.locale`
          ),
          value: null,
        }),
        enabled: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.enabled`
          ),
          value: null,
        }),
      }),
    });

    this.localeFormOptions = [
      {
        label: this.i18nextPipe.transform('translation:all'),
        value: null,
      },
      {
        value: 'pt',
        label: this.i18nextPipe.transform(`translation:_languages.pt`),
      },
      {
        value: 'en',
        label: this.i18nextPipe.transform(`translation:_languages.en`),
      },
      {
        value: 'es',
        label: this.i18nextPipe.transform(`translation:_languages.es`),
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
      case 'enabled':
        return `${searchWordLabel}:(${
          this.booleanOptions.find((o) => o.value === value).label
        }) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'enabled':
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(
            this.booleanOptions.find((i) => i.label === newValue)
              ? this.booleanOptions.find((i) => i.label === newValue).value
              : null
          );
        break;
      default:
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(newValue);
    }
  }
}
