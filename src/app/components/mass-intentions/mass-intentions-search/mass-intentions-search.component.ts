import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { ChangeDetectorRef } from '@angular/core';
// import { State as MassIntentionsTypesState } from 'src/app/components/mass-intentions-types/reducers/mass-intentions-types.reducer';
// import { getMassIntentionsTypesListEntirely } from 'src/app/components/mass-intentions-types/reducers/mass-intentions-types.selectors';
// import { RequestGetEntirely } from 'src/app/components/mass-intentions-types/reducers/mass-intentions-types.actions';
// import {
//   MassIntentionsTypeResponse,
//   MassIntentionsType,
// } from 'src/app/components/mass-intentions-types/mass-intentions-type.model';

@Component({
  selector: 'kyr-mass-intentions-search',
  templateUrl: './mass-intentions-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MassIntentionsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'mass-intentions';

  actionRequestPostSearch = RequestPostSearch;

  /* This specific's component fields */
  // typesOptions: Array<{ label: string; value: number }> = [];

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef // private typesStore: Store<MassIntentionsTypesState>
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        intention_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.intention_description`
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
        intention_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.intention_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        intention_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.intention_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        intention_time: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.intention_time`
          ),
          value: null,
        }),
        type_name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.type_name`
          ),
          value: null,
        }),
        celebrated_by_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.celebrated_by_description`
          ),
          value: null,
        }),
        location_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.location_description`
          ),
          value: null,
        }),
        paid: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.paid`
          ),
          value: '',
        }),
        requested_by_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.requested_by_description`
          ),
          value: null,
        }),
      }),
    });
  }

  // afterSideNavLoaded() {
  //   this.subs.push(
  //     this.typesStore
  //       .select(getMassIntentionsTypesListEntirely)
  //       .subscribe((response: MassIntentionsTypeResponse) => {
  //         if (response && response.results.length) {
  //           const options: Array<{ label: string; value: number }> = [];
  //           response.results.forEach((type: MassIntentionsType) =>
  //             options.push({
  //               label: type.name,
  //               value: type.id,
  //             })
  //           );
  //           this.typesOptions = options;
  //         }
  //       })
  //   );
  //   this.typesStore.dispatch(new RequestGetEntirely({ limit: 'none' }));
  // }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'intention_date_start':
      case 'intention_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case 'paid':
        return `${searchWordLabel}:(${
          this.booleanOptions.find((o) => o.value === value).label
        }) `;
      // case 'type_id':
      //   return `${searchWordLabel}:(${
      //     this.typesOptions.find((o) => o.value === value).label
      //   }) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'intention_date_start':
      case 'intention_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      case 'paid':
        const booleanOption = this.booleanOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, booleanOption ? booleanOption.value : null);
        break;
      // case 'type_id':
      //   const typesOption = this.typesOptions.find(
      //     (o) => o.label === newValue
      //   );
      //   super.updateField(
      //     field,
      //     typesOption ? typesOption.value : null
      //   );
      //   break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
