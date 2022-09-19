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
  selector: 'kyr-accounting-transaction-types-search',
  templateUrl: './accounting-transaction-types-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionTypesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-transaction-types';

  actionRequestPostSearch = RequestPostSearch;

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        code: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.code`
          ),
          value: null,
          mainField: true,
        }),
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
        locale: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.locale`
          ),
          value: null,
        }),
        is_default: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.is_default`
          ),
          value: null,
        }),
      }),
    });
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'is_default':
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
      case 'is_default':
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
