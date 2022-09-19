import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { I18NextPipe } from 'angular-i18next';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-persons-search',
  templateUrl: './pending-entities-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PendingEntitiesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'pending-entities';

  actionRequestPostSearch = RequestPostSearch;

  statusOptions: any[] = [];

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
          mainField: false,
        }),
        status: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.status`
          ),
          value: null,
          mainField: false,
        }),
      }),
    });

    this.statusOptions = [
      { value: null, label: this.i18nextPipe.transform(`translation:all`) },
      {
        value: 'pending',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.status.pending`
        ),
      },
      {
        value: 'rejected',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.status.rejected`
        ),
      },
    ];
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
