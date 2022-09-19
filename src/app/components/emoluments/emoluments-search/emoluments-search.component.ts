import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kyr-emoluments-search',
  templateUrl: './emoluments-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmolumentsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'emoluments';

  actionRequestPostSearch = RequestPostSearch;

  currencyOptions = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: '',
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
          value: '',
        }),
      }),
    });

    this.getCurrencies();
  }

  getCurrencies() {
    this.sharedModule.getCurrencies().forEach((currency) => {
      this.currencyOptions.push({
        label: currency.code,
        value: currency.code,
      });
    });
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'currency':
        return `${searchWordLabel}:(${
          this.currencyOptions.find((o) => o.value === value).label
        }) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'currency':
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(
            this.currencyOptions.find((i) => i.label === newValue)
              ? this.currencyOptions.find((i) => i.label === newValue).value
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
