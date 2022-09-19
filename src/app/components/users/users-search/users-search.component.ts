import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kyr-users-search',
  templateUrl: './users-search.component.html',
})
export class UsersSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'users';

  actionRequestPostSearch = RequestPostSearch;

  booleanOptions = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: '',
    },
    {
      label: this.i18nextPipe.transform('translation:yes'),
      value: 'true',
    },
    {
      label: this.i18nextPipe.transform('translation:no'),
      value: 'false',
    },
  ];

  localeFormOptions = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: null,
    },
    {
      value: 'pt',
      label: this.i18nextPipe.transform(`translation:pt`),
    },
    {
      value: 'en',
      label: this.i18nextPipe.transform(`translation:en`),
    },
    {
      value: 'es',
      label: this.i18nextPipe.transform(`translation:es`),
    },
  ];

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
        email: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.email`
          ),
          value: null,
        }),
        subscriptions_limit: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.subscriptions_limit`
          ),
          value: null,
        }),
        approved_at_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.approved_at_start`
          ),
          value: null,
        }),
        approved_at_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.approved_at_end`
          ),
          value: null,
        }),
        expires_at_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.expires_at_start`
          ),
          value: null,
        }),
        expires_at_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.expires_at_end`
          ),
          value: null,
        }),
        current_sign_in_at_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.current_sign_in_at_start`
          ),
          value: null,
        }),
        current_sign_in_at_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.current_sign_in_at_end`
          ),
          value: null,
        }),
        locale: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.locale`
          ),
          value: null,
        }),
        disabled: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.active`
          ),
          value: null,
        }),
      }),
    });
    // this.cdr.detectChanges();
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'approved_at_start':
      case 'approved_at_end':
      case 'expires_at_start':
      case 'expires_at_end':
      case 'current_sign_in_at_start':
      case 'current_sign_in_at_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case 'disabled':
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
      case 'approved_at_start':
      case 'approved_at_end':
      case 'expires_at_start':
      case 'expires_at_end':
      case 'current_sign_in_at_start':
      case 'current_sign_in_at_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      case 'disabled':
        const option = this.booleanOptions.find((o) => o.label === newValue);
        super.updateField(field, option ? option.value : null);
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
