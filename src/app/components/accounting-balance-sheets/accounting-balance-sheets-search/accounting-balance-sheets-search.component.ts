import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';

@Component({
  selector: 'kyr-accounting-balance-sheets-search',
  templateUrl: './accounting-balance-sheets-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingBalanceSheetsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-balance-sheets';

  actionRequestPostSearch = RequestPostSearch;

  periodOptions = [];
  excludeBlankPeriodsOptions = [];

  afterSideNavLoaded() {
    this.onSearchClick();
  }

  buildForm() {
    const currentMonth = String(new Date().getMonth() + 1);
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        period: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.period`
          ),
          value: currentMonth,
        }),
        account_id_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.account_id_start`
          ),
          value: null,
          mainField: true,
        }),
        account_id_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.account_id_end`
          ),
          value: null,
        }),
        exclude_blank_periods: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.exclude_blank_periods`
          ),
          value: null,
        }),
      }),
    });

    this.periodOptions = [
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.abertura`
        ),
        value: 0,
      },
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
      {
        label: '3',
        value: '3',
      },
      {
        label: '4',
        value: '4',
      },
      {
        label: '5',
        value: '5',
      },
      {
        label: '6',
        value: '6',
      },
      {
        label: '7',
        value: '7',
      },
      {
        label: '8',
        value: '8',
      },
      {
        label: '9',
        value: '9',
      },
      {
        label: '10',
        value: '10',
      },
      {
        label: '11',
        value: '11',
      },
      {
        label: '12',
        value: '12',
      },
      {
        label: '13',
        value: '13',
      },
      {
        label: '14',
        value: '14',
      },
      {
        label: '15',
        value: '15',
      },
      {
        label: '16',
        value: '16',
      },
    ];

    this.excludeBlankPeriodsOptions = [
      {
        label: this.i18nextPipe.transform('translation:all'),
        value: '',
      },
      {
        label: this.i18nextPipe.transform('translation:yes'),
        value: 'true',
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
      case 'period':
        return `${searchWordLabel}:(${
          this.periodOptions.find((o) => o.value === value).label
        }) `;
      case 'exclude_blank_periods':
        return `${searchWordLabel}:(${
          this.excludeBlankPeriodsOptions.find((o) => o.value === value).label
        }) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'period':
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(
            this.periodOptions.find((i) => i.label === newValue)
              ? this.periodOptions.find((i) => i.label === newValue).value
              : null
          );
        break;
      case 'exclude_blank_periods':
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(
            this.excludeBlankPeriodsOptions.find((i) => i.label === newValue)
              ? this.excludeBlankPeriodsOptions.find(
                  (i) => i.label === newValue
                ).value
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
