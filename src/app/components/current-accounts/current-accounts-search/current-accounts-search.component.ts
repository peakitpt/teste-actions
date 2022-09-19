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
  selector: 'kyr-current-accounts-search',
  templateUrl: './current-accounts-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CurrentAccountsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'current-accounts';

  actionRequestPostSearch = RequestPostSearch;

  activeOptions: Array<{ value: any; label: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: null,
    },
    {
      value: true,
      label: this.i18nextPipe.transform(`translation:yes`),
    },
  ];

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_description`
          ),
          value: null,
          mainField: true,
        }),
        extracts_pendents_only: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.extracts_pendents_only`
          ),
          value: null,
        }),
        extracts_period_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.extracts_period_start`
          ),
          value: null,
        }),
        extracts_period_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.extracts_period_end`
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
      case 'extracts_pendents_only':
        return `${searchWordLabel}:(${
          this.activeOptions.find((o) => o.value === value).label
        }) `;
      case 'extracts_period_start':
      case 'extracts_period_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'extracts_pendents_only':
        const option = this.activeOptions.find((o) => o.label === newValue);
        super.updateField(field, option ? option.value : null);
        break;
      case 'extracts_period_start':
      case 'extracts_period_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
