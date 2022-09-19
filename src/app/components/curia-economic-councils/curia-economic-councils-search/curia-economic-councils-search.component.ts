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
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kyr-curia-economic-councils-search',
  templateUrl: './curia-economic-councils-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaEconomicCouncilsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-economic-councils';

  actionRequestPostSearch = RequestPostSearch;

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        serie_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.serie_number`
          ),
          mainField: true,
          value: null,
        }),
        county: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.county`
          ),
          value: null,
        }),
        chapelry_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.chapelry_description`
          ),
          value: null,
        }),
        expiration_date: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.expiration_date`
          ),
          value: null,
        }),
        active: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.active`
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
          this.booleanOptions.find((o) => o.value === value).label
        }) `;
      case 'expiration_date':
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
      case 'expiration_date':
        if (newValue !== null && newValue !== undefined) {
          super.updateField(field, this.sharedModule.dateToUtc(newValue));
        } else {
          super.updateField(field, newValue);
        }
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
