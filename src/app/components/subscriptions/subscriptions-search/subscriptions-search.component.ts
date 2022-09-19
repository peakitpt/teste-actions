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
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kyr-subscriptions-search',
  templateUrl: './subscriptions-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SubscriptionsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'subscriptions';

  actionRequestPostSearch = RequestPostSearch;

  // The options here are inverted
  booleanOptions = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: '',
    },
    {
      label: this.i18nextPipe.transform('translation:yes'),
      value: 'false',
    },
    {
      label: this.i18nextPipe.transform('translation:no'),
      value: 'true',
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
        entity1_name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity1.user.name`
          ),
          value: null,
          mainField: true,
        }),
        complete_relation: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity2.complete_relation`
          ),
          value: null,
        }),
        entity1_type: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity1.entity_type.name`
          ),
          value: null,
        }),
        entity1_email: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity1.user.email`
          ),
          value: null,
        }),
        entity1_disabled: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity1.entity_type.active`
          ),
          value: null,
        }),
        expiration_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity1.entity_type.expiration_date_start`
          ),
          value: null,
        }),
        expiration_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity1.entity_type.expiration_date_end`
          ),
          value: null,
        }),
        entity2_type: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity2.entity_type.name`
          ),
          value: null,
        }),
        country_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity2.entities_relation.diocese_description`
          ),
          value: null,
        }),
        diocese_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity2.entities_relation.diocese_description`
          ),
          value: null,
        }),
        arciprestado_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity2.entities_relation.arciprestado_description`
          ),
          value: null,
        }),
        paroquia_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity2.entities_relation.paroquia_description`
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
      case 'expiration_date_start':
      case 'expiration_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case 'entity1_disabled':
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
      case 'expiration_date_start':
      case 'expiration_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      case 'entity1_disabled':
        const option = this.booleanOptions.find((o) => o.label === newValue);
        super.updateField(field, option ? option.value : null);
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
