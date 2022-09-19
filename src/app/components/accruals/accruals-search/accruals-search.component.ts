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
  selector: 'kyr-accruals-search',
  templateUrl: './accruals-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccrualsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accruals';

  actionRequestPostSearch = RequestPostSearch;

  activeOptions: Array<{ value: number; label: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: null,
    },
    {
      value: 1,
      label: this.i18nextPipe.transform(`translation:yes`),
    },
    {
      value: 0,
      label: this.i18nextPipe.transform(`translation:no`),
    },
  ];

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        client_name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.client_name`
          ),
          value: null,
          mainField: true,
        }),
        active: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.active`
          ),
          value: null,
        }),
        accrual_type_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.accrual_type_description`
          ),
          value: null,
        }),
        validity_date_start_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validity_date_start_start`
          ),
          value: null,
        }),
        validity_date_start_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validity_date_start_end`
          ),
          value: null,
        }),
        processing_next_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.processing_next_date_start`
          ),
          value: null,
        }),
        processing_next_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.processing_next_date_end`
          ),
          value: null,
        }),
        accrual_type_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.accrual_type_id`
          ),
          value: null,
        }),
        validity_date_end_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validity_date_end_start`
          ),
          value: null,
        }),
        validity_date_end_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validity_date_end_end`
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
      case 'active':
        return `${searchWordLabel}:(${
          this.activeOptions.find((o) => o.value === value).label
        }) `;
      case 'validity_date_start_start':
      case 'validity_date_start_end':
      case 'processing_next_date_start':
      case 'processing_next_date_end':
      case 'validity_date_end_start':
      case 'validity_date_end_end':
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
      case 'active':
        const option = this.activeOptions.find((o) => o.label === newValue);
        super.updateField(field, option ? option.value : null);
        break;
      case 'validity_date_start_start':
      case 'validity_date_start_end':
      case 'processing_next_date_start':
      case 'processing_next_date_end':
      case 'validity_date_end_start':
      case 'validity_date_end_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
