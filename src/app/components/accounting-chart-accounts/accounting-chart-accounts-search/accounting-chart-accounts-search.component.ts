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
  selector: 'kyr-accounting-chart-accounts-search',
  templateUrl: './accounting-chart-accounts-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingChartAccountsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-chart-accounts';

  actionRequestPostSearch = RequestPostSearch;

  typeOptions = [];

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        account_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.account_id`
          ),
          value: null,
          mainField: true,
        }),
        account_id_as_text_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.account_id_as_text_start`
          ),
          value: null,
        }),
        account_id_as_text_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.account_id_as_text_end`
          ),
          value: null,
        }),
        account_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.account_description`
          ),
          value: null,
        }),
        grouping_category: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.grouping_category`
          ),
          value: null,
        }),
      }),
    });

    this.typeOptions = [
      {
        label: this.i18nextPipe.transform('translation:all'),
        value: null,
      },
      {
        value: 'GR',
        label: 'GR',
      },
      {
        value: 'GA',
        label: 'GA',
      },
      {
        value: 'GM',
        label: 'GM',
      },
    ];
  }

  // // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  // searchStringBuilder(
  //   searchWordLabel: string,
  //   value: any,
  //   field?: string
  // ): string {
  //   switch (field) {
  //     case 'grouping_category':
  //       return `${searchWordLabel}:(${
  //         this.booleanOptions.find((o) => o.value === value).label
  //       }) `;
  //     default:
  //       return super.searchStringBuilder(searchWordLabel, value, field);
  //   }
  // }

  // // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  // updateField(field: string, newValue: any) {
  //   switch (field) {
  //     case 'grouping_category':
  //       this.form
  //         .get('searchFields')
  //         .get(field)
  //         .get('value')
  //         .setValue(
  //           this.booleanOptions.find((i) => i.label === newValue)
  //             ? this.booleanOptions.find((i) => i.label === newValue).value
  //             : null
  //         );
  //       break;
  //     default:
  //       this.form
  //         .get('searchFields')
  //         .get(field)
  //         .get('value')
  //         .setValue(newValue);
  //   }
  // }
}
