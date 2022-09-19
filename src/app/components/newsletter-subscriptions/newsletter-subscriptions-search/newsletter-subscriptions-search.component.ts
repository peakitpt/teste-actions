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
  selector: 'kyr-newsletter-subscriptions-search',
  templateUrl: './newsletter-subscriptions-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NewsletterSubscriptionsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'newsletter-subscriptions';

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
        // MAIN
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
          ),
          value: null,
          mainField: true,
        }),
        email: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.email`
          ),
          value: null,
        }),
        mobilephone: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.mobilephone`
          ),
          value: null,
        }),
        active: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.active`
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
      case 'active':
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
      case 'active':
        const booleanOption = this.booleanOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, booleanOption ? booleanOption.value : null);
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
