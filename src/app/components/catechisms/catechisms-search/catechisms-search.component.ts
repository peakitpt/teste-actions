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
  selector: 'kyr-catechisms-search',
  templateUrl: './catechisms-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CatechismsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'catechisms';

  actionRequestPostSearch = RequestPostSearch;

  yearsOptions: Array<{ value: number; label: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: null,
    },
    {
      value: 1,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.1_year`
      ),
    },
    {
      value: 2,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.2_year`
      ),
    },
    {
      value: 3,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.3_year`
      ),
    },
    {
      value: 4,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.4_year`
      ),
    },
    {
      value: 5,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.5_year`
      ),
    },
    {
      value: 6,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.6_year`
      ),
    },
    {
      value: 7,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.7_year`
      ),
    },
    {
      value: 8,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.8_year`
      ),
    },
    {
      value: 9,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.9_year`
      ),
    },
    {
      value: 10,
      label: this.i18nextPipe.transform(
        `${this.modulePath}:catechism_years.10_year`
      ),
    },
  ];

  weekdaysOptions: Array<{ value: number; label: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: null,
    },
    {
      value: 1,
      label: this.i18nextPipe.transform('translation:weekdays.monday'),
    },
    {
      value: 2,
      label: this.i18nextPipe.transform('translation:weekdays.tuesday'),
    },
    {
      value: 3,
      label: this.i18nextPipe.transform('translation:weekdays.wednesday'),
    },
    {
      value: 4,
      label: this.i18nextPipe.transform('translation:weekdays.thursday'),
    },
    {
      value: 5,
      label: this.i18nextPipe.transform('translation:weekdays.friday'),
    },
    {
      value: 6,
      label: this.i18nextPipe.transform('translation:weekdays.saturday'),
    },
    {
      value: 7,
      label: this.i18nextPipe.transform('translation:weekdays.sunday'),
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
        class_year: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.class_year`
          ),
          value: this.getCurrentClassYear(),
          mainField: true,
        }),
        finalized: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.finalized`
          ),
          value: '',
        }),
        year: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.year`
          ),
          value: '',
        }),
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
          ),
          value: null,
        }),
        catechists_names_for_search: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.catechists_names_for_search`
          ),
          value: null,
        }),
        week_day: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.week_day`
          ),
          value: '',
        }),
        start_time: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.start_time`
          ),
          value: null,
        }),
        is_for_adults: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.is_for_adults`
          ),
          value: '',
        }),
      }),
    });
  }

  afterSideNavLoaded() {
    this.onSearchClick();
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'year':
        return `${searchWordLabel}:(${
          this.yearsOptions.find((o) => o.value === value).label
        }) `;
      case 'week_day':
        return `${searchWordLabel}:(${
          this.weekdaysOptions.find((o) => o.value === value).label
        }) `;
      case 'finalized':
      case 'is_for_adults':
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
      case 'year':
        const yearsOption = this.yearsOptions.find((o) => o.label === newValue);
        super.updateField(field, yearsOption ? yearsOption.value : null);
        break;
      case 'week_day':
        const weekdayOption = this.weekdaysOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, weekdayOption ? weekdayOption.value : null);
        break;
      case 'finalized':
      case 'is_for_adults':
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

  private getCurrentClassYear(): string {
    const today = new Date();

    if (today.getUTCMonth() + 1 > 8) {
      return `${today.getUTCFullYear()}/${today.getUTCFullYear() + 1}`;
    } else {
      return `${today.getUTCFullYear() - 1}/${today.getUTCFullYear()}`;
    }
  }
}
