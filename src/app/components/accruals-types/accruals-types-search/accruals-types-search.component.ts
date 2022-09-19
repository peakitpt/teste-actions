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
  selector: 'kyr-accruals-types-search',
  templateUrl: './accruals-types-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccrualsTypesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accruals-types';

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
        validity_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validity_date_start`
          ),
          value: null,
        }),
        validity_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validity_date_end`
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
      case 'validity_date_start':
      case 'validity_date_end':
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
      case 'validity_date_start':
      case 'validity_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
