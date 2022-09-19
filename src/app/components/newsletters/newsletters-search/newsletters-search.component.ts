import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';

@Component({
  selector: 'kyr-newsletters-search',
  templateUrl: './newsletters-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NewslettersSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'newsletters';

  actionRequestPostSearch = RequestPostSearch;

  /* This specific's component fields */
  frequencyOptions: Array<{ value: number; label: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: null,
    },
    {
      value: 1,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.unique`),
    },
    {
      value: 2,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.daily`),
    },
    {
      value: 3,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.weekly`),
    },
    {
      value: 4,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.monthly`),
    },
    {
      value: 5,
      label: this.i18nextPipe.transform(`${this.modulePath}:frequency.yearly`),
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
        // MAIN
        title: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.title`
          ),
          value: null,
          mainField: true,
        }),
        frequency: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.frequency`
          ),
          value: null,
        }),
        sending_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.sending_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        sending_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.sending_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        active: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.active`
          ),
          value: '',
        }),
        for_internal_read: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.for_internal_read`
          ),
          value: '',
        }),
      }),
    });
    this.cdr.detectChanges();
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'sending_date_start':
      case 'sending_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case 'frequency':
        return `${searchWordLabel}:(${
          this.frequencyOptions.find((o) => o.value === value).label
        }) `;
      case 'active':
      case 'for_internal_read':
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
      case 'sending_date_start':
      case 'sending_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      case 'frequency':
        const frequencyOption = this.frequencyOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(
          field,
          frequencyOption ? frequencyOption.value : null
        );
        break;
      case 'active':
      case 'for_internal_read':
        const booleanOption = this.booleanOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, booleanOption ? booleanOption.value : null);
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
