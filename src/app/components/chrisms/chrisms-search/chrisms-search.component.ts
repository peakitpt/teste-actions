import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-chrisms-search',
  templateUrl: './chrisms-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ChrismsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'chrisms';

  actionRequestPostSearch = RequestPostSearch;

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
        entity_rel_mec_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_rel_mec_description`
          ),
          value: null,
          mainField: true,
        }),
        serie_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.serie_number`
          ),
          value: null,
        }),
        entity_chrism_location_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_chrism_location_description`
          ),
          value: null,
        }),
        chrisms_entities_attributes_entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.chrisms_entities_attributes_entity_description`
          ),
          value: null,
        }),
        date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(`${this.modulePath}:model.date`) +
            ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(`${this.modulePath}:model.date`) +
            ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
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
      case 'date_start':
      case 'date_end':
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
      case 'date_start':
      case 'date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
