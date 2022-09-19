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
  selector: 'kyr-accruals-processments-search',
  templateUrl: './accruals-processments-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccrualsProcessmentsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accruals-processments';

  actionRequestPostSearch = RequestPostSearch;

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        processing_next_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.processing_next_date_start`
          ),
          value: new Date(new Date().getFullYear(), 0, 1),
          mainField: true,
        }),
        processing_next_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.processing_next_date_end`
          ),
          value: new Date(new Date().getFullYear(), 11, 31),
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
      case 'processing_next_date_start':
      case 'processing_next_date_end':
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
      case 'processing_next_date_start':
      case 'processing_next_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}

// Próx. Processamento (Desde):(01/01/2021) Próx. Processamento (Até):(31/12/2021)
