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
import { SharedModule } from 'src/app/shared/shared.module';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';

@Component({
  selector: 'kyr-deaths-search',
  templateUrl: './deaths-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DeathsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'deaths';

  actionRequestPostSearch = RequestPostSearch;

  /* This specific's component fields */
  buryProcessOptions: Array<{ label: string; value: number }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: null,
    },
    {
      label: this.i18nextPipe.transform(
        `${this.modulePath}:bury_process_options.buried`
      ),
      value: 2,
    },
    {
      label: this.i18nextPipe.transform(
        `${this.modulePath}:bury_process_options.cremated`
      ),
      value: 1,
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
        // MAIN
        entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_description`
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
        seat_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.seat_number`
          ),
          value: null,
        }),
        sheet: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.sheet`
          ),
          value: null,
        }),
        death_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(`${this.modulePath}:model.death_date`) +
            ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        death_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(`${this.modulePath}:model.death_date`) +
            ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        death_year: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.death_year`
          ),
          value: null,
        }),
        entity_bury_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.entity_bury_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        entity_bury_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.entity_bury_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        entity_death_bury_process_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_death_bury_process_id`
          ),
          value: '',
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
      case 'death_date_start':
      case 'death_date_end':
      case 'entity_bury_date_start':
      case 'entity_bury_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case 'entity_death_bury_process_id':
        return `${searchWordLabel}:(${
          this.buryProcessOptions.find((o) => o.value === value).label
        }) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'death_date_start':
      case 'death_date_end':
      case 'entity_bury_date_start':
      case 'entity_bury_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      case 'entity_death_bury_process_id':
        const buryProcessOption = this.buryProcessOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(
          field,
          buryProcessOption ? buryProcessOption.value : null
        );
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
